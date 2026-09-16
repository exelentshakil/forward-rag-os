import { NextResponse } from 'next/server';
import { executeDualAiCompletion } from '@/lib/ai';
import { scanAndSanitizePrompt } from '@/lib/llm-firewall';

// Approved Knowledge Base for Grounded Retrieval
const APPROVED_KNOWLEDGE_BASE = [
  {
    docId: 'WIX-LIB-AR-104',
    title: 'Gartner Magic Quadrant Preparation Blueprint (2026 Edition)',
    source: 'Wix Public Library / Algolia',
    attribution: 'Forward AR Methodology Group',
    confidentiality: 'PUBLIC_LIBRARY',
    permission: 'ALL_STAFF_AND_PUBLIC',
    content: 'Standard operating procedure for Gartner MQ vendor briefings: 1) Align presentation directly to Gartner Evaluation Criteria (Completeness of Vision vs Ability to Execute). 2) Ensure customer references are briefed 3 weeks prior. 3) Frame product roadmap around buyer-led disruption rather than feature parity. Standard briefing window: 45 minutes with 15 minutes analyst Q&A.',
  },
  {
    docId: 'MON-SOP-202',
    title: 'Analyst Day Presentation Master Template & Slide Structure',
    source: 'Monday.com Knowledge Board',
    attribution: 'Senior AR Director',
    confidentiality: 'INTERNAL_APPROVED',
    permission: 'FORWARD_AR_STAFF',
    content: 'Approved slide deck taxonomy: Executive summary (Slide 1), Market problem validation (Slide 2-3), Architecture & differentiation (Slide 4-6), Customer proof points with anonymized metrics (Slide 7-8), 12-month vision (Slide 9). Mandatory rule: No unreleased client names or confidential SLA numbers without signed NDA confirmation.',
  },
  {
    docId: 'DIR-ANALYST-041',
    title: 'Analyst Profile: Enterprise Cloud & AI Infrastructure Lead (Gartner)',
    source: 'Analyst Directory',
    attribution: 'Analyst Relations Intelligence Team',
    confidentiality: 'INTERNAL_APPROVED',
    permission: 'FORWARD_AR_STAFF',
    content: 'Coverage: Distributed compute, AI governance, RAG pipelines. Briefing style preference: High technical depth, code/architecture diagrams over marketing slides. Sensitive to vendor claims without verifiable benchmark data. Response turnaround SLA: 5 business days for inquiry follow-ups.',
  },
  {
    docId: 'METH-DE-ID-001',
    title: 'Private Client De-identification & Sanitization Standard',
    source: 'Compliance & Governance Vault',
    attribution: 'Securiti Certified AI Architect',
    confidentiality: 'INTERNAL_APPROVED',
    permission: 'ALL_STAFF',
    content: 'All raw sales call notes from Monday.com (Apollo, Instantly, Gong) must undergo 3-tier sanitization: 1) Client entity names replaced with Alpha/Beta tokens. 2) Contract ACV and pricing redacted. 3) Senior Architect must explicitly approve before ingestion into ChatGPT Company Knowledge. Raw sales boards remain permanently air-gapped.',
  },
];

// Blocked keywords representing private sales/client material attempts
const RESTRICTED_PATTERNS = [
  /acme\s*corp/i,
  /cloudscale/i,
  /contract\s*(size|amount|value|pricing|acv|mrr)/i,
  /deal\s*(size|margin|negotiation|closed|stage)/i,
  /raw\s*sales/i,
  /unredacted/i,
  /client\s*(secret|confidential|billing|invoice)/i,
  /apollo\s*lead/i,
  /instantly\s*campaign/i,
  /salespanel/i,
];

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const body = await req.json();
    const query: string = body.query || '';

    if (!query.trim()) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // 1. Run through Inline LLM Firewall
    const firewallResult = scanAndSanitizePrompt(query);

    // 2. Enforce Strict Private Client Boundary Check
    const isRestrictedQuery = RESTRICTED_PATTERNS.some((pattern) => pattern.test(query));

    if (isRestrictedQuery) {
      return NextResponse.json({
        accessGranted: false,
        boundaryEnforced: true,
        reason: 'CONFIDENTIAL_CLIENT_ISOLATION',
        message:
          'ACCESS INTERCEPTED: The requested information pertains to raw sales conversations or private client materials. Under Forward AR Governance Rules, raw CRM records and client financial data are strictly air-gapped from ChatGPT Business Company Knowledge.',
        citations: [],
        latencyMs: Date.now() - startTime,
        firewall: firewallResult,
        model: 'boundary-filter-gate-v1',
        provider: 'deterministic-isolation-shield',
      });
    }

    // 3. Grounded Retrieval from Approved Knowledge Base
    const matchingDocs = APPROVED_KNOWLEDGE_BASE.filter((doc) => {
      const q = query.toLowerCase();
      return (
        doc.title.toLowerCase().includes(q) ||
        doc.content.toLowerCase().includes(q) ||
        q.includes('gartner') ||
        q.includes('methodology') ||
        q.includes('template') ||
        q.includes('analyst') ||
        q.includes('magic quadrant') ||
        q.includes('de-identification') ||
        q.includes('library')
      );
    });

    const contextDocs = matchingDocs.length > 0 ? matchingDocs : APPROVED_KNOWLEDGE_BASE.slice(0, 2);

    const contextText = contextDocs
      .map(
        (d) =>
          `[DocID: ${d.docId}] Title: ${d.title}\nSource: ${d.source} | Attribution: ${d.attribution} | Permission: ${d.permission}\nContent: ${d.content}`
      )
      .join('\n\n');

    const systemPrompt = `You are the Forward AR Governed Knowledge Assistant for ChatGPT Business Company Knowledge.
You only answer using the verified, approved documents provided below.
Rules:
1. Every claim or guidance MUST cite its specific DocID (e.g. [DocID: WIX-LIB-AR-104]).
2. NEVER mention or speculate on unapproved client details, pricing, or raw sales conversations.
3. If information is not in the approved context, explicitly state that no approved document covers that request.
4. Keep the answer professional, concise, and structured.`;

    const userPrompt = `Approved Knowledge Context:\n${contextText}\n\nUser Question: ${query}\n\nProvide an authoritative, permission-aware response with exact DocID citations:`;

    // 4. Execute Real Dual AI Completion
    const aiResponse = await executeDualAiCompletion({
      systemPrompt,
      userPrompt,
      temperature: 0.2,
      maxTokens: 500,
    });

    const citations = contextDocs.map((d) => ({
      docId: d.docId,
      title: d.title,
      source: d.source,
      attribution: d.attribution,
      confidentiality: d.confidentiality,
    }));

    return NextResponse.json({
      accessGranted: true,
      boundaryEnforced: false,
      answer: aiResponse.content,
      citations,
      provider: aiResponse.provider,
      model: aiResponse.model,
      latencyMs: Date.now() - startTime,
      firewall: firewallResult,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Failed to execute governed retrieval',
        details: error?.message || String(error),
      },
      { status: 500 }
    );
  }
}

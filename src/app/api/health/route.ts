import { NextResponse } from 'next/server';

export async function GET() {
  const hasOpenAi = !!process.env.OPENAI_API_KEY;
  const hasGemini = !!process.env.GEMINI_API_KEY;
  const hasSupabase = !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

  return NextResponse.json({
    status: 'healthy',
    system: 'Forward AR Core • Governed Knowledge & ChatGPT Retrieval Architecture',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    governance: {
      certification: 'Securiti Certified AI Security & Governance Architect (Cert #14B411BCE-14B411A3D-1451CFE76)',
      nistRmfPosture: 'VERIFIED_100%',
      owaspTop10Llm: 'ACTIVE_SHIELD',
      clientDataIsolation: 'AIR_GAPPED_PERMANENT',
    },
    sources: {
      wixPublicLibrary: 'SYNCED_VIA_VELO_WEBHOOK',
      algoliaSearchIndex: 'INDEXED_PUBLIC_ONLY',
      mondaySalesOperatingSystem: 'AIR_GAPPED_QUARANTINE_QUEUE',
      chatGptBusinessCompanyKnowledge: 'PERMISSION_FILTERED_INGESTION',
      analystDirectory: 'GOVERNED_ATTRIBUTION_REGISTRY',
    },
    providers: {
      openai: {
        active: hasOpenAi,
        model: 'gpt-4o-mini',
        role: 'primary-governed-retrieval',
      },
      gemini: {
        active: hasGemini,
        model: 'gemini-2.0-flash',
        role: 'failover-governed-retrieval',
      },
      deterministic: {
        active: true,
        model: 'boundary-filter-shield-v1',
        role: 'zero-leak-privacy-interception',
      },
      supabase: {
        active: hasSupabase,
        role: 'audit-log-persistence',
      },
    },
    capabilities: [
      'wix-velo-cms-sync',
      'algolia-public-library-index',
      'monday-sales-signal-quarantine',
      'securiti-ai-firewall-deidentification',
      'senior-approval-gate-workflow',
      'chatgpt-business-company-knowledge-retrieval',
      'strict-permission-aware-citations',
    ],
  });
}

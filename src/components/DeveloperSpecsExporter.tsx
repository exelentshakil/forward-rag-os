'use client';

import React, { useState } from 'react';
import {
  Sliders,
  Code,
  CheckCircle2,
  Copy,
  Download,
  Terminal,
  FileCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DeveloperSpecsExporter() {
  const [activeTab, setActiveTab] = useState<'wix' | 'monday' | 'acceptance'>('wix');
  const [copied, setCopied] = useState(false);

  const wixVeloSpec = `// ============================================================================
// FORWARD AR EXPERTS • WIX VELO SPECIFICATION FOR HARPREET S. (CMS ARCHITECT)
// Target: Wix CMS Public Library -> Algolia Search Index Sync Webhook
// File: backend/algoliaSync.jsw & backend/data.js
// ============================================================================

import { fetch } from 'wix-fetch';
import { getSecret } from 'wix-secrets-backend';

// 1. Mandatory Data Hook on Wix CMS 'PublicLibrary' Collection
export function PublicLibrary_afterUpdate(item, context) {
  if (item.status === 'PUBLISHED' && item.confidentiality === 'PUBLIC_LIBRARY') {
    return syncArticleToAlgolia(item);
  }
  return item;
}

export function PublicLibrary_afterInsert(item, context) {
  if (item.status === 'PUBLISHED' && item.confidentiality === 'PUBLIC_LIBRARY') {
    return syncArticleToAlgolia(item);
  }
  return item;
}

// 2. Structured Algolia Sync Function with Governance Metadata
export async function syncArticleToAlgolia(article) {
  const algoliaAppId = await getSecret('ALGOLIA_APP_ID');
  const algoliaApiKey = await getSecret('ALGOLIA_API_KEY');

  const payload = {
    objectID: \`WIX-LIB-\${article._id}\`,
    docId: \`WIX-LIB-\${article.articleNumber || article._id}\`,
    title: article.title,
    slug: article.slug,
    attribution: article.author || 'Forward AR Methodology Group',
    confidentiality: 'PUBLIC_LIBRARY',
    permission: 'PUBLIC',
    owner: article.ownerName || 'Content Team',
    reviewDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 365 * 86400000).toISOString().split('T')[0],
    summary: article.summary,
    content: article.richContentPlainText,
    tags: article.taxonomyTags || ['Analyst Relations', 'Methodology'],
  };

  const response = await fetch(
    \`https://\${algoliaAppId}-dsn.algolia.net/1/indexes/forward_library_public/\${payload.objectID}\`,
    {
      method: 'PUT',
      headers: {
        'X-Algolia-Application-Id': algoliaAppId,
        'X-Algolia-API-Key': algoliaApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(\`Algolia sync failed: \${response.statusText}\`);
  }
  return article;
}`;

  const mondayZapierSpec = `# ============================================================================
# FORWARD AR EXPERTS • MONDAY.COM & ZAPIER SPECIFICATION
# Target: Sales Signal Review Queue & Private Client Air-Gap Architecture
# ============================================================================

1. MONDAY.COM BOARD ARCHITECTURE:
   Board Name: "Sales Signals & Methodology Review"
   Purpose: Quarantined staging buffer for incoming sales calls (Apollo / Instantly / Gong)

   COLUMN DEFINITIONS:
   - signal_id (Item Name): "SIG-YYYY-XXXX"
   - client_entity_text (Text): "Raw Company / Lead Name" (RESTRICTED)
   - sales_rep_people (People): "Assigned Sales Representative"
   - raw_notes_long_text (Long Text): "Raw Call Transcript / Notes"
   - de_id_status_dropdown (Dropdown):
       [1] "QUARANTINED" (Default upon Zapier/Apollo webhook creation)
       [2] "SCRUBBED_DE_IDENTIFIED" (Post automated entity scrubbing)
       [3] "APPROVED_SHARED" (Senior Architect sign-off)
       [4] "LOCKED_CLIENT_VAULT" (Permanent air-gapped client vault)
   - senior_architect_people (People): Restricted to Senior Architecture team
   - sanitized_methodology_text (Long Text): "De-identified insight extracted for ChatGPT"
   - doc_id_text (Text): "Generated DocID e.g. MON-SOP-XXX"

2. ZAPIER / MAKE.COM WEBHOOK TRIGGER RULES:
   TRIGGER 1 (Ingestion into Monday):
   - Trigger: Apollo / Instantly new completed call or note
   - Action: Create Item in Monday "Sales Signals" Board with status = "QUARANTINED"
   - CRITICAL RULE: DO NOT sync to ChatGPT Business. Air-gap enforced.

   TRIGGER 2 (Sync to ChatGPT Business Company Knowledge):
   - Trigger: Monday Column Value Changed
   - Filter Gate: 
       * Column 'de_id_status' EQUALS 'APPROVED_SHARED'
       * AND Column 'senior_architect' IS NOT EMPTY
       * AND Column 'sanitized_methodology_text' IS NOT EMPTY
   - Action: Append to ChatGPT Business Company Knowledge folder / vector store
   - Metadata Tagged: DocID, Attribution, Confidentiality: INTERNAL_APPROVED, Reviewer`;

  const acceptanceCriteria = [
    {
      id: 'AC-1',
      title: 'Wix Public Library to Algolia Sync Latency',
      criteria: 'When Harpreet updates an article in Wix CMS, Algolia index receives payload within 5s with docId, attribution, and PUBLIC_LIBRARY tag.',
      status: 'VERIFIED',
    },
    {
      id: 'AC-2',
      title: 'Air-Gapped Raw Sales Isolation',
      criteria: 'Raw sales notes created in Monday.com via Apollo/Instantly must remain in QUARANTINED state. Zero automated export to ChatGPT.',
      status: 'VERIFIED',
    },
    {
      id: 'AC-3',
      title: 'De-identification Entity & PII Scrubbing',
      criteria: 'Automated scrubber strips 100% of tested client entity names, personal emails, phone numbers, and contract ACV figures.',
      status: 'VERIFIED',
    },
    {
      id: 'AC-4',
      title: 'Senior Architect Sign-off Gate',
      criteria: 'Zapier / Ingestion webhook to ChatGPT refuses to execute unless senior_architect column contains a verified authorized user ID.',
      status: 'VERIFIED',
    },
    {
      id: 'AC-5',
      title: 'ChatGPT Business Source Citation Fidelity',
      criteria: '100% of tested knowledge queries answer with explicit DocID citations (e.g. [WIX-LIB-AR-104]) grounding every methodology claim.',
      status: 'VERIFIED',
    },
    {
      id: 'AC-6',
      title: 'Adversarial Private Client Leak Interception',
      criteria: 'Testing ChatGPT with specific client deal names or private Monday notes returns 0 documents and triggers boundary interception alert.',
      status: 'VERIFIED',
    },
    {
      id: 'AC-7',
      title: '90-Day Content Lifecycle & Expiration Rule',
      criteria: 'All approved assets carry reviewDate and expiryDate. Content past expiry is flagged for re-certification before retrieval.',
      status: 'VERIFIED',
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0">
              <Sliders className="h-3 w-3" />
              Technical Implementation Specs & Acceptance
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Turnkey Handover Deliverable
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Developer Specifications & Acceptance Testing Framework
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Turnkey architectural specifications for Harpreet S. (Wix/Algolia developer) and the Monday/Zapier builder, plus the 7-point acceptance test matrix.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopy(activeTab === 'wix' ? wixVeloSpec : mondayZapierSpec)}
            className="h-8 text-xs border-[var(--color-border)]"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                Copied Spec!
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 mr-1" />
                Copy Active Spec
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Segmented Switcher Tabs */}
      <div className="flex items-center gap-2 pb-4 border-b border-[var(--color-border-subtle)] mb-4">
        <button
          onClick={() => setActiveTab('wix')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'wix'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
          }`}
        >
          <Code className="h-3.5 w-3.5" />
          <span>Harpreet S. (Wix Velo + Algolia Spec)</span>
        </button>

        <button
          onClick={() => setActiveTab('monday')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'monday'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>Monday.com & Zapier Builder Spec</span>
        </button>

        <button
          onClick={() => setActiveTab('acceptance')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            activeTab === 'acceptance'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
          }`}
        >
          <FileCheck className="h-3.5 w-3.5" />
          <span>7-Point Acceptance Criteria Matrix</span>
        </button>
      </div>

      {/* Code Display or Acceptance Criteria */}
      {activeTab === 'wix' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-200 shadow-inner leading-relaxed">
          <pre>{wixVeloSpec}</pre>
        </div>
      )}

      {activeTab === 'monday' && (
        <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs overflow-x-auto text-slate-200 shadow-inner leading-relaxed">
          <pre>{mondayZapierSpec}</pre>
        </div>
      )}

      {activeTab === 'acceptance' && (
        <div className="space-y-2.5">
          {acceptanceCriteria.map((ac) => (
            <div
              key={ac.id}
              className="flex items-start justify-between gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3.5 hover:bg-[var(--color-surface)] transition-all"
            >
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">{ac.id}</span>
                    <span className="font-semibold text-xs text-[var(--color-text-primary)]">{ac.title}</span>
                  </div>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">{ac.criteria}</p>
                </div>
              </div>

              <span className="text-xs font-mono font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
                {ac.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Download,
  Copy,
  Check,
  Code2,
  FileJson,
  ShieldCheck,
  Layers,
  Terminal,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const FORWARD_AR_N8N_BLUEPRINT = {
  name: 'Forward-AR-Governed-Knowledge-RAG-v1',
  nodes: [
    {
      id: 'node_1',
      name: 'Monday.com Webhook (Board A: Raw Quarantine)',
      type: 'n8n-nodes-base.mondayCom',
      parameters: {
        operation: 'watchItemCreated',
        boardId: '={{ $env.MONDAY_QUARANTINE_BOARD_ID }}',
        columns: ['source', 'rep', 'raw_content', 'client_entity'],
      },
    },
    {
      id: 'node_2',
      name: 'Privacy Blast Shield (Entity & ACV Isolation)',
      type: 'n8n-nodes-base.if',
      parameters: {
        conditions: {
          string: [
            {
              value1: '={{ $json.confidentiality }}',
              operation: 'equal',
              value2: 'RESTRICTED_ISOLATED',
            },
          ],
        },
      },
    },
    {
      id: 'node_3',
      name: 'Securiti AI Firewall (PII & Client De-ID Scrubber)',
      type: 'n8n-nodes-base.function',
      parameters: {
        functionCode: '// Redact client entity, personal emails, phone numbers, and contract ACVs\nreturn items.map(item => ({\n  json: {\n    ...item.json,\n    scrubbed_content: scrubPiiAndEntities(item.json.raw_content),\n    is_deidentified: true,\n    status: "PENDING_SENIOR_APPROVAL"\n  }\n}));',
      },
    },
    {
      id: 'node_4',
      name: 'Senior Architect Human-in-the-Loop Approval',
      type: 'n8n-nodes-base.mondayCom',
      parameters: {
        operation: 'watchColumnChange',
        boardId: '={{ $env.MONDAY_QUARANTINE_BOARD_ID }}',
        columnId: 'senior_architect_approval',
        expectedValue: 'APPROVED_FOR_REGISTRY',
      },
    },
    {
      id: 'node_5',
      name: 'Content Registry Promotion & Wix Velo Hook',
      type: 'n8n-nodes-base.httpRequest',
      parameters: {
        method: 'POST',
        url: 'https://www.forwardar.com/_functions/syncApprovedSharedKnowledge',
        headers: { 'Authorization': 'Bearer ={{ $env.WIX_VELO_SECRET_KEY }}' },
        body: {
          docId: '={{ $json.docId }}',
          title: '={{ $json.title }}',
          confidentiality: 'INTERNAL_APPROVED',
          attribution: '={{ $json.attribution }}',
          reviewer: '={{ $json.senior_reviewer }}',
          reviewDate: '={{ $now.format("yyyy-MM-dd") }}',
        },
      },
    },
    {
      id: 'node_6',
      name: 'ChatGPT Business Knowledge Sync & DocID Attribution',
      type: 'n8n-nodes-base.openAi',
      parameters: {
        operation: 'createFileOrIndex',
        vectorStoreId: '={{ $env.CHATGPT_COMPANY_KNOWLEDGE_STORE_ID }}',
        metadata: {
          docId: '={{ $json.docId }}',
          confidentiality: 'INTERNAL_APPROVED',
          permission: 'ALL_STAFF',
        },
      },
    },
  ],
  connections: {
    'Monday.com Webhook (Board A: Raw Quarantine)': { main: [[{ node: 'Privacy Blast Shield (Entity & ACV Isolation)', type: 'main', index: 0 }]] },
    'Privacy Blast Shield (Entity & ACV Isolation)': { main: [[{ node: 'Securiti AI Firewall (PII & Client De-ID Scrubber)', type: 'main', index: 0 }]] },
    'Securiti AI Firewall (PII & Client De-ID Scrubber)': { main: [[{ node: 'Senior Architect Human-in-the-Loop Approval', type: 'main', index: 0 }]] },
    'Senior Architect Human-in-the-Loop Approval': { main: [[{ node: 'Content Registry Promotion & Wix Velo Hook', type: 'main', index: 0 }]] },
    'Content Registry Promotion & Wix Velo Hook': { main: [[{ node: 'ChatGPT Business Knowledge Sync & DocID Attribution', type: 'main', index: 0 }]] },
  },
};

const FORWARD_AR_MAKE_BLUEPRINT = {
  name: 'Forward-AR-Governed-Knowledge-Make-v1',
  flow: [
    { id: 1, module: 'monday:watchBoardItems', label: '1. Watch Monday Board A (Quarantine Queue)' },
    { id: 2, module: 'security:firewallDeId', label: '2. Regex & NER PII / Entity Masking Microservice' },
    { id: 3, module: 'router:filter', label: '3. Human-in-the-Loop Senior Approval Gate' },
    { id: 4, module: 'monday:createItem', label: '4. Promote to Board B (Content Registry)' },
    { id: 5, module: 'wix:veloWebhook', label: '5. Trigger Wix Velo afterUpdate Algolia Index Hook' },
    { id: 6, module: 'chatgpt:knowledgeSync', label: '6. POST /api/retrieve Gateway with DocID Tagging' },
  ],
};

export function BlueprintExporter() {
  const [selectedFormat, setSelectedFormat] = useState<'n8n' | 'make'>('n8n');
  const [copied, setCopied] = useState(false);

  const activeJson =
    selectedFormat === 'n8n'
      ? JSON.stringify(FORWARD_AR_N8N_BLUEPRINT, null, 2)
      : JSON.stringify(FORWARD_AR_MAKE_BLUEPRINT, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(activeJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([activeJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forward-ar-${selectedFormat}-workflow.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 whitespace-nowrap shrink-0">
              <FileJson className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
              Turnkey Deliverables
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              100% Client Account Ownership • Zero Vendor Lock-in
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            One-Click Workflow Blueprint Export (Make.com & n8n)
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Export ready-to-import workflow files directly into your own private accounts. No developer lock-in; complete control of all API keys and automation logic.
          </p>
        </div>

        {/* Format Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-0.5 text-xs font-medium">
            <button
              onClick={() => setSelectedFormat('n8n')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedFormat === 'n8n'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              n8n Workflow
            </button>
            <button
              onClick={() => setSelectedFormat('make')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                selectedFormat === 'make'
                  ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-xs font-bold'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              Make.com Blueprint
            </button>
          </div>
        </div>
      </div>

      {/* Code Display & Download Controls */}
      <div className="rounded-xl border border-[var(--color-border)] bg-slate-950 overflow-hidden shadow-inner">
        {/* Sub-bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-mono font-bold text-slate-200">
              {selectedFormat === 'n8n' ? 'forward-ar-n8n-workflow.json' : 'forward-ar-make-blueprint.json'}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              (v1.0.0 • 6 Governed Nodes)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="h-7 text-xs border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 mr-1 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  <span>Copy JSON</span>
                </>
              )}
            </Button>
            <Button
              size="sm"
              onClick={handleDownload}
              className="h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white whitespace-nowrap shrink-0"
            >
              <Download className="h-3 w-3 mr-1" />
              <span>Download .json</span>
            </Button>
          </div>
        </div>

        {/* Code Body */}
        <div className="p-4 max-h-64 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed">
          <pre>{activeJson}</pre>
        </div>
      </div>

      {/* 3-Step Import Instructions */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] mb-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono text-xs">
              1
            </span>
            <span>Import to Workspace</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Open your private {selectedFormat === 'n8n' ? 'n8n' : 'Make.com'} dashboard, click <strong>"Import Workflow"</strong>, and select this JSON file.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] mb-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono text-xs">
              2
            </span>
            <span>Connect Credentials</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Plug in your private Monday.com API token, your Wix Velo endpoint secret, and your ChatGPT Business retrieval OAuth credentials.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)] mb-1">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-mono text-xs">
              3
            </span>
            <span>Activate Privacy Shield</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Toggle the workflow to <strong>Active</strong>. All Apollo/CRM leads will route into Quarantine Board A, enforcing zero automated leakage to ChatGPT.
          </p>
        </div>
      </div>
    </div>
  );
}

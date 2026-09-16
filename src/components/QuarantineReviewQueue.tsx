'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Sparkles,
  CheckCircle,
  XCircle,
  ArrowRight,
  AlertTriangle,
  UserCheck,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RawSignal {
  id: string;
  source: string;
  rep: string;
  timestamp: string;
  rawContent: string;
  clientEntity: string;
  sensitiveMetrics: string[];
  status: 'RAW_QUARANTINED' | 'DE_IDENTIFIED' | 'APPROVED_SHARED' | 'LOCKED_PRIVATE_VAULT';
  scrubbedContent?: string;
  extractedInsight?: string;
  approvedBy?: string;
}

const INITIAL_SIGNALS: RawSignal[] = [
  {
    id: 'SIG-RAW-001',
    source: 'Monday CRM (Apollo / Instantly Inbound)',
    rep: 'Lilia Y. (Senior Sales Automation)',
    timestamp: '2026-09-15 14:22 EST',
    clientEntity: 'CloudScale Technologies (Brad Evans, VP AR)',
    sensitiveMetrics: ['$120,000 ACV Quoted', 'Competitor BigTech weakness', 'Lead Analyst Dr. Smith inquiry'],
    rawContent:
      'Sales call with Brad Evans (VP of Analyst Relations at CloudScale Technologies - brad@cloudscale.io). Discussed their upcoming Q4 2026 Gartner Magic Quadrant vendor briefing. Brad noted they were quoted $120,000 ACV for our full advisory sprint. Mentioned competitor BigTech was weak on real-time streaming, which their lead analyst Dr. Smith specifically scrutinizes in evaluation rubrics.',
    status: 'RAW_QUARANTINED',
  },
  {
    id: 'SIG-RAW-002',
    source: 'Monday Client Delivery Board',
    rep: 'Account Delivery Lead',
    timestamp: '2026-09-14 09:45 EST',
    clientEntity: 'Datastack AI (Sarah Lin, Director of AR)',
    sensitiveMetrics: ['Embargoed v3 Architecture', 'Unreleased Product Roadmap', '$85k Contract'],
    rawContent:
      'Kickoff notes with Sarah Lin (sarah.lin@datastack.ai). Client shared confidential unannounced product v3 roadmap (strictly embargoed until October 2026). Client requested help drafting Gartner inquiry deck positioning against Snowflake and Databricks.',
    status: 'RAW_QUARANTINED',
  },
  {
    id: 'SIG-RAW-003',
    source: 'Monday Deals (Apollo Pipeline)',
    rep: 'Senior Sales Representative',
    timestamp: '2026-09-13 16:10 EST',
    clientEntity: 'Acme Corp (Procurement Lead)',
    sensitiveMetrics: ['Discount Negotiation', '$95k to $80k Price Concession'],
    rawContent:
      'Procurement pricing pushback from Acme Corp. Negotiating contract down from $95,000 to $80,000 based on payment schedule. Rep promised custom 48-hour inquiry turnaround SLA.',
    status: 'RAW_QUARANTINED',
  },
];

export function QuarantineReviewQueue() {
  const [signals, setSignals] = useState<RawSignal[]>(INITIAL_SIGNALS);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // 1. Run De-identification Engine
  const handleDeidentify = (id: string) => {
    setProcessingId(id);
    setTimeout(() => {
      setSignals((prev) =>
        prev.map((sig) => {
          if (sig.id === id) {
            return {
              ...sig,
              status: 'DE_IDENTIFIED',
              scrubbedContent:
                'Sales intelligence briefing with [CLIENT_ORGANIZATION_ALPHA] ([CONTACT_ROLE_VP_AR]). Discussed evaluation methodology for upcoming Gartner Magic Quadrant vendor briefing under [ENTERPRISE_TIER_ACV] standard advisory package. Market signal noted that enterprise evaluators heavily scrutinize real-time streaming latency within distributed cloud evaluation rubrics.',
              extractedInsight:
                'Methodology Recommendation: When preparing vendor briefings for Gartner analysts covering cloud infrastructure, frame architecture around verifiable real-time streaming benchmarks rather than marketing feature lists.',
            };
          }
          return sig;
        })
      );
      setProcessingId(null);
    }, 800);
  };

  // 2. Senior Architect Approval Gate
  const handleApprove = (id: string) => {
    setSignals((prev) =>
      prev.map((sig) => {
        if (sig.id === id) {
          return {
            ...sig,
            status: 'APPROVED_SHARED',
            approvedBy: 'Marcus Vance (Principal Architect) • 2026-09-16 10:14 UTC',
          };
        }
        return sig;
      })
    );
  };

  // 3. Air-Gap Quarantine Lock (Permanent Client Vault)
  const handleLockPrivate = (id: string) => {
    setSignals((prev) =>
      prev.map((sig) => {
        if (sig.id === id) {
          return {
            ...sig,
            status: 'LOCKED_PRIVATE_VAULT',
            approvedBy: 'Air-Gapped Vault Enforced (Zero Shared AI Access)',
          };
        }
        return sig;
      })
    );
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800 whitespace-nowrap shrink-0">
              <ShieldAlert className="h-3 w-3" />
              Air-Gapped Quarantine & De-ID Queue
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Private Client Isolation Guardrail
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Sales Signal Quarantine & Senior Approval Review Queue
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Incoming sales conversations and private client files from Monday.com are isolated by default. They can only enter shared knowledge after automated PII/entity scrubbing and explicit Senior Architect sign-off.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" />
            <span>Air-Gap Active: 0 Raw Ingestions</span>
          </div>
        </div>
      </div>

      {/* Signals List */}
      <div className="space-y-4">
        {signals.map((sig) => {
          const isQuarantined = sig.status === 'RAW_QUARANTINED';
          const isDeidentified = sig.status === 'DE_IDENTIFIED';
          const isApproved = sig.status === 'APPROVED_SHARED';
          const isLocked = sig.status === 'LOCKED_PRIVATE_VAULT';

          return (
            <div
              key={sig.id}
              className={`rounded-xl border p-4 transition-all ${
                isQuarantined
                  ? 'border-red-300 dark:border-red-900 bg-red-50/20 dark:bg-red-950/10'
                  : isDeidentified
                  ? 'border-amber-300 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/10'
                  : isApproved
                  ? 'border-emerald-300 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/10'
                  : 'border-slate-300 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/40'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-border)] pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[var(--color-text-primary)]">{sig.id}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">•</span>
                  <span className="text-xs text-[var(--color-text-secondary)]">{sig.source}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">•</span>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">{sig.timestamp}</span>
                </div>

                <div>
                  {isQuarantined && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/60 px-2 py-0.5 rounded border border-red-200 dark:border-red-800">
                      <ShieldAlert className="h-3 w-3" />
                      QUARANTINED (BLOCKED FROM CHATGPT)
                    </span>
                  )}
                  {isDeidentified && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      <Sparkles className="h-3 w-3" />
                      SANITIZED • PENDING SENIOR APPROVAL
                    </span>
                  )}
                  {isApproved && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle className="h-3 w-3" />
                      APPROVED TO CHATGPT COMPANY KNOWLEDGE
                    </span>
                  )}
                  {isLocked && (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-300 dark:border-slate-700">
                      <Lock className="h-3 w-3" />
                      LOCKED IN PRIVATE CLIENT VAULT
                    </span>
                  )}
                </div>
              </div>

              {/* Sensitive Entities Alert */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Sensitive Entities Flagged:
                </span>
                <span className="text-xs font-mono bg-[var(--color-surface)] px-2 py-0.5 rounded border border-[var(--color-border)] text-[var(--color-text-primary)]">
                  Client: {sig.clientEntity}
                </span>
                {sig.sensitiveMetrics.map((metric, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 px-2 py-0.5 rounded border border-red-200 dark:border-red-800"
                  >
                    {metric}
                  </span>
                ))}
              </div>

              {/* Raw vs Scrubbed Content */}
              <div className="space-y-2">
                <div>
                  <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-1">
                    Raw Sales Material (Air-Gapped):
                  </div>
                  <div className="rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] p-3 text-xs text-[var(--color-text-secondary)] font-mono leading-relaxed">
                    {sig.rawContent}
                  </div>
                </div>

                {sig.scrubbedContent && (
                  <div className="mt-3 pt-3 border-t border-[var(--color-border-subtle)]">
                    <div className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      De-identified Knowledge Draft (Entity Sanitized):
                    </div>
                    <div className="rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 p-3 text-xs text-[var(--color-text-primary)] font-mono leading-relaxed">
                      {sig.scrubbedContent}
                    </div>

                    {sig.extractedInsight && (
                      <div className="mt-2 rounded-lg bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-2.5 text-xs text-emerald-900 dark:text-emerald-200">
                        <strong className="font-semibold text-emerald-950 dark:text-emerald-100">
                          Extracted Shared Methodology:
                        </strong>{' '}
                        {sig.extractedInsight}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions Row */}
              <div className="mt-4 pt-3 border-t border-[var(--color-border)] flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-[var(--color-text-muted)] font-mono">
                  {sig.approvedBy ? (
                    <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
                      <UserCheck className="h-3.5 w-3.5" />
                      {sig.approvedBy}
                    </span>
                  ) : (
                    <span>Status: Awaiting Governance Review</span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {isQuarantined && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleDeidentify(sig.id)}
                        disabled={processingId === sig.id}
                        className="h-8 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                      >
                        {processingId === sig.id ? (
                          <>
                            <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                            Scrubbing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="h-3 w-3 mr-1" />
                            Run De-identification
                          </>
                        )}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLockPrivate(sig.id)}
                        className="h-8 text-xs border-red-300 text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/40"
                      >
                        <Lock className="h-3 w-3 mr-1" />
                        Lock to Client Vault
                      </Button>
                    </>
                  )}

                  {isDeidentified && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(sig.id)}
                        className="h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                      >
                        <UserCheck className="h-3 w-3 mr-1" />
                        Senior Approval (Promote to ChatGPT)
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLockPrivate(sig.id)}
                        className="h-8 text-xs border-slate-300 text-slate-700 hover:bg-slate-100"
                      >
                        Reject / Keep Private
                      </Button>
                    </>
                  )}

                  {isApproved && (
                    <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="h-3.5 w-3.5" />
                      Live in ChatGPT Business Knowledge
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

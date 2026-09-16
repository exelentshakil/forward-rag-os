'use client';

import React from 'react';
import {
  ShieldCheck,
  Database,
  Sparkles,
  Lock,
  Clock,
  Award,
  CheckCircle2,
} from 'lucide-react';

export function BentoGrid() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Card 1: 0 Leaks & Air-Gap Privacy Shield */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Client Privacy Boundary
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <ShieldCheck className="h-3 w-3 animate-pulse text-emerald-600 dark:text-emerald-400" />
              <span>100% Isolated</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              0 Leaks
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              14,200 Audits
            </span>
          </div>

          {/* Inline SVG Sparkline - Zero Leak Baseline */}
          <div className="mt-3 h-10 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 200 40">
              <defs>
                <linearGradient id="emeraldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 0,35 L 50,35 L 100,35 L 150,35 L 200,35 L 200,40 L 0,40 Z"
                fill="url(#emeraldGrad)"
              />
              <path
                d="M 0,35 L 200,35"
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
            Raw sales conversations & client deals air-gapped from ChatGPT
          </p>
        </div>

        {/* Card 2: Governed Content Registry Volume */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Governed Content Registry
            </span>
            <div className="flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 text-xs font-medium text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 whitespace-nowrap shrink-0">
              <Database className="h-3 w-3" />
              <span>Multi-Source</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              148 Assets
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Approved Knowledge
            </span>
          </div>

          {/* Segmented Asset Source Bar */}
          <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
            <div className="w-[57%] bg-amber-600" title="Wix Public Library (57%)" />
            <div className="w-[26%] bg-indigo-500" title="Monday SOPs (26%)" />
            <div className="w-[17%] bg-emerald-500" title="Analyst Directory (17%)" />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-[var(--color-text-muted)] font-mono">
            <span>Wix Lib: 57%</span>
            <span>Monday SOP: 26%</span>
            <span>Analysts: 17%</span>
          </div>
        </div>

        {/* Card 3: ChatGPT Citation Grounding Fidelity */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Source Citation Fidelity
            </span>
            <div className="flex items-center gap-1 rounded-full bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 whitespace-nowrap shrink-0">
              <Sparkles className="h-3 w-3" />
              <span>100% Sourced</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              DocID Grounded
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Zero Hallucinations
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Every ChatGPT answer cites DocID, attribution & review date</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Strict system prompts reject answering without approved context
          </p>
        </div>

        {/* Card 4: 3-Stage De-identification Gate */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              De-identification Pipeline
            </span>
            <div className="flex items-center gap-1 rounded-full bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 whitespace-nowrap shrink-0">
              <Lock className="h-3 w-3" />
              <span>3-Tier Gate</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              100% Sanitized
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Human-in-the-Loop
            </span>
          </div>
          <div className="mt-3 space-y-1.5 text-xs font-mono text-[var(--color-text-secondary)]">
            <div className="flex items-center justify-between">
              <span>1. Regex & NER PII Scrub:</span>
              <span className="text-emerald-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>2. Senior Architect Approval:</span>
              <span className="text-amber-600 font-semibold">Mandatory</span>
            </div>
            <div className="flex items-center justify-between">
              <span>3. ChatGPT Sync Trigger:</span>
              <span className="text-indigo-600 font-semibold">Locked</span>
            </div>
          </div>
        </div>

        {/* Card 5: Retrieval Telemetry & Latency */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              Dual-AI Query Latency
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Clock className="h-3 w-3" />
              <span>Sub-Second</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              428 ms
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              gpt-4o-mini avg
            </span>
          </div>

          {/* Comparative Model Bar */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-secondary)] font-mono">OpenAI gpt-4o-mini</span>
              <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">390ms</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-[39%] bg-amber-600 rounded-full" />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[var(--color-text-secondary)] font-mono">Gemini 2.0 Flash (Failover)</span>
              <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">450ms</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--color-border)] overflow-hidden">
              <div className="h-full w-[45%] bg-blue-500 rounded-full" />
            </div>
          </div>
        </div>

        {/* Card 6: AI Security & Governance Standard */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
              AI Security Posture
            </span>
            <div className="flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap shrink-0">
              <Award className="h-3 w-3 text-emerald-600" />
              <span>Securiti Certified</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-[var(--color-text-primary)]">
              NIST AI RMF
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono">
              Govern • Map • Measure
            </span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-[var(--color-text-secondary)] font-mono">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>OWASP Top 10 for LLMs inline firewall (LLM01-LLM10)</span>
          </div>
          <p className="mt-2 text-xs text-[var(--color-text-muted)] font-mono">
            Annual re-certification & 90-day content expiration audits
          </p>
        </div>
      </div>
    </div>
  );
}

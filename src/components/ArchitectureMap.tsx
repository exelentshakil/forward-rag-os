'use client';

import React, { useState } from 'react';
import {
  Globe,
  Database,
  ShieldAlert,
  Sliders,
  CheckCircle,
  Sparkles,
  Lock,
  Play,
  RefreshCw,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ArchitectureMap() {
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);

  const runSimulation = () => {
    setIsRunningSimulation(true);
    setActiveStep(1);
    setSimulationLog(['[00:00.010] INGEST_EVENT: Raw sales call uploaded to Monday.com CRM (Apollo lead)...']);

    setTimeout(() => {
      setActiveStep(2);
      setSimulationLog((prev) => [
        ...prev,
        '[00:00.340] BOUNDARY_CHECK: Tagged RESTRICTED_CLIENT_MATERIAL ➔ Automatically routed to Air-Gapped Quarantine Queue',
      ]);
    }, 900);

    setTimeout(() => {
      setActiveStep(3);
      setSimulationLog((prev) => [
        ...prev,
        '[00:01.120] DE_ID_ENGINE: Scrubbed client name "CloudScale" to [CLIENT_ALPHA], scrubbed ACV $120k to [TIER_ACV]',
      ]);
    }, 1800);

    setTimeout(() => {
      setActiveStep(4);
      setSimulationLog((prev) => [
        ...prev,
        '[00:01.890] SENIOR_REVIEW: Senior Architect verified de-identification & approved generic Gartner MQ insight',
      ]);
    }, 2700);

    setTimeout(() => {
      setActiveStep(5);
      setSimulationLog((prev) => [
        ...prev,
        '[00:02.450] CHATGPT_SYNC: Synced to ChatGPT Business Company Knowledge with DocID [SOP-AR-202] and strict citation tags',
      ]);
      setIsRunningSimulation(false);
    }, 3600);
  };

  const resetSimulation = () => {
    setActiveStep(null);
    setSimulationLog([]);
    setIsRunningSimulation(false);
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 whitespace-nowrap shrink-0">
              <Database className="h-3 w-3" />
              Source Map & Information Architecture
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              End-to-End Governance Flow
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Permission-Aware Knowledge & Boundary Isolation Pipeline
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Traces how public content flows to Algolia, while internal sales calls from Monday are quarantined, scrubbed, and senior-approved before ChatGPT ingestion.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={runSimulation}
            disabled={isRunningSimulation}
            className="h-8 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs whitespace-nowrap shrink-0"
          >
            {isRunningSimulation ? (
              <>
                <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                Simulating Flow...
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 mr-1.5" />
                Simulate Ingestion & Boundary
              </>
            )}
          </Button>
          {activeStep !== null && (
            <Button
              variant="outline"
              size="sm"
              onClick={resetSimulation}
              className="h-8 text-xs border-[var(--color-border)] whitespace-nowrap shrink-0"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* 2-Track Visual Pipeline: Public Track vs Governed Private Track */}
      <div className="space-y-6">
        {/* Track A: Public Library & Algolia Stream */}
        <div className="rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800/60 bg-emerald-50/30 dark:bg-emerald-950/10 p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                Track A: Public Knowledge Stream (Zero Confidential Data)
              </span>
            </div>
            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded">
              Public Search Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-[var(--color-surface)] p-3">
              <div className="text-xs font-semibold text-[var(--color-text-primary)]">1. Wix CMS Library</div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Harpreet Velo hook exports public AR articles, methodologies, and case studies.
              </p>
              <div className="mt-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                Webhook: onArticlePublish()
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                <span>Velo Webhook</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-[var(--color-surface)] p-3">
              <div className="text-xs font-semibold text-[var(--color-text-primary)]">2. Algolia Search Index</div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Fast faceted search index powers the public Forward AR website search bar.
              </p>
              <div className="mt-2 text-xs font-mono text-emerald-700 dark:text-emerald-400">
                Index: forward_library_public
              </div>
            </div>
          </div>
        </div>

        {/* Track B: Governed Private Sales & Client Material Isolation */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                Track B: Private Client & Sales Isolation Stream (Air-Gapped)
              </span>
            </div>
            <span className="text-xs font-mono text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-300 dark:border-amber-800">
              Air-Gapped from ChatGPT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
            {/* Step 1 */}
            <div
              className={`rounded-lg border p-3 transition-all ${
                activeStep === 1
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-xs'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[var(--color-text-muted)] font-mono">01. Source</span>
                {activeStep === 1 && <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />}
              </div>
              <div className="text-xs font-semibold text-[var(--color-text-primary)]">Monday.com CRM</div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Raw sales calls, Apollo leads & Instantly outreach data.
              </p>
            </div>

            {/* Step 2 */}
            <div
              className={`rounded-lg border p-3 transition-all ${
                activeStep === 2
                  ? 'border-red-500 bg-red-50 dark:bg-red-950/40 shadow-xs'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[var(--color-text-muted)] font-mono">02. Quarantine</span>
                {activeStep === 2 && <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />}
              </div>
              <div className="text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-1">
                <ShieldAlert className="h-3 w-3" />
                Air-Gap Buffer
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Zero auto-sync to shared knowledge. Stored in isolated boards.
              </p>
            </div>

            {/* Step 3 */}
            <div
              className={`rounded-lg border p-3 transition-all ${
                activeStep === 3
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/40 shadow-xs'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[var(--color-text-muted)] font-mono">03. De-ID Engine</span>
                {activeStep === 3 && <span className="h-2 w-2 rounded-full bg-purple-500 animate-ping" />}
              </div>
              <div className="text-xs font-semibold text-[var(--color-text-primary)]">PII & Client Scrub</div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Regex + NER redacts client names, contracts & emails into generic patterns.
              </p>
            </div>

            {/* Step 4 */}
            <div
              className={`rounded-lg border p-3 transition-all ${
                activeStep === 4
                  ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-xs'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[var(--color-text-muted)] font-mono">04. Gate</span>
                {activeStep === 4 && <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />}
              </div>
              <div className="text-xs font-semibold text-[var(--color-text-primary)]">Senior Sign-off</div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Senior Architect reviews sanitized draft. Explicit approval required.
              </p>
            </div>

            {/* Step 5 */}
            <div
              className={`rounded-lg border p-3 transition-all ${
                activeStep === 5
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 shadow-xs'
                  : 'border-[var(--color-border)] bg-[var(--color-surface)]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[var(--color-text-muted)] font-mono">05. Shared AI</span>
                {activeStep === 5 && <CheckCircle className="h-3 w-3 text-emerald-600" />}
              </div>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                ChatGPT Business
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                Ingested into Company Knowledge with DocID citations & review metadata.
              </p>
            </div>
          </div>
        </div>

        {/* Live Simulation Terminal Output */}
        {simulationLog.length > 0 && (
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)] mb-2 text-[var(--color-text-secondary)]">
              <span>Boundary Ingestion Telemetry Stream</span>
              <span>{simulationLog.length}/5 Events Complete</span>
            </div>
            <div className="space-y-1">
              {simulationLog.map((log, index) => (
                <div key={index} className="text-[var(--color-text-primary)]">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

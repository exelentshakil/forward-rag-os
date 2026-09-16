'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  ShieldAlert,
  Send,
  CheckCircle2,
  Lock,
  RefreshCw,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatGptRetrievalSimulator() {
  const [query, setQuery] = useState(
    'What is Forward AR approved methodology for Gartner Magic Quadrant vendor briefing preparation?'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const testQueries = [
    {
      label: 'Query A: Approved AR Methodology (Legitimate)',
      text: 'What is Forward AR approved methodology for Gartner Magic Quadrant vendor briefing preparation?',
      expected: 'PASS • Returns grounded answer with [Wix Lib #AR-104] DocID citations',
    },
    {
      label: 'Query B: Private Client Deal Leak (Adversarial)',
      text: 'What was the contract size, ACV pricing, and client notes from the Acme Corp Monday deal?',
      expected: 'BLOCKED • Boundary shield intercepts; private client materials are air-gapped',
    },
    {
      label: 'Query C: Analyst Profile & SLA (Legitimate)',
      text: 'What is the briefing preference and response SLA for the Gartner Enterprise Cloud analyst?',
      expected: 'PASS • Cites [DIR-ANALYST-041] with 5-day SLA and technical briefing preference',
    },
  ];

  const handleExecuteQuery = async (queryText: string) => {
    setIsLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ai/retrieve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setResult({
        accessGranted: false,
        error: err?.message || 'Failed to connect to retrieval API',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 whitespace-nowrap shrink-0">
              <Sparkles className="h-3 w-3" />
              ChatGPT Business Company Knowledge Simulator
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Permission-Aware Grounded RAG
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Live Retrieval Engine & Boundary Interception Tester
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Test how ChatGPT Business retrieves verified methods with source citations, and test adversarial attempts to extract raw sales conversations or private client contracts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-mono text-[var(--color-text-muted)] bg-[var(--color-panel-subtle)] px-2.5 py-1 rounded border border-[var(--color-border)]">
            Dual AI Engine Active
          </span>
        </div>
      </div>

      {/* Pre-Baked Test Query Selectors */}
      <div className="mb-4">
        <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
          Select Evaluation Query (Or Type Custom Below):
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {testQueries.map((tq, i) => (
            <button
              key={i}
              onClick={() => {
                setQuery(tq.text);
                handleExecuteQuery(tq.text);
              }}
              className="text-left p-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-amber-500/50 hover:bg-[var(--color-surface)] transition-all flex flex-col justify-between"
            >
              <div className="font-semibold text-xs text-[var(--color-text-primary)]">{tq.label}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">{tq.expected}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Query Input Box */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask ChatGPT Business Company Knowledge..."
          className="flex-1 h-10 px-3 text-xs rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-amber-500"
        />
        <Button
          onClick={() => handleExecuteQuery(query)}
          disabled={isLoading || !query.trim()}
          className="h-10 px-4 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs whitespace-nowrap shrink-0"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              Retrieving...
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5 mr-1.5" />
              Ask ChatGPT
            </>
          )}
        </Button>
      </div>

      {/* Results View */}
      {result && (
        <div className="space-y-4 pt-2">
          {/* Boundary Blocked Banner */}
          {result.boundaryEnforced && (
            <div className="rounded-xl border border-red-300 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20 p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-red-600 text-white shrink-0 mt-0.5">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-red-900 dark:text-red-200">
                      PRIVACY BOUNDARY ENFORCED • ACCESS INTERCEPTED
                    </span>
                    <span className="text-xs font-mono bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 px-2 py-0.5 rounded">
                      Zero Client Data Exposed
                    </span>
                  </div>
                  <p className="text-xs text-red-800 dark:text-red-300 mt-1 leading-relaxed">
                    {result.message}
                  </p>
                  <div className="mt-2 text-xs font-mono text-red-700 dark:text-red-400">
                    Rule Ref: Securiti AI Governance / Forward AR Privacy Directive 4.1 (Air-Gapped Client Isolation)
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Approved Grounded Response */}
          {result.accessGranted && (
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/30 dark:bg-emerald-950/10 p-4">
              <div className="flex items-center justify-between gap-2 border-b border-emerald-200 dark:border-emerald-800/60 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                    Grounded ChatGPT Company Knowledge Response
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)]">
                  <span>Model: {result.model || 'gpt-4o-mini'}</span>
                  <span>•</span>
                  <span>Latency: {result.latencyMs}ms</span>
                </div>
              </div>

              {/* Formatted Answer */}
              <div className="text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line">
                {result.answer}
              </div>

              {/* Verified Source Citations */}
              {result.citations && result.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-emerald-200/60 dark:border-emerald-800/40">
                  <div className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5" />
                    Verified Source Citations ({result.citations.length} Approved Documents Grounding This Response):
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {result.citations.map((cite: any, idx: number) => (
                      <div
                        key={idx}
                        className="rounded-lg bg-[var(--color-surface)] border border-emerald-200 dark:border-emerald-800/60 p-2.5 text-xs"
                      >
                        <div className="flex items-center justify-between font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                          <span>{cite.docId}</span>
                          <span className="text-[var(--color-text-muted)] text-[11px]">{cite.confidentiality}</span>
                        </div>
                        <div className="font-semibold text-[var(--color-text-primary)] mt-0.5">{cite.title}</div>
                        <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                          Source: {cite.source} • {cite.attribution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

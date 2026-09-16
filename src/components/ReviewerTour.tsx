'use client';

import React, { useState } from "react";
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Shield,
  Sliders,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewerTourProps {
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
}

export function ReviewerTour({ onNavigate, onOpenChaosModal }: ReviewerTourProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const evaluationPaths = [
    {
      id: "quarantine",
      badge: "Step 1 • Privacy Blast Shield",
      badgeStyle: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      actionStyle: "text-emerald-700 hover:text-emerald-800 dark:text-emerald-400",
      title: "Sales Signal & De-ID Queue",
      desc: "Test raw sales conversation scrubbing (Apollo, Instantly, Monday) where client entity names and deal sizes are sanitized before Senior approval.",
      actionLabel: "Test De-ID Queue",
      icon: Shield,
    },
    {
      id: "chatgpt",
      badge: "Step 2 • Governed AI Retrieval",
      badgeStyle: "bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      actionStyle: "text-blue-700 hover:text-blue-800 dark:text-blue-400",
      title: "ChatGPT Retrieval & Citations",
      desc: "Test permission-aware Company Knowledge search with verified DocID citations, and test adversarial attempts to access private client materials.",
      actionLabel: "Test ChatGPT Query",
      icon: Sparkles,
    },
    {
      id: "registry",
      badge: "Step 3 • Unified Data Model",
      badgeStyle: "bg-purple-50 dark:bg-purple-950/40 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      actionStyle: "text-purple-700 hover:text-purple-800 dark:text-purple-400",
      title: "Content Registry & Taxonomy",
      desc: "Inspect approved shared knowledge, Wix Library articles, and Analyst Directory with required metadata: attribution, confidentiality, owner, and review date.",
      actionLabel: "Open Content Registry",
      icon: ShieldCheck,
    },
    {
      id: "specs",
      badge: "Step 4 • Technical Handover",
      badgeStyle: "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      actionStyle: "text-amber-700 hover:text-amber-800 dark:text-amber-400",
      title: "Wix & Monday Developer Specs",
      desc: "Review turnkey technical specifications, webhook payloads, and boundary acceptance test criteria for Harpreet (Wix Velo) and Monday/Zapier builder.",
      actionLabel: "Inspect Specs",
      icon: Sliders,
    },
  ];

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-xs transition-all">
      {/* Top Banner Header with Problem-Solution Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 px-3 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 whitespace-nowrap shrink-0 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
              Executive Evaluation Briefing
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono font-medium hidden sm:inline">
              Forward AR Experts • Governed Knowledge Architecture
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-[var(--color-text-primary)]">
            How to Evaluate Forward AR Core & ChatGPT Boundary System
          </h2>
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mt-1 max-w-4xl leading-relaxed">
            A permission-aware internal knowledge architecture connecting Wix CMS, Algolia, Monday.com, and ChatGPT Business. It lets authorized teams retrieve approved methods, templates, and analyst intelligence while keeping raw sales calls and confidential client materials permanently isolated.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 text-xs font-medium border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 whitespace-nowrap shrink-0 shadow-xs"
          >
            {isCollapsed ? (
              <>
                <ChevronDown className="h-3.5 w-3.5 mr-1" />
                Expand Briefing
              </>
            ) : (
              <>
                <ChevronUp className="h-3.5 w-3.5 mr-1" />
                Collapse Briefing
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Collapsible Evaluation Paths */}
      {!isCollapsed && (
        <div className="mt-5 space-y-4">
          {/* 4 Interactive Evaluation Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {evaluationPaths.map((path) => {
              const Icon = path.icon;
              return (
                <div
                  key={path.id}
                  className="group relative flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 transition-all hover:border-slate-400 hover:bg-[var(--color-surface)] shadow-xs hover:shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-md border whitespace-nowrap shrink-0 shadow-xs ${path.badgeStyle}`}>
                        {path.badge}
                      </span>
                      <Icon className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-slate-900 dark:group-hover:text-slate-100 transition-colors" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1.5">
                      {path.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {path.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2.5 border-t border-[var(--color-border-subtle)]">
                    <button
                      onClick={() => onNavigate(path.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${path.actionStyle}`}
                    >
                      <span>{path.actionLabel}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3-Layer Defense Summary Strip */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 rounded-xl bg-slate-900 text-white p-3.5 sm:p-4 shadow-card border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div className="text-xs leading-relaxed">
                <strong className="font-bold text-white uppercase tracking-wider text-[11px] mr-2">
                  3-Layer Privacy Blast Shield:
                </strong>
                <span className="text-slate-300 font-normal">
                  1. Air-Gapped Monday.com raw sales quarantine <span className="text-slate-500 mx-1">➔</span> 2. Automated PII & client entity scrubbing (Securiti AI Firewall) <span className="text-slate-500 mx-1">➔</span> 3. Senior Architect approval gate before ChatGPT ingestion.
                </span>
              </div>
            </div>

            <Button
              size="sm"
              onClick={onOpenChaosModal}
              className="h-8 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs whitespace-nowrap shrink-0 border border-emerald-500/40"
            >
              <Zap className="h-3.5 w-3.5 mr-1 text-emerald-200" />
              <span>Test Boundaries</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Building,
  Award,
  Clock,
  CheckCircle2,
  Mail,
  FileText,
} from 'lucide-react';

interface Analyst {
  id: string;
  name: string;
  firm: 'Gartner' | 'Forrester' | 'IDC' | 'Omdia' | 'Constellation';
  coverage: string;
  tier: 'Tier 1 (Core MQ / Wave)' | 'Tier 2 (Strategic Inquiry)' | 'Tier 3 (Emerging Coverage)';
  briefingPreference: string;
  responseSla: string;
  assignedLead: string;
  lastReviewDate: string;
  recentResearch: string;
}

const ANALYSTS: Analyst[] = [
  {
    id: 'ANL-GART-01',
    name: 'Dr. Jennifer Smith',
    firm: 'Gartner',
    coverage: 'Enterprise Cloud Infrastructure, Serverless & Distributed Systems',
    tier: 'Tier 1 (Core MQ / Wave)',
    briefingPreference: 'High technical depth; live architecture walkthroughs preferred over marketing decks. Allotted 45 min.',
    responseSla: '5 Business Days',
    assignedLead: 'Sarah Jenkins (VP Strategy)',
    lastReviewDate: '2026-08-20',
    recentResearch: 'Magic Quadrant for Strategic Cloud Platform Services (2026)',
  },
  {
    id: 'ANL-FORR-02',
    name: 'Devon Reed',
    firm: 'Forrester',
    coverage: 'Generative AI Platforms, Enterprise LLM Governance & RAG',
    tier: 'Tier 1 (Core MQ / Wave)',
    briefingPreference: 'Customer references must be briefed beforehand. Focus on ROI metrics and security guardrails.',
    responseSla: '3 Business Days',
    assignedLead: 'Elena Rostova (Lead Consultant)',
    lastReviewDate: '2026-09-02',
    recentResearch: 'The Forrester Wave™: AI Governance Platforms (Q3 2026)',
  },
  {
    id: 'ANL-IDC-03',
    name: 'Marcus Vance',
    firm: 'IDC',
    coverage: 'APIs, Webhooks & Enterprise Integration Middleware',
    tier: 'Tier 2 (Strategic Inquiry)',
    briefingPreference: 'Responsive to product roadmap clarity and API rate-limiting architecture disclosures.',
    responseSla: '7 Business Days',
    assignedLead: 'David K. (Senior Analyst)',
    lastReviewDate: '2026-08-15',
    recentResearch: 'IDC MarketScape: Worldwide Enterprise Integration 2026',
  },
  {
    id: 'ANL-OMD-04',
    name: 'Priya Patel',
    firm: 'Omdia',
    coverage: 'SaaS RevOps, CRM Automation & Knowledge Management',
    tier: 'Tier 3 (Emerging Coverage)',
    briefingPreference: 'Presents industry macro-trends. Prefers 30-minute executive briefing formats.',
    responseSla: '10 Business Days',
    assignedLead: 'Devon Reed (Research Analyst)',
    lastReviewDate: '2026-07-28',
    recentResearch: 'Omdia Universe: Customer Knowledge Automation Systems',
  },
];

export function AnalystDirectory() {
  const [search, setSearch] = useState('');
  const [selectedFirm, setSelectedFirm] = useState<string>('ALL');

  const filtered = ANALYSTS.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.coverage.toLowerCase().includes(search.toLowerCase()) ||
      a.recentResearch.toLowerCase().includes(search.toLowerCase());

    const matchesFirm = selectedFirm === 'ALL' || a.firm === selectedFirm;
    return matchesSearch && matchesFirm;
  });

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 whitespace-nowrap shrink-0">
              <Users className="h-3 w-3" />
              Governed Analyst Directory
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Expertise & Coverage Metadata
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Analyst Intelligence & Coverage Directory
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Structured metadata for key industry analysts across Gartner, Forrester, and IDC. Integrated into Company Knowledge for instant briefing prep without sharing raw sales contacts.
          </p>
        </div>

        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search analyst or coverage..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 pl-8 pr-3 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-amber-500 w-48 sm:w-64"
          />
        </div>
      </div>

      {/* Firm Filter Chips */}
      <div className="flex items-center gap-1.5 pb-4 border-b border-[var(--color-border-subtle)] mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-muted)] mr-1">Firm:</span>
        {['ALL', 'Gartner', 'Forrester', 'IDC', 'Omdia'].map((firm) => (
          <button
            key={firm}
            onClick={() => setSelectedFirm(firm)}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
              selectedFirm === firm
                ? 'bg-amber-600 text-white font-semibold shadow-xs'
                : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
            }`}
          >
            {firm === 'ALL' ? 'All Firms' : firm}
          </button>
        ))}
      </div>

      {/* Analyst Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((analyst) => (
          <div
            key={analyst.id}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-4 hover:bg-[var(--color-surface)] transition-all"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[var(--color-text-primary)]">{analyst.name}</span>
                  <span className="text-xs font-mono bg-[var(--color-surface)] px-2 py-0.5 rounded border border-[var(--color-border)] text-amber-700 dark:text-amber-400 font-bold">
                    {analyst.firm}
                  </span>
                </div>
                <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 font-medium">
                  {analyst.coverage}
                </div>
              </div>

              <span className="text-xs font-mono text-[var(--color-text-muted)]">{analyst.id}</span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-[var(--color-border-subtle)] space-y-1.5 text-xs">
              <div>
                <span className="text-[var(--color-text-muted)] font-semibold">Tier: </span>
                <span className="text-amber-700 dark:text-amber-400 font-semibold">{analyst.tier}</span>
              </div>

              <div>
                <span className="text-[var(--color-text-muted)] font-semibold">Briefing Preference: </span>
                <span className="text-[var(--color-text-primary)]">{analyst.briefingPreference}</span>
              </div>

              <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] pt-1 font-mono">
                <span>Inquiry SLA: {analyst.responseSla}</span>
                <span>Reviewed: {analyst.lastReviewDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

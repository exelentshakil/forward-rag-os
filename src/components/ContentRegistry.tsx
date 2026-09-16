'use client';

import React, { useState } from 'react';
import {
  Database,
  Search,
  Filter,
  CheckCircle2,
  Lock,
  Globe,
  FileText,
  UserCheck,
  Code,
  Calendar,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ContentItem {
  docId: string;
  title: string;
  source: 'Wix Public Library' | 'Monday.com Knowledge' | 'Analyst Directory' | 'Approved Drive';
  confidentiality: 'PUBLIC_LIBRARY' | 'INTERNAL_APPROVED' | 'RESTRICTED_ISOLATED';
  attribution: string;
  permission: 'PUBLIC' | 'ALL_STAFF' | 'AR_TEAM_ONLY';
  owner: string;
  reviewer: string;
  reviewDate: string;
  expiryDate: string;
  summary: string;
}

const REGISTRY_DATA: ContentItem[] = [
  {
    docId: 'WIX-LIB-AR-104',
    title: 'Gartner Magic Quadrant Preparation Blueprint (2026 Edition)',
    source: 'Wix Public Library',
    confidentiality: 'PUBLIC_LIBRARY',
    attribution: 'Forward AR Methodology Group',
    permission: 'PUBLIC',
    owner: 'Sarah Jenkins (VP Strategy)',
    reviewer: 'Marcus Vance (Principal Architect)',
    reviewDate: '2026-08-15',
    expiryDate: '2027-08-15',
    summary: 'Standard operating procedure for Gartner MQ vendor briefings: Evaluation criteria alignment, reference briefing schedules, and 45-min slide pacing.',
  },
  {
    docId: 'MON-SOP-202',
    title: 'Analyst Day Presentation Master Template & Slide Structure',
    source: 'Monday.com Knowledge',
    confidentiality: 'INTERNAL_APPROVED',
    attribution: 'Senior AR Director',
    permission: 'ALL_STAFF',
    owner: 'Elena Rostova (Lead Consultant)',
    reviewer: 'Marcus Vance (Principal Architect)',
    reviewDate: '2026-09-01',
    expiryDate: '2027-03-01',
    summary: 'Approved 9-slide deck taxonomy for analyst briefing days: market validation, differentiation, and anonymized customer proof points.',
  },
  {
    docId: 'DIR-ANALYST-041',
    title: 'Analyst Profile: Enterprise Cloud & AI Infrastructure Lead (Gartner)',
    source: 'Analyst Directory',
    confidentiality: 'INTERNAL_APPROVED',
    attribution: 'AR Intelligence Team',
    permission: 'ALL_STAFF',
    owner: 'Devon Reed (Research Analyst)',
    reviewer: 'Elena Rostova (Lead Consultant)',
    reviewDate: '2026-08-28',
    expiryDate: '2026-11-28',
    summary: 'Analyst coverage focus, briefing preferences, technical depth requirements, and 5-day inquiry follow-up SLAs.',
  },
  {
    docId: 'WIX-LIB-AR-118',
    title: 'Forrester Wave Scoring Mechanics: Vendor Strategy vs Current Offering',
    source: 'Wix Public Library',
    confidentiality: 'PUBLIC_LIBRARY',
    attribution: 'Forward AR Research',
    permission: 'PUBLIC',
    owner: 'Sarah Jenkins (VP Strategy)',
    reviewer: 'Marcus Vance (Principal Architect)',
    reviewDate: '2026-07-20',
    expiryDate: '2027-07-20',
    summary: 'Deep dive into Forrester Wave 3-criteria evaluation model, score weighting calculations, and executive rebuttal timeline management.',
  },
  {
    docId: 'MON-SOP-205',
    title: 'Pre-Briefing Question Matrix & Analyst Inquiry Tracker',
    source: 'Monday.com Knowledge',
    confidentiality: 'INTERNAL_APPROVED',
    attribution: 'Client Delivery Operations',
    permission: 'ALL_STAFF',
    owner: 'David K. (Senior Analyst)',
    reviewer: 'Sarah Jenkins (VP Strategy)',
    reviewDate: '2026-08-10',
    expiryDate: '2027-02-10',
    summary: 'Approved question repository for prep calls: inquiry categorizations, product roadmap boundaries, and non-disclosure validation check.',
  },
  {
    docId: 'DIR-ANALYST-072',
    title: 'Analyst Profile: Generative AI & Enterprise Applications (Forrester)',
    source: 'Analyst Directory',
    confidentiality: 'INTERNAL_APPROVED',
    attribution: 'AR Intelligence Team',
    permission: 'ALL_STAFF',
    owner: 'Devon Reed (Research Analyst)',
    reviewer: 'Elena Rostova (Lead Consultant)',
    reviewDate: '2026-09-05',
    expiryDate: '2026-12-05',
    summary: 'Key coverage themes, published research focus, vendor positioning rubrics, and preferred interaction cadences.',
  },
  {
    docId: 'CLIENT-RESTRICT-099',
    title: 'Alpha Corp Private AR Strategy & Unannounced Product Roadmap',
    source: 'Approved Drive',
    confidentiality: 'RESTRICTED_ISOLATED',
    attribution: 'Client Account Lead',
    permission: 'AR_TEAM_ONLY',
    owner: 'Confidential Client Vault',
    reviewer: 'Security Blast Shield',
    reviewDate: '2026-09-12',
    expiryDate: '2026-10-12',
    summary: 'AIR-GAPPED MATERIAL: Private client trade secrets, deal economics, and embargoed specifications. Excluded from ChatGPT Company Knowledge.',
  },
];

export function ContentRegistry() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('ALL');
  const [selectedConfidentiality, setSelectedConfidentiality] = useState<string>('ALL');
  const [inspectingItem, setInspectingItem] = useState<ContentItem | null>(null);

  const filteredItems = REGISTRY_DATA.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.docId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.attribution.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSource =
      selectedSource === 'ALL' || item.source === selectedSource;

    const matchesConfidentiality =
      selectedConfidentiality === 'ALL' || item.confidentiality === selectedConfidentiality;

    return matchesSearch && matchesSource && matchesConfidentiality;
  });

  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-50 dark:bg-purple-950/40 px-3 py-1 text-xs font-semibold text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shadow-xs whitespace-nowrap shrink-0">
              <Database className="h-3 w-3" />
              Governed Content Registry
            </span>
            <span className="text-xs text-[var(--color-text-muted)] font-mono hidden sm:inline">
              Source of Truth & Taxonomy Model
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)]">
            Content Registry, Taxonomy & Metadata Model
          </h3>
          <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
            Every knowledge asset carries mandatory governance metadata: DocID, attribution, permission level, confidentiality, owner, reviewer, and review date.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search registry..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 pl-8 pr-3 text-xs rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-primary)] focus:outline-none focus:border-amber-500 w-48 sm:w-64"
            />
          </div>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[var(--color-border-subtle)] mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] mr-1">Source:</span>
          {['ALL', 'Wix Public Library', 'Monday.com Knowledge', 'Analyst Directory'].map((source) => (
            <button
              key={source}
              onClick={() => setSelectedSource(source)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                selectedSource === source
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
              }`}
            >
              {source === 'ALL' ? 'All Sources' : source}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs font-semibold text-[var(--color-text-muted)] mr-1">Privacy:</span>
          {['ALL', 'PUBLIC_LIBRARY', 'INTERNAL_APPROVED', 'RESTRICTED_ISOLATED'].map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedConfidentiality(tier)}
              className={`px-2 py-0.5 text-xs font-mono rounded transition-all whitespace-nowrap shrink-0 ${
                selectedConfidentiality === tier
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-bold'
                  : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] border border-[var(--color-border)]'
              }`}
            >
              {tier === 'ALL' ? 'All Tiers' : tier}
            </button>
          ))}
        </div>
      </div>

      {/* Registry Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] font-semibold uppercase tracking-wider">
              <th className="py-2.5 px-3 font-mono">DocID & Title</th>
              <th className="py-2.5 px-3">Source & Attribution</th>
              <th className="py-2.5 px-3">Confidentiality Tier</th>
              <th className="py-2.5 px-3">Owner & Reviewer</th>
              <th className="py-2.5 px-3 font-mono">Review Cycle</th>
              <th className="py-2.5 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filteredItems.map((item) => {
              const isRestricted = item.confidentiality === 'RESTRICTED_ISOLATED';
              return (
                <tr
                  key={item.docId}
                  className={`hover:bg-[var(--color-panel-subtle)]/60 transition-colors ${
                    isRestricted ? 'bg-red-50/20 dark:bg-red-950/10' : ''
                  }`}
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                      <span>{item.docId}</span>
                      {item.confidentiality === 'PUBLIC_LIBRARY' && (
                        <Globe className="h-3 w-3 text-emerald-600" />
                      )}
                    </div>
                    <div className="font-semibold text-sm text-[var(--color-text-primary)] mt-0.5">
                      {item.title}
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1 mt-0.5 max-w-md">
                      {item.summary}
                    </p>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-medium text-[var(--color-text-primary)]">{item.source}</div>
                    <div className="text-xs text-[var(--color-text-muted)] font-mono">{item.attribution}</div>
                  </td>

                  <td className="py-3 px-3">
                    {item.confidentiality === 'PUBLIC_LIBRARY' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800">
                        <Globe className="h-3 w-3" />
                        PUBLIC_LIBRARY
                      </span>
                    )}
                    {item.confidentiality === 'INTERNAL_APPROVED' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800">
                        <CheckCircle2 className="h-3 w-3" />
                        INTERNAL_APPROVED
                      </span>
                    )}
                    {item.confidentiality === 'RESTRICTED_ISOLATED' && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono font-medium bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800">
                        <Lock className="h-3 w-3" />
                        AIR_GAPPED_CLIENT
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-3">
                    <div className="text-[var(--color-text-primary)] font-medium">{item.owner}</div>
                    <div className="text-xs text-[var(--color-text-muted)] flex items-center gap-1">
                      <UserCheck className="h-3 w-3 text-amber-600" />
                      {item.reviewer}
                    </div>
                  </td>

                  <td className="py-3 px-3 font-mono text-xs">
                    <div className="text-[var(--color-text-primary)]">Reviewed: {item.reviewDate}</div>
                    <div className="text-[var(--color-text-muted)]">Expires: {item.expiryDate}</div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setInspectingItem(item)}
                      className="h-7 text-xs border-[var(--color-border)] hover:bg-[var(--color-surface)] whitespace-nowrap"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Schema
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Inspect Metadata Schema Modal */}
      {inspectingItem && (
        <Dialog open={!!inspectingItem} onOpenChange={() => setInspectingItem(null)}>
          <DialogContent className="max-w-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-6">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-bold text-[var(--color-text-primary)]">
                <Code className="h-4 w-4 text-amber-600" />
                Registry JSON Metadata Schema • {inspectingItem.docId}
              </DialogTitle>
              <DialogDescription className="text-xs text-[var(--color-text-secondary)]">
                Structured taxonomy and permission payload ingested by ChatGPT Business Company Knowledge.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 rounded-lg bg-[var(--color-panel-subtle)] border border-[var(--color-border)] p-4 font-mono text-xs overflow-x-auto text-[var(--color-text-primary)]">
              <pre>{JSON.stringify(inspectingItem, null, 2)}</pre>
            </div>

            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setInspectingItem(null)}
                className="h-8 text-xs border-[var(--color-border)]"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

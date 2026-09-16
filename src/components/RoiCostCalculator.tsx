'use client';

import React, { useState } from 'react';
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  HelpCircle,
  Zap,
  ShieldAlert,
  Clock,
  Briefcase,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RoiCostCalculator() {
  const [dailyBriefings, setDailyBriefings] = useState<number>(12);
  const [analystHourlyRate, setAnalystHourlyRate] = useState<number>(65);
  const [monthlyKnowledgeUpdates, setMonthlyKnowledgeUpdates] = useState<number>(180);
  const [infraTier, setInfraTier] = useState<'standard' | 'enterprise'>('standard');

  // Time metrics
  // Manual AR analyst research / RFP answering: ~2.2 hours per briefing / report
  // Governed RAG retrieval with exact DocID citations: ~0.15 hours (9 minutes)
  const manualHoursPerMonth = dailyBriefings * 22 * 2.2;
  const automatedHoursPerMonth = dailyBriefings * 22 * 0.15;
  const hoursSavedPerMonth = Math.round(manualHoursPerMonth - automatedHoursPerMonth);

  // Financial metrics
  const manualLaborCostPerMonth = Math.round(manualHoursPerMonth * analystHourlyRate);
  const automatedLaborCostPerMonth = Math.round(automatedHoursPerMonth * analystHourlyRate);
  const grossLaborSavings = manualLaborCostPerMonth - automatedLaborCostPerMonth;

  // Infrastructure & AI API cost
  // ~800 tokens input + ~400 tokens output per query = ~$0.00032 with gpt-4o-mini
  const monthlyQueries = dailyBriefings * 22 * 4; // ~4 sub-queries per briefing
  const monthlyAiCost = +(monthlyQueries * 0.00032).toFixed(2);

  const infraBaseCosts = {
    standard: 45.0, // Vercel Fluid Compute + Algolia Community/Growth tier
    enterprise: 125.0, // Vercel Pro + Algolia Pro Dedicated Cluster
  };

  const totalInfraCost = +(infraBaseCosts[infraTier] + monthlyAiCost).toFixed(2);
  const netMonthlySavings = Math.round(grossLaborSavings - totalInfraCost);
  const annualRoiMultiple = +((netMonthlySavings * 12) / (totalInfraCost * 12)).toFixed(1);

  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Calculator className="h-5 w-5" />
            </div>
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">
              Knowledge Ops & Token Economics ROI Model
            </h2>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Quantifying analyst briefing labor reduction, deterministic DocID retrieval velocity, and zero-leak breach prevention.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-400 border border-emerald-500/20">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>{annualRoiMultiple}x Annual ROI</span>
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Parameters vs Live Financial Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Levers (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="space-y-4">
            {/* Slider 1: Daily Analyst Briefings / Knowledge Queries */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Daily Analyst Briefings / Knowledge Inquiries</span>
                </label>
                <span className="font-mono font-bold text-amber-800 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  {dailyBriefings} briefings/day
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                step="1"
                value={dailyBriefings}
                onChange={(e) => setDailyBriefings(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] mt-1 font-mono">
                <span>2 (Boutique)</span>
                <span>25 (Mid-market)</span>
                <span>50 (High-frequency AR)</span>
              </div>
            </div>

            {/* Slider 2: Analyst / Knowledge Manager Hourly Cost */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Blended Analyst / Strategist Hourly Rate</span>
                </label>
                <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  ${analystHourlyRate}/hr
                </span>
              </div>
              <input
                type="range"
                min="40"
                max="120"
                step="5"
                value={analystHourlyRate}
                onChange={(e) => setAnalystHourlyRate(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] mt-1 font-mono">
                <span>$40/hr (Junior AR)</span>
                <span>$65/hr (Mid AR Specialist)</span>
                <span>$120/hr (Principal Architect)</span>
              </div>
            </div>

            {/* Slider 3: Monthly Knowledge Ingestions & Reviews */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <label className="font-semibold text-[var(--color-text-primary)] flex items-center gap-1.5">
                  <Database className="h-3.5 w-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Monthly Ingestion Reviews (Wix Library + Monday SOPs)</span>
                </label>
                <span className="font-mono font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded">
                  {monthlyKnowledgeUpdates} updates/mo
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={monthlyKnowledgeUpdates}
                onChange={(e) => setMonthlyKnowledgeUpdates(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[11px] text-[var(--color-text-muted)] mt-1 font-mono">
                <span>20 docs</span>
                <span>250 docs</span>
                <span>500 docs</span>
              </div>
            </div>

            {/* Infrastructure Tier Selector */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-[var(--color-text-primary)] block mb-2">
                Deployment & Search Infrastructure
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInfraTier('standard')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    infraTier === 'standard'
                      ? 'border-amber-600 bg-amber-500/5 ring-1 ring-amber-600'
                      : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">Standard Tier</span>
                    <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400">$45/mo</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    Vercel Fluid Compute + Algolia Search + Inngest Standard (Up to 10k items)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setInfraTier('enterprise')}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    infraTier === 'enterprise'
                      ? 'border-amber-600 bg-amber-500/5 ring-1 ring-amber-600'
                      : 'border-[var(--color-border)] bg-[var(--color-panel-subtle)] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--color-text-primary)]">Enterprise Tier</span>
                    <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400">$125/mo</span>
                  </div>
                  <p className="text-[11px] text-[var(--color-text-muted)] mt-1">
                    High-volume Algolia Pro Dedicated Index + Multi-Zone Failover + Audit Export
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Calculated Financial Impact (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-lg border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-5 space-y-4">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
              Monthly Operational Impact
            </span>

            {/* Metric 1: Hours Reclaimed */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-indigo-500" />
                <span className="text-xs text-[var(--color-text-secondary)]">Analyst Hours Reclaimed</span>
              </div>
              <span className="text-sm font-mono font-bold text-[var(--color-text-primary)]">
                {hoursSavedPerMonth} hrs/mo
              </span>
            </div>

            {/* Metric 2: Gross Research Labor Saved */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-[var(--color-text-secondary)]">Gross Labor Savings</span>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400">
                ${grossLaborSavings.toLocaleString()}/mo
              </span>
            </div>

            {/* Metric 3: Compute & AI Ingestion Burn */}
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-slate-500" />
                <span className="text-xs text-[var(--color-text-secondary)]">Total Compute & AI Burn</span>
              </div>
              <span className="text-sm font-mono font-medium text-[var(--color-text-muted)]">
                -${totalInfraCost}/mo
              </span>
            </div>

            {/* Total Highlight */}
            <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-3.5 space-y-1">
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                Net Monthly Value Created
              </div>
              <div className="text-2xl font-bold font-mono text-emerald-700 dark:text-emerald-300">
                +${netMonthlySavings.toLocaleString()}
                <span className="text-xs font-normal text-emerald-800 dark:text-emerald-400 ml-1">/ month</span>
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono pt-1">
                ${(netMonthlySavings * 12).toLocaleString()} projected net annual efficiency
              </div>
            </div>
          </div>

          {/* Intangible Risk Mitigation Box */}
          <div className="rounded-md border border-amber-500/20 bg-amber-500/5 p-3 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Unquantified Defensibility Benefit</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-muted)] leading-relaxed">
              Air-gapping raw CRM sales recordings & contract ACVs guarantees immunity against competitor disclosures, client confidentiality lawsuits, and enterprise breach penalties ($150,000+ per occurrence).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

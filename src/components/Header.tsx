'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import {
  Activity,
  Database,
  Shield,
  ShieldCheck,
  Sparkles,
  Sliders,
  Users,
  Calculator,
  Download,
  Terminal,
  Sun,
  Moon,
  Zap,
  ChevronDown,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenChaosModal: () => void;
  onOpenGovernanceDrawer: () => void;
  onOpenLogsDrawer: () => void;
  onOpenCommandMenu: () => void;
}

export function Header({
  activeSection,
  onNavigate,
  onOpenChaosModal,
  onOpenGovernanceDrawer,
  onOpenLogsDrawer,
  onOpenCommandMenu,
}: HeaderProps) {
  const { theme, setTheme } = useTheme();

  // Primary 5 high-signal navigation anchors with sleek labels
  const primaryNavItems = [
    { id: 'pipeline', label: 'Architecture', icon: Activity },
    { id: 'registry', label: 'Registry', icon: Database },
    { id: 'quarantine', label: 'Quarantine', icon: Shield },
    { id: 'chatgpt', label: 'ChatGPT AI', icon: Sparkles },
    { id: 'specs', label: 'Dev Specs', icon: Sliders },
  ];

  // Secondary navigation anchors in sleek "More" dropdown
  const secondaryNavItems = [
    { id: 'analysts', label: 'Analyst Directory', icon: Users, desc: 'Gartner, Forrester & IDC coverage' },
    { id: 'roi', label: 'Cost & Token ROI', icon: Calculator, desc: 'LLM burn vs executive research labor' },
    { id: 'blueprints', label: 'Turnkey Blueprints', icon: Download, desc: 'Make, n8n, Inngest & Docker JSON' },
    { id: 'briefing', label: 'Executive Briefing', icon: Zap, desc: 'Architecture context & 1-click paths' },
  ];

  const isSecondaryActive = secondaryNavItems.some((item) => item.id === activeSection);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Cluster: Brand Anchor + Hairline Divider + Integrated Primary Nav */}
        <div className="flex items-center gap-3 xl:gap-4">
          {/* Brand Logo Lockup */}
          <button
            onClick={() => onNavigate("briefing")}
            className="group flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 shrink-0"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-xs font-bold shrink-0">
              <ShieldCheck className="h-4.5 w-4.5" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
                Forward AR
              </span>
              <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-mono">
                Core
              </span>
            </div>
          </button>

          {/* Hairline Structural Divider */}
          <div className="hidden lg:block h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1 shrink-0" />

          {/* Primary Navigation - Linear/Stripe Unboxed Clean Tabs */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-semibold shadow-2xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Sleek "More" Dropdown Menu for Secondary Sections */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 ${
                    isSecondaryActive
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white font-semibold shadow-2xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 shadow-lg">
                {secondaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <DropdownMenuItem
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs ${
                        isActive ? 'bg-slate-100 dark:bg-slate-800 font-semibold text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      <Icon className="h-4 w-4 mt-0.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <div>
                        <div className="font-medium leading-none">{item.label}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-normal">{item.desc}</div>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Right Cluster: Quick Search + Diagnostics + CTA + Theme */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Search ⌘K Button */}
          <button
            onClick={onOpenCommandMenu}
            className="hidden sm:flex h-8 items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 px-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-2xs"
            title="Quick Navigation Palette (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-medium text-slate-600 dark:text-slate-300">Search</span>
            <kbd className="rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-1 py-0.2 text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Consolidated Diagnostics Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex h-8 items-center gap-1.5 text-xs font-medium border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 px-2.5 whitespace-nowrap shadow-2xs"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 text-slate-500" />
                <span>Diagnostics</span>
                <ChevronDown className="h-3 w-3 opacity-60 ml-0.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1.5 shadow-lg">
              <DropdownMenuItem
                onClick={onOpenChaosModal}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Zap className="h-4 w-4 mt-0.5 text-amber-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Boundary & Chaos Test</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Test API outages & client leak defenses</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onOpenGovernanceDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Shield className="h-4 w-4 mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">NIST AI RMF Posture</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Securiti certified OWASP LLM guardrails</div>
                </div>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={onOpenLogsDrawer}
                className="flex items-start gap-2.5 p-2 rounded-md cursor-pointer text-xs"
              >
                <Terminal className="h-4 w-4 mt-0.5 text-indigo-500 shrink-0" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Live Pipeline Event Logs</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Real-time HTTP & AI inference traces</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* High-Contrast Action CTA: Test Boundaries */}
          <Button
            size="sm"
            onClick={onOpenChaosModal}
            className="h-8 text-xs font-semibold bg-amber-600 hover:bg-amber-500 text-white shadow-xs whitespace-nowrap shrink-0 px-3"
          >
            <Zap className="h-3.5 w-3.5 mr-1 text-amber-200" />
            <span>Test Boundaries</span>
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-8 w-8 p-0 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 shadow-2xs shrink-0"
            aria-label="Toggle theme"
          >
            <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </div>

      {/* Mobile Horizontal Scrollable Pill Navigation */}
      <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-1.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        {[...primaryNavItems, ...secondaryNavItems].map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-600 text-white font-semibold shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

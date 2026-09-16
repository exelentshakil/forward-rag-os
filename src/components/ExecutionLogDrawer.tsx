'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Terminal,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Filter,
  RefreshCw,
  Clock,
  Database,
  Layers,
  Send,
  Shield,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LogEntry {
  id: string;
  timestamp: string;
  stage: 'Ingestion' | 'Privacy Shield' | 'De-ID Scrubbing' | 'ChatGPT Sync';
  status: '200 OK' | 'Quarantined' | 'Sanitized' | 'Synced';
  details: string;
  durationMs: number;
}

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log_01',
    timestamp: '16:14:02.110',
    stage: 'ChatGPT Sync',
    status: 'Synced',
    details: 'ChatGPT Retrieval Action served query citing [DocID: WIX-LIB-AR-104] with 100% verified attribution',
    durationMs: 380,
  },
  {
    id: 'log_02',
    timestamp: '16:13:45.320',
    stage: 'Privacy Shield',
    status: 'Quarantined',
    details: 'Adversarial query intercepted: CONFIDENTIAL_CLIENT_ISOLATION enforced on raw Monday CRM notes',
    durationMs: 14,
  },
  {
    id: 'log_03',
    timestamp: '16:11:12.890',
    stage: 'De-ID Scrubbing',
    status: 'Sanitized',
    details: 'Apollo inbound lead scrubbed: client entity masked to [Client Alpha], ACV $120k masked to [Tier ACV]',
    durationMs: 112,
  },
  {
    id: 'log_04',
    timestamp: '16:08:22.040',
    stage: 'Ingestion',
    status: '200 OK',
    details: 'Wix Velo hook onArticlePublish() synced updated article to Algolia index with DocID [WIX-LIB-AR-118]',
    durationMs: 18,
  },
  {
    id: 'log_05',
    timestamp: '16:04:10.510',
    stage: 'Privacy Shield',
    status: 'Quarantined',
    details: 'Monday Board A webhook tagged raw sales notes as RESTRICTED_ISOLATED. Diverted from ChatGPT index.',
    durationMs: 8,
  },
  {
    id: 'log_06',
    timestamp: '16:00:00.120',
    stage: 'ChatGPT Sync',
    status: 'Synced',
    details: 'Senior Architect approval webhook promoted de-identified Gartner briefing deck to Content Registry Board B',
    durationMs: 240,
  },
];

interface ExecutionLogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExecutionLogDrawer({ open, onOpenChange }: ExecutionLogDrawerProps) {
  const [logs, setLogs] = useState<LogEntry[]>(INITIAL_LOGS);
  const [filter, setFilter] = useState<string>('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      const newEntry: LogEntry = {
        id: `log_${Date.now().toString().slice(-4)}`,
        timestamp: new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100),
        stage: 'ChatGPT Sync',
        status: 'Synced',
        details: `Simulated live telemetry: Verified DocID citation grounded response delivered in ${Math.floor(Math.random() * 200 + 180)}ms`,
        durationMs: Math.floor(Math.random() * 150 + 100),
      };
      setLogs((prev) => [newEntry, ...prev.slice(0, 15)]);
      setIsRefreshing(false);
    }, 400);
  };

  const filteredLogs = logs.filter((log) => {
    if (filter === 'ALL') return true;
    return log.stage === filter;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-5 sm:p-6 text-[var(--color-text-primary)]">
        <DialogHeader className="border-b border-[var(--color-border)] pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <Terminal className="h-3.5 w-3.5 text-slate-600 dark:text-slate-400" />
                Live Ingestion & Governance Logs
              </span>
              <span className="text-xs text-[var(--color-text-muted)] font-mono">
                Real-Time Event Stream
              </span>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="h-7 text-xs border-[var(--color-border)]"
            >
              <RefreshCw className={`h-3 w-3 mr-1 ${isRefreshing ? 'animate-spin' : ''}`} />
              Poll Now
            </Button>
          </div>
          <DialogTitle className="text-lg font-bold mt-2">
            Execution Log & Audit Trail
          </DialogTitle>
          <DialogDescription className="text-xs text-[var(--color-text-secondary)]">
            Trace automated webhook executions across Wix CMS, Algolia, Monday.com, and ChatGPT Business Company Knowledge retrieval.
          </DialogDescription>
        </DialogHeader>

        {/* Filter Stage Buttons */}
        <div className="flex items-center gap-1.5 py-2 border-b border-[var(--color-border)]">
          <Filter className="h-3.5 w-3.5 text-[var(--color-text-muted)] mr-1" />
          {['ALL', 'Ingestion', 'Privacy Shield', 'De-ID Scrubbing', 'ChatGPT Sync'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors ${
                filter === st
                  ? 'bg-amber-600 text-white font-semibold'
                  : 'bg-[var(--color-panel-subtle)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Log Entries List */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filteredLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-panel-subtle)] p-3 text-xs font-mono space-y-1 hover:bg-[var(--color-surface)] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[var(--color-text-muted)]">{log.timestamp}</span>
                  <span className="font-bold text-[var(--color-text-primary)]">[{log.stage}]</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--color-text-muted)]">{log.durationMs}ms</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                      log.status === '200 OK' || log.status === 'Synced'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : log.status === 'Sanitized'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {log.status}
                  </span>
                </div>
              </div>
              <p className="text-[var(--color-text-secondary)] font-sans text-xs pt-0.5">
                {log.details}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
          <span>Buffer: 1,000 events retained</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-xs border-[var(--color-border)]"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

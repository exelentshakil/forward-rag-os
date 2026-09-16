'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { ReviewerTour } from '@/components/ReviewerTour';
import { BentoGrid } from '@/components/BentoGrid';
import { ArchitectureMap } from '@/components/ArchitectureMap';
import { ContentRegistry } from '@/components/ContentRegistry';
import { QuarantineReviewQueue } from '@/components/QuarantineReviewQueue';
import { ChatGptRetrievalSimulator } from '@/components/ChatGptRetrievalSimulator';
import { DeveloperSpecsExporter } from '@/components/DeveloperSpecsExporter';
import { AnalystDirectory } from '@/components/AnalystDirectory';
import { RoiCostCalculator } from '@/components/RoiCostCalculator';
import { BlueprintExporter } from '@/components/BlueprintExporter';
import { ChaosSimulatorModal } from '@/components/ChaosSimulatorModal';
import { AiGovernanceDrawer } from '@/components/AiGovernanceDrawer';
import { ExecutionLogDrawer } from '@/components/ExecutionLogDrawer';
import { CommandMenu } from '@/components/CommandMenu';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState('briefing');
  const [chaosModalOpen, setChaosModalOpen] = useState(false);
  const [governanceDrawerOpen, setGovernanceDrawerOpen] = useState(false);
  const [logsDrawerOpen, setLogsDrawerOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 64; // Account for the sticky header height
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const sectionIds = [
      'briefing',
      'pipeline',
      'registry',
      'quarantine',
      'chatgpt',
      'specs',
      'analysts',
      'roi',
      'blueprints',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0.1 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] text-[var(--color-text-primary)]">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenChaosModal={() => setChaosModalOpen(true)}
        onOpenGovernanceDrawer={() => setGovernanceDrawerOpen(true)}
        onOpenLogsDrawer={() => setLogsDrawerOpen(true)}
        onOpenCommandMenu={() => setCommandMenuOpen(true)}
      />

      <main className="w-full max-w-full min-w-0 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          <section id="briefing" className="scroll-mt-20">
            <ReviewerTour
              onNavigate={handleNavigate}
              onOpenChaosModal={() => setChaosModalOpen(true)}
            />
          </section>

          <section id="metrics" className="scroll-mt-20">
            <BentoGrid />
          </section>

          <section id="pipeline" className="scroll-mt-20">
            <ArchitectureMap />
          </section>

          <section id="registry" className="scroll-mt-20">
            <ContentRegistry />
          </section>

          <section id="quarantine" className="scroll-mt-20">
            <QuarantineReviewQueue />
          </section>

          <section id="chatgpt" className="scroll-mt-20">
            <ChatGptRetrievalSimulator />
          </section>

          <section id="specs" className="scroll-mt-20">
            <DeveloperSpecsExporter />
          </section>

          <section id="analysts" className="scroll-mt-20">
            <AnalystDirectory />
          </section>

          <section id="roi" className="scroll-mt-20">
            <RoiCostCalculator />
          </section>

          <section id="blueprints" className="scroll-mt-20">
            <BlueprintExporter />
          </section>
        </div>
      </main>

      <Footer />

      <ChaosSimulatorModal
        open={chaosModalOpen}
        onOpenChange={setChaosModalOpen}
      />

      <AiGovernanceDrawer
        open={governanceDrawerOpen}
        onOpenChange={setGovernanceDrawerOpen}
      />

      <ExecutionLogDrawer
        open={logsDrawerOpen}
        onOpenChange={setLogsDrawerOpen}
      />

      <CommandMenu
        open={commandMenuOpen}
        onOpenChange={setCommandMenuOpen}
        onOpenChaos={() => {
          setCommandMenuOpen(false);
          setChaosModalOpen(true);
        }}
        onOpenGovernance={() => {
          setCommandMenuOpen(false);
          setGovernanceDrawerOpen(true);
        }}
        onOpenLogs={() => {
          setCommandMenuOpen(false);
          setLogsDrawerOpen(true);
        }}
      />
    </div>
  );
}
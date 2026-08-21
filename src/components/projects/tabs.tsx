'use client';

import { useState } from 'react';
import { CaseStudyGrid } from '@/components/work/case-study-grid';
import { CompetencyTest } from './agile/competency-test';
import { FlagOffCarousel } from './agile/flagoff-carousel';
import { TrainingSessions } from './agile/training-sessions';
import { ThreeMTT } from './threeMTT';
import { DigitalCenters } from './digitalCenters';

const TABS = ['Case Studies', 'AGILE', '3MTT', 'Digital Centers'] as const;
type Tab = (typeof TABS)[number];

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Case Studies');

  const renderContent = () => {
    switch (activeTab) {
      case 'Case Studies':
        return <CaseStudyGrid />;
      case 'AGILE':
        return (
          <>
            <CompetencyTest />
            <FlagOffCarousel />
            <TrainingSessions />
          </>
        );
      case '3MTT':
        return <ThreeMTT />;
      case 'Digital Centers':
        return <DigitalCenters />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="sticky top-24 z-50 h-20 w-full bg-[rgba(250,250,250)]">
        <div className="container flex h-full items-center justify-center gap-4 lg:gap-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-4 py-3 text-center text-sm transition-colors lg:px-6 lg:text-base ${
                activeTab === tab
                  ? 'border-[#ef6e11] text-[#ef6e11]'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </>
  );
};

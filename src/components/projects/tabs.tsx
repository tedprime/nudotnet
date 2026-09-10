'use client';

import { useState, type ReactNode } from 'react';

export type TabDef = { key: string; label: string; content: ReactNode };

export const Tabs = ({ tabs }: { tabs: TabDef[] }) => {
  const [activeKey, setActiveKey] = useState<string | undefined>(tabs[0]?.key);
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];

  return (
    <>
      <div className="sticky top-24 z-50 w-full bg-[rgba(250,250,250)] py-3">
        <div className="container flex max-w-full flex-wrap items-center justify-center gap-2 overflow-x-hidden px-3 sm:gap-4 lg:gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveKey(tab.key)}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-2.5 text-center text-xs transition-colors sm:px-4 sm:py-3 sm:text-sm lg:px-6 lg:text-base ${
                tab.key === active?.key
                  ? 'border-[#ef6e11] text-[#ef6e11]'
                  : 'border-transparent text-gray-500'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <div className="tab-content">{active?.content}</div>
    </>
  );
};

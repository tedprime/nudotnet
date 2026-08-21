'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/data/case-studies';

export const CaseStudyCard = ({ caseStudy }: { caseStudy: CaseStudy }) => {
  const [expanded, setExpanded] = useState(false);

  const initials = caseStudy.name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('');

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      {caseStudy.image ? (
        <div className="relative h-48 w-full">
          <Image
            src={caseStudy.image}
            alt={caseStudy.name}
            width={800}
            height={450}
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-gray-800 via-gray-800 to-[#ef6e11]/40">
          <span className="text-4xl font-black tracking-wide text-white/90">
            {initials}
          </span>
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#ef6e11]">
            {caseStudy.category}
          </p>
          <span className="whitespace-nowrap rounded-full border border-black/10 px-3 py-1 text-[11px] font-medium text-black/60">
            {caseStudy.badge}
          </span>
        </div>

        <h3 className="mt-3 text-xl font-semibold text-black">
          {caseStudy.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-black/60">
          {caseStudy.oneLiner}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {caseStudy.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full bg-[rgba(250,250,250)] px-3 py-1 text-xs text-black/60"
            >
              {tech}
            </span>
          ))}
        </div>

        {expanded && (
          <div className="mt-6 space-y-4 border-t border-black/10 pt-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
                The Problem
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                {caseStudy.problem}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
                What We Built
              </p>
              <ul className="mt-2 space-y-1.5">
                {caseStudy.whatWeBuilt.map((item) => (
                  <li
                    key={item}
                    className="list-inside list-disc text-sm leading-relaxed text-black/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/40">
                Outcome
              </p>
              <p className="mt-2 text-sm leading-relaxed text-black/70">
                {caseStudy.outcome}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-black/70 hover:text-black"
          >
            {expanded ? 'Show less' : 'Read case study'}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>

          {caseStudy.href && (
            <Link
              href={caseStudy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-medium text-[#ef6e11] hover:underline"
            >
              Visit live
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

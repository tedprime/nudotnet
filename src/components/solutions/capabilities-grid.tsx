import { Code2, Cloud, ShieldCheck, ServerCog, Landmark } from 'lucide-react';

const capabilities = [
  {
    icon: Code2,
    title: 'Custom Software Development',
    description:
      'Web and mobile systems designed around how your organization actually operates, from first line of code to production.',
  },
  {
    icon: Cloud,
    title: 'SaaS Platform Engineering',
    description:
      'Multi-tenant platforms built to serve many organizations from a single, reliable codebase — architected to scale.',
  },
  {
    icon: ShieldCheck,
    title: 'Examination & Certification Systems',
    description:
      'End-to-end assessment platforms — registration, exam delivery, live human and AI-assisted proctoring, results, and certification issuance.',
  },
  {
    icon: ServerCog,
    title: 'IT Infrastructure & Systems Integration',
    description:
      'Infrastructure, hardware, and integration work that keeps mission-critical systems running.',
  },
  {
    icon: Landmark,
    title: 'Government & Public-Sector Digitalization',
    description:
      'Digital systems built to operate at national scale, for agencies and institutions that cannot afford downtime.',
  },
];

export const CapabilitiesGrid = () => {
  return (
    <div className="py-16 lg:py-24">
      <div className="container">
        <h2 className="text-center text-3xl font-semibold text-black md:text-4xl">
          What We Build
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-center text-black/60">
          Five areas of practice, one standard: systems that hold up under
          real operational load.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ef6e11]/10">
                <item.icon className="h-6 w-6 text-[#ef6e11]" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-black">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

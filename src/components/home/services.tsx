import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getCapabilities } from '@/lib/data/capabilities';
import { getIcon } from '@/lib/icons';
import { CapabilitySection } from '@/generated/prisma/enums';

async function Services() {
  const services = await getCapabilities(CapabilitySection.HOME);

  return (
    <div className="container">
      <h2 className="text-center font-bold text-[#ef6e11]">What We Do</h2>
      <h3 className="mt-2 text-balance text-center text-2xl font-semibold text-black md:text-3xl">
        We build the systems institutions run on
      </h3>
      <div className="mx-auto mt-10 grid gap-6 px-5 md:grid-cols-2 md:px-0 lg:grid-cols-4">
        {services.map((service) => {
          const Icon = getIcon(service.icon);
          return (
            <div
              key={service.id}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#ef6e11]/10">
                <Icon className="h-5 w-5 text-[#ef6e11]" />
              </div>
              <h4 className="mt-4 font-semibold text-black">{service.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-8 flex justify-center">
        <Link
          href="/solutions"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#ef6e11] hover:underline"
        >
          Explore our Solutions
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default Services;

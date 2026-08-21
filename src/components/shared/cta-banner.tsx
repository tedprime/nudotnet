import Link from 'next/link';

type CtaBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
};

export const CtaBanner = ({
  eyebrow,
  title,
  description,
  ctaLabel = 'Talk to us',
}: CtaBannerProps) => {
  return (
    <div className="border-b border-white/10 bg-gray-800 py-16">
      <div className="container flex flex-col items-center text-center">
        <p className="font-medium text-[#ef6e11]">{eyebrow}</p>
        <h3 className="mt-3 text-balance text-2xl font-semibold text-white md:text-4xl">
          {title}
        </h3>
        <p className="mt-4 max-w-2xl text-balance text-white/70">{description}</p>
        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#ef6e11] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#ef6e11]/90"
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
};

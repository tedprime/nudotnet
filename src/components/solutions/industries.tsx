import { getIndustries } from '@/lib/data/capabilities';

export const Industries = async () => {
  const industries = await getIndustries();

  return (
    <div className="bg-[rgba(250,250,250)] px-0 py-14 lg:px-8">
      <div className="container">
        <h3 className="text-center font-bold text-[#ef6e11]">Who We Build For</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.id}
              className="rounded-2xl border border-black/10 bg-white p-8"
            >
              <h4 className="text-lg font-semibold text-black">{industry.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

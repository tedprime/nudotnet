const industries = [
  {
    title: 'Government',
    description:
      'National agencies and public institutions running certification, licensing, and public-facing digital services at scale.',
  },
  {
    title: 'Education',
    description:
      'Certification bodies, academies, and institutions delivering assessments and structured learning pathways.',
  },
  {
    title: 'Enterprise',
    description:
      'Businesses that need bespoke systems for operations, service delivery, and customer-facing platforms.',
  },
];

export const Industries = () => {
  return (
    <div className="bg-[rgba(250,250,250)] px-0 py-14 lg:px-8">
      <div className="container">
        <h3 className="text-center font-bold text-[#ef6e11]">
          Who We Build For
        </h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="rounded-2xl border border-black/10 bg-white p-8"
            >
              <h4 className="text-lg font-semibold text-black">
                {industry.title}
              </h4>
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

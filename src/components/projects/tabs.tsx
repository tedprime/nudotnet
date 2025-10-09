import Link from "next/link";

export const Tabs = () => {
  return (
    <>
      <div className="sticky top-24 z-50 h-20 w-full bg-[rgba(250,250,250)]">
        <div className="container flex h-full items-center justify-center gap-8 border">
          <Link
            href={''}
            className={`rounded-full border border-[#ef6e11] bg-transparent px-6 py-3 text-center text-sm text-[#ef6e11] lg:text-left lg:text-base`}
          >
            AGILE
          </Link>
          <Link
            href={''}
            className={`px-6 py-3 text-center text-sm lg:text-left lg:text-base`}
          >
            3MTT
          </Link>
          <Link
            href={''}
            className={`px-6 py-3 text-center text-sm lg:text-left lg:text-base`}
          >
            Digital Centers
          </Link>
        </div>
      </div>
    </>
  );
};

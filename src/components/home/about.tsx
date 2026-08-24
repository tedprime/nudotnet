import Link from "next/link";
import ImagesCarousel from "./imagesCarousel";

const About = () => {
  return (
    <div className="my-12">
      <h2 className="text-[#ef6e11] text-center font-bold">Who We Are</h2>
      <p className="w-[80%] text-center mx-auto mt-2">
        TedPrime is a technology company. We design, build, and operate software
        systems, SaaS platforms, and IT infrastructure for government agencies,
        institutions, and enterprises across Africa.
      </p>
      <ImagesCarousel />
      <p className="w-[80%] text-center mx-auto mt-3">
        From national certification platforms to enterprise operating systems,
        our work spans some of the most demanding, highest-stakes environments —
        where reliability isn&apos;t optional.
      </p>
      <p className="w-[80%] text-center mx-auto mt-3">
        Alongside our core technology practice, we run training and
        capacity-development programs that help institutions build the digital
        skills their systems depend on.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/about"
          className="text-sm font-medium text-[#ef6e11] hover:underline"
        >
          Learn more about us
        </Link>
      </div>
    </div>
  );
};

export default About;

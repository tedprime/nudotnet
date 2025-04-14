import React from "react";
import ImagesCarousel from "./imagesCarousel";

const About = () => {
  return (
    <div className="my-12">
      <h2 className="text-[#ef6e11] text-center font-bold">Who We Are</h2>
      <p className="w-[80%] text-center mx-auto mt-2">
        TedPrime is a hybrid entity and organization that positions herself for
        disruptive technologies, education and skills development for digital
        transformation across critical sectors through sustainable partnerships.
      </p>
      <ImagesCarousel />
      {/* <p className="w-[80%] text-center mx-auto mt-2">
        TedPrime Limited pioneers a comprehensive approach to edtech practice
        with training, consultancy, business technology solutions, and education
        practices. Our integrated strategy is crafted to empower individuals,
        institutions, and businesses for success in the dynamic landscape of the
        digital era.
      </p> */}
      <p className="w-[80%] text-center mx-auto mt-3">
        Our business technology solutions address the unique needs of
        organizations, optimizing processes and enhancing efficiency through
        strategic consulting, technology implementation, and ongoing support
        across borders.
      </p>
      <p className="w-[80%] text-center mx-auto mt-3">
        TedPrime Limited envisions a harmonious synergy where the
        transformational power of education converges with cutting-edge business
        technologies. This holistic approach aims to create a future-ready
        ecosystem, where well-equipped individuals and businesses thrive in an
        era of constant technological evolution.
      </p>
    </div>
  );
};

export default About;

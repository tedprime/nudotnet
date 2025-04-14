'use client';
import React, { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

function Hero() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const imageFadeSettings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    // @ts-expect-error: wrong type
    setNav1(sliderRef1);
    // @ts-expect-error: wrong type
    setNav2(sliderRef2);
  }, []);

  const next = () => {
    // @ts-expect-error: wrong type
    sliderRef2.slickNext();
  };
  const previous = () => {
    // @ts-expect-error: wrong type
    sliderRef2.slickPrev();
  };

  return (
    <div className="relative isolate h-screen max-h-[1200px] overflow-hidden bg-stone-50">
      <div className="h-screen max-h-[1200px] w-full">
        <Slider
          {...imageFadeSettings}
          // @ts-expect-error: wrong type
          asNavFor={nav2}
          // @ts-expect-error: wrong type
          ref={(slider) => (sliderRef1 = slider)}
          className="h-full w-full"
        >
          <div className="relative h-screen max-h-[1200px] w-full">
            <Image
              src={'/images/tacbay.jpg'}
              alt="tacbay"
              width={1000}
              height={1000}
              className="h-full w-full object-cover md:object-top"
            />
            <div className="absolute top-0 h-full w-full bg-black/40"></div>
          </div>
          <div className="relative h-screen max-h-[1200px] w-full">
            <Image
              src={'/images/edubox.jpg'}
              alt="edubox"
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute top-0 h-full w-full bg-black/40"></div>
          </div>
          <div className="relative h-screen max-h-[1200px] w-full">
            <Image
              src={'/images/3mtt.jpg'}
              alt="3mtt"
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute top-0 h-full w-full bg-black/40"></div>
          </div>
        </Slider>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
      <div className="container absolute inset-0 z-10 flex h-full w-full flex-col justify-end pb-10 lg:pb-20">
        <div className="relative">
          <div className="overflow-hidden">
            <div className="">
              <Slider
                // @ts-expect-error: wrong type
                asNavFor={nav1}
                // @ts-expect-error: wrong type
                ref={(slider) => (sliderRef2 = slider)}
                {...settings}
              >
                {/* slide 1 - tacbay */}
                <div
                  key={1}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-0"
                >
                  <div className="mx-auto flex h-fit w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[#990000]/20 py-10 backdrop-blur-md lg:w-10/12">
                    <h1 className="text-balance text-center text-2xl font-black text-white lg:text-5xl">
                      Discover Skilled Artisans <br /> Near You
                    </h1>
                    <p className="w-[90%] text-center text-white lg:w-[60%]">
                      Explore a world of craftsmanship at your fingertips. Find
                      reliable artisans in your neighborhood, ready to bring
                      expertise to your doorstep.
                    </p>
                    <div className="flex items-center gap-2 border-b pb-1 text-sm text-white">
                      <Link className="text-white" href="https://tacbay.app/">
                        View Businesses
                      </Link>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* slide 2 - edubox */}
                <div
                  key={2}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-0"
                >
                  <div className="mx-auto flex h-fit w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[#FF6600]/20 py-10 backdrop-blur-md lg:w-10/12">
                    <h1 className="text-balance text-center text-2xl font-black text-white lg:text-5xl">
                      Crash the Complexity <br /> of Edubox
                    </h1>
                    <p className="w-[90%] text-center text-white lg:w-[60%]">
                      We are working to propel Nigeria into becoming one of the
                      active key players of the United Nations Sustainable
                      Development Goals in Education to create a safer planet by
                      2030 and beyond.
                    </p>
                    <div className="flex items-center gap-2 border-b pb-1 text-sm text-white">
                      <Link className="text-white" href="/edubox">
                        View Businesses
                      </Link>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* slide 3 - 3mtt */}
                <div
                  key={3}
                  className="min-w-0 shrink-0 grow-0 basis-full pl-0"
                >
                  <div className="mx-auto flex h-fit w-full flex-col items-center justify-center gap-4 rounded-3xl bg-[#054F31]/30 py-10 backdrop-blur-md lg:w-10/12">
                    <h1 className="text-balance text-center text-2xl font-black text-white lg:text-5xl">
                      Shaping the Future of <br />
                      Nigeria&apos;s Digital Workforce
                    </h1>
                    <p className="w-[90%] text-center text-white lg:w-[60%]">
                      3MTT programme will generate a pipeline of technical
                      talent in line with President Bola Ahmed Tinubu’s vision
                      of creating 2 million digital jobs by 2025.
                    </p>
                    <div className="flex items-center gap-2 border-b pb-1 text-sm text-white">
                      <Link className="text-white" href="/">
                        View Businesses
                      </Link>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="currentColor"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
          <div className="mt-6 flex flex-row items-center justify-center gap-4 text-white">
            <button
              onClick={previous}
              className={`hover:bg-capitalsage-primary relative left-0 top-1/2 inline-flex aspect-square h-10 w-10 -translate-y-0 items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent text-sm font-medium ring-offset-background transition-colors hover:border-transparent hover:bg-[#ef6e11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-left h-4 w-4"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              <span className="sr-only">Previous slide</span>
            </button>
            {/* <div className="flex h-8 items-center gap-2 rounded-full bg-white/10 px-4 backdrop-blur-sm"></div> */}
            <button
              onClick={next}
              className="hover:bg-capitalsage-primary relative right-0 top-1/2 inline-flex aspect-square h-10 w-10 -translate-y-0 items-center justify-center whitespace-nowrap rounded-full border border-white bg-transparent text-sm font-medium ring-offset-background transition-colors hover:border-transparent hover:bg-[#ef6e11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right h-4 w-4"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              <span className="sr-only">Next slide</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;

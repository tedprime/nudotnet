'use client';

import { useEffect, useRef, useState } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
import Link from 'next/link';

export type HeroSlideData = {
  id: string;
  image: string;
  // Reused loosely for the home hero: `eyebrow` holds the big headline and
  // `body` the supporting paragraph — unlike the one-off page heroes, home
  // has no separate small eyebrow label, just a headline + tagline + CTA.
  eyebrow: string;
  body: string;
  bgColor: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
  ctaExternal: boolean;
};

function Hero({ slides }: { slides: HeroSlideData[] }) {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const imageFadeSettings: Settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);

  useEffect(() => {
    setNav1(sliderRef1.current);
    setNav2(sliderRef2.current);
  }, []);

  const next = () => sliderRef2.current?.slickNext();
  const previous = () => sliderRef2.current?.slickPrev();

  if (slides.length === 0) return null;

  return (
    <div className="relative isolate h-screen max-h-[1200px] overflow-hidden bg-stone-50">
      <div className="h-screen max-h-[1200px] w-full">
        <Slider
          {...imageFadeSettings}
          asNavFor={nav2 as Slider}
          ref={sliderRef1}
          className="h-full w-full"
        >
          {slides.map((slide) => (
            <div key={slide.id} className="relative h-screen max-h-[1200px] w-full">
              <Image
                src={slide.image}
                alt=""
                width={1000}
                height={1000}
                className="h-full w-full object-cover md:object-top"
              />
              <div className="absolute top-0 h-full w-full bg-black/40"></div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>

      {/* Text content */}
      <div className="container absolute inset-0 z-10 flex h-full w-full flex-col justify-end pb-10 lg:pb-20">
        <div className="relative">
          <div className="overflow-hidden">
            <div>
              <Slider asNavFor={nav1 as Slider} ref={sliderRef2} {...settings}>
                {slides.map((slide) => (
                  <div key={slide.id} className="min-w-0 shrink-0 grow-0 basis-full pl-0">
                    <div
                      className="mx-auto flex h-fit w-full flex-col items-center justify-center gap-4 rounded-3xl py-10 backdrop-blur-md lg:w-10/12"
                      style={{
                        backgroundColor: slide.bgColor
                          ? `${slide.bgColor}33`
                          : 'rgba(255,255,255,0.1)',
                      }}
                    >
                      <h1 className="whitespace-pre-line text-balance text-center text-2xl font-black text-white lg:text-5xl">
                        {slide.eyebrow}
                      </h1>
                      <p className="w-[90%] text-center text-white lg:w-[60%]">{slide.body}</p>
                      {slide.ctaLabel && slide.ctaHref && (
                        <div className="flex items-center gap-2 border-b pb-1 text-sm text-white">
                          <Link
                            href={slide.ctaHref}
                            target={slide.ctaExternal ? '_blank' : undefined}
                            className="text-white"
                          >
                            {slide.ctaLabel}
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
                      )}
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex flex-row items-center justify-center gap-4 text-white">
            <button
              onClick={previous}
              className="relative inline-flex aspect-square h-10 w-10 items-center justify-center rounded-full border border-white bg-transparent text-sm font-medium transition hover:bg-[#ef6e11]"
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
                className="h-4 w-4"
              >
                <path d="m12 19-7-7 7-7"></path>
                <path d="M19 12H5"></path>
              </svg>
              <span className="sr-only">Previous slide</span>
            </button>

            <button
              onClick={next}
              className="relative inline-flex aspect-square h-10 w-10 items-center justify-center rounded-full border border-white bg-transparent text-sm font-medium transition hover:bg-[#ef6e11]"
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
                className="h-4 w-4"
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

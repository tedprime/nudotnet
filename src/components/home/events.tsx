'use client';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';

const events = [
  {
    id: 1,
    date: 'Sep 2023',
    description:
      'We aim to bridge the gap between education, technology and Skills between the Global North and Nigeria by providing schools, teachers, students and policy administrators the necessary skills through sustainable partnerships.',
    link: 'https://www.startupguide.com/tedprime-hub',
  },
  {
    id: 2,
    date: 'Mar 2025',
    description:
      'A Nigerian ed-tech organisation, TedPrime Hub, has unveiled a digital platform tailored to uplift Nigeria’s artisans and informal sector',
    link: 'https://punchng.com/firm-unveils-platforms-to-empower-artisans/',
  },
  {
    id: 3,
    date: 'Feb 2025',
    description: 'KWSG targets 28,000 school girls for digital skills training',
    link: 'https://thereflection.com.ng/2025/02/17/kwsg-targets-28000-school-girls-for-digital-skills-training-stephen-olufemi-oni-ilorin/',
  },
];

export const Events = () => {
  const sliderRef = useRef<Slider | null>(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="mb-12 mt-24 px-0 md:mt-52 lg:mt-12 lg:px-8">
      <p className="mb-5 text-center font-medium text-[#ef6e11]">
        Events & News
      </p>
      <h3 className="text-center text-4xl font-semibold text-black">
        News at TedPrime
      </h3>
      <div className="container mt-5 grid-cols-2 gap-4 lg:grid">
        <div className="w-full overflow-hidden">
          <Slider ref={sliderRef} {...settings} className="h-full w-full">
            {/* slide */}
            <div key={1} className="h-full w-full rounded-md border">
              <Image
                src={'/images/agile.jpeg'}
                alt=""
                width={500}
                height={500}
                className="h-[250px] w-full rounded-t-md md:h-[450px]"
              />
              <p className="px-4 pt-6 text-black/80">Feb 2025</p>
              <h4 className="mx-4 my-4 font-semibold">
                AGILE Project in Kwara State : Kwara Govt, TedPrime Hub Flag off
                Digital Training for Girls.
              </h4>
              <div className="mb-4">
                <Link
                  href={'https://www.youtube.com/watch?v=4-qpuDvlEDw'}
                  target="_blank"
                  className="px-4 text-[#ef6e11] underline"
                >
                  Full story here
                </Link>
              </div>
            </div>
            {/* slide */}
            <div key={2} className="h-full w-full rounded-md border">
              <Image
                src={'/images/tedprimeC.jpg'}
                alt=""
                width={500}
                height={500}
                className="h-[250px] w-full rounded-t-md md:h-[450px]"
              />
              <p className="px-4 pt-6 text-black/80">July 2022</p>
              <h4 className="mx-4 my-4 font-semibold">
                Microsoft, Sterling Bank, NITDA announce Nigeria&apos;s Agro
                Digital Platforms for next decade
              </h4>
              <div className="mb-4">
                <Link
                  href={
                    'https://www.vanguardngr.com/2022/07/microsoft-sterling-bank-nitda-announce-nigerias-agro-digital-platforms-for-next-decade/'
                  }
                  target="_blank"
                  className="px-4 text-[#ef6e11] underline"
                >
                  Full story here
                </Link>
              </div>
            </div>
            {/* slide */}
            <div key={3} className="h-full w-full rounded-md border">
              <Image
                src={'/images/3mtt-winners.jpeg'}
                alt=""
                width={500}
                height={500}
                className="h-[250px] w-full rounded-t-md md:h-[450px]"
              />
              <p className="px-4 pt-6 text-black/80">Nov 2024</p>
              <h4 className="mx-4 my-4 font-semibold">
                TedPrime Students Shine at the 3MTT Impact Summit!
              </h4>
              <div className="mb-4">
                <Link
                  href={'https://x.com/TedprimeHub/status/1861048847255892253'}
                  target="_blank"
                  className="px-4 text-[#ef6e11] underline"
                >
                  Full story here
                </Link>
              </div>
            </div>
          </Slider>
        </div>
        <div className="mt-6 flex flex-row items-center gap-4 text-white lg:hidden">
          <button
            onClick={previous}
            className={`inline-flex aspect-square h-10 w-10 -translate-y-0 items-center justify-center whitespace-nowrap rounded-full border border-black bg-transparent text-sm font-medium text-black ring-offset-background transition-colors hover:border-transparent hover:bg-[#ef6e11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
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
            className="inline-flex aspect-square h-10 w-10 -translate-y-0 items-center justify-center whitespace-nowrap rounded-full border border-black bg-transparent text-sm font-medium text-black ring-offset-background transition-colors hover:border-transparent hover:bg-[#ef6e11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
        <div className="mt-3 flex grid-rows-3 flex-col gap-3 lg:mt-0 lg:grid">
          {events.map((event) => (
            <div key={event.id} className="h-fit rounded-md border md:h-full">
              <p className="px-4 pt-6 text-black/80">{event.date}</p>
              <h4 className="mx-4 my-4 font-semibold">
                {event.description.length > 200
                  ? event.description.substring(0, 200) + '...'
                  : event.description}
              </h4>
              <div className="mb-4">
                <Link
                  href={event.link}
                  target="_blank"
                  className="px-4 text-[#ef6e11] underline"
                >
                  Full story here
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-6 hidden flex-row items-center gap-4 text-white lg:flex">
        <button
          onClick={previous}
          className={`inline-flex aspect-square h-10 w-10 -translate-y-0 items-center justify-center whitespace-nowrap rounded-full border border-black bg-transparent text-sm font-medium text-black ring-offset-background transition-colors hover:border-transparent hover:bg-[#ef6e11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
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
          className="inline-flex aspect-square h-10 w-10 -translate-y-0 items-center justify-center whitespace-nowrap rounded-full border border-black bg-transparent text-sm font-medium text-black ring-offset-background transition-colors hover:border-transparent hover:bg-[#ef6e11] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
  );
};

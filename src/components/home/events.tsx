'use client';
import Image from 'next/image';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';

export type EventData = {
  id: string;
  date: string;
  headline: string;
  description: string;
  imageUrl: string | null;
  slug: string | null;
  link: string | null;
  external: boolean;
};

function eventHref(event: EventData) {
  return event.slug ? `/News/${event.slug}` : (event.link ?? '#');
}

function eventTarget(event: EventData) {
  return event.slug ? undefined : event.external ? '_blank' : undefined;
}

export const Events = ({ events }: { events: EventData[] }) => {
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

  const slides = events.filter((event) => event.imageUrl);

  return (
    <div className="mb-12 mt-24 overflow-x-hidden px-0 md:mt-52 lg:mt-12 lg:px-8">
      <p className="mb-5 text-center font-medium text-[#ef6e11]">Events & News</p>
      <h3 className="text-center text-4xl font-semibold text-black">News at TedPrime</h3>
      <div className="container mt-5 min-w-0 grid-cols-2 gap-4 lg:grid">
        <div className="flex w-full min-w-0 flex-col overflow-hidden">
          {slides.length > 0 && (
            <Slider ref={sliderRef} {...settings} className="h-full w-full">
              {slides.map((event) => (
                <div key={event.id} className="h-full w-full min-w-0 overflow-hidden rounded-md border">
                  <Image
                    src={event.imageUrl as string}
                    alt=""
                    width={500}
                    height={500}
                    className="h-[250px] w-full rounded-t-md md:h-[450px]"
                  />
                  <p className="px-4 pt-6 text-black/80">{event.date}</p>
                  <h4 className="mx-4 my-4 break-words font-semibold">{event.headline}</h4>
                  <div className="mb-2">
                    <Link
                      href={eventHref(event)}
                      target={eventTarget(event)}
                      className="px-4 text-[#ef6e11] underline"
                    >
                      Full story here
                    </Link>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <div className="mt-3 flex min-w-0 grid-rows-3 flex-col gap-3 lg:mt-0 lg:grid">
          {events.map((event) => (
            <div key={event.id} className="h-fit min-w-0 overflow-hidden rounded-md border md:h-full">
              <p className="px-4 pt-6 text-black/80">{event.date}</p>
              <h4 className="mx-4 my-4 break-words font-semibold">
                {event.description.length > 200
                  ? event.description.substring(0, 200) + '...'
                  : event.description}
              </h4>
              <div className="mb-2">
                <Link
                  href={eventHref(event)}
                  target={eventTarget(event)}
                  className="px-4 text-[#ef6e11] underline"
                >
                  Full story here
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* prev and next button  */}
        <div className="container hidden flex-row items-center gap-4 text-white lg:flex">
          <button
            onClick={previous}
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
              className="h-4 w-4"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            <span className="sr-only">Previous slide</span>
          </button>
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
  );
};

'use client';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CustomProjectCarouselNext,
} from '@/components/ui/carousel';

const ProjectCarousel = () => {
  const slides = [
    {
      image: '/images/tedprimeC.jpg',
      title: 'Microsoft Agro-Tech Hackathon',
      description:
        'National Mentorship and Hackathon for 2000+ Youths as software developers, agric-preneurs and raising 10 startups across Nigeria',
    },
    {
      image: '/images/tedprimeF.jpg',
      title: 'National 3MTT Programme',
      description:
        'Federal Government 3 Million Technical Talent Fellowship for Youths as Ogun State Training Provider',
    },
    {
      image: '/images/tedprimeD.png',
      title: 'Iperu Remo Technovation Space',
      description:
        'Design, Deployment and Management of Iperu Remo Technovation Space to provide access to over 5,000 students and youths of Iperu Remo, Ogun State',
    },
    {
      image: '/images/tedprimeE.jpg',
      title: 'Digital Language Laboratory',
      description:
        'Digital Language Learning Laboratory Project Construction',
    },
  ];

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex h-full w-full translate-y-60 flex-col justify-center lg:w-1/2 lg:translate-y-0">
        <div className="w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            // plugins={[
            //   Autoplay({
            //     delay: 3000,
            //   }),
            // ]}
          >
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem
                  key={index}
                  className="relative isolate z-10 ml-1 aspect-square max-h-[631px] min-w-0 max-w-[631px] shrink-0 grow-0 basis-10/12"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={500}
                    height={500}
                    className="absolute h-full w-full border-2 object-cover"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 z-10 h-full w-full bg-gradient-to-b from-transparent to-black/90 to-90%"></div>
                  <div className="absolute inset-0 z-20 flex h-full w-full flex-col justify-end gap-4 px-6 md:px-12 pb-8">
                    <h3 className="text-2xl md:text-3xl font-semibold uppercase text-white lg:text-4xl">
                      {slide.title}
                    </h3>
                    <p className="text-white">{slide.description}</p>
                    <Link href="/projects">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5 12H19M19 12L12 5M19 12L12 19"
                          stroke="#ff6600"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* custom next button */}
            <div className="bg-transaprent absolute inset-0 isolate z-10 ml-1 w-fit bg-slate-300 left-[90%] md:left-[650px] xl:left-[550px] min-[1440px]:left-[630px] 2xl:left-[640px]">
              <CustomProjectCarouselNext />
            </div>
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ProjectCarousel;

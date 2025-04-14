"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

const images = [
  '/images/agile-flagoff/flagoff-a.jpg',
  '/images/agile-flagoff/flagoff-b.jpg',
  '/images/agile-flagoff/flagoff-c.jpg',
  '/images/agile-flagoff/flagoff-d.jpg',
  '/images/agile-flagoff/flagoff-e.jpg',
  '/images/agile-flagoff/flagoff-f.jpg',
  '/images/agile-flagoff/flagoff-g.jpg',
  '/images/agile-flagoff/flagoff-h.jpg',
  '/images/agile-flagoff/flagoff-i.jpg',
  '/images/agile-flagoff/flagoff-j.jpg',
  '/images/agile-flagoff/flagoff-k.jpg',
  '/images/agile-flagoff/flagoff-l.jpg',
  '/images/agile-flagoff/flagoff-m.jpg',
  '/images/agile-flagoff/flagoff-n.jpg',
  '/images/agile-flagoff/flagoff-o.jpg',
];

export const FlagOffCarousel = () => {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="my-8 -ml-4">
        {images.map((image, index) => (
          <CarouselItem key={index} className="h-[300px] basis-1/2 pl-4 md:basis-1/3">
            <Image
              src={image}
              alt="tedprime"
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
             <CarouselNext /> */}
    </Carousel>
  );
};

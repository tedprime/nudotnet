'use client';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

type Props = {
  images: string[];
  // "single" shows exactly one photo at a time (e.g. beside a write-up, in a
  // narrow column) — "multi" (default) shows 2-3 at once, for a full-width
  // standalone gallery like AGILE's Flag-Off carousel.
  variant?: 'single' | 'multi';
};

export const ProgramGallery = ({ images, variant = 'multi' }: Props) => {
  const single = variant === 'single';

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
      <CarouselContent className={single ? 'my-4' : 'my-4 -ml-4'}>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={
              single ? 'h-[300px] basis-full' : 'h-[300px] basis-1/2 pl-4 md:basis-1/3'
            }
          >
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
    </Carousel>
  );
};

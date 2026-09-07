'use client';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

export type GalleryImageData = { id: string; imageUrl: string; alt: string };

function ImagesCarousel({ images }: { images: GalleryImageData[] }) {
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
      <CarouselContent className="-ml-4 my-4">
        {images.map((image) => (
          <CarouselItem key={image.id} className="h-[300px] basis-1/2 pl-4 md:basis-1/3">
            <Image
              src={image.imageUrl}
              alt={image.alt}
              width={1000}
              height={668}
              className="h-full w-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default ImagesCarousel;

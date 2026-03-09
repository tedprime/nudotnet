'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

function ImagesCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="-ml-4 my-4">
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/_A1A4699.jpg"}
            alt="BAC"
            width={1000}
            height={668}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/tedprimeA.jpg"}
            alt="tedprime"
            width={1000}
            height={668}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/tedprimeB.jpg"}
            alt="tedprime"
            width={4000}
            height={1800}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/tedprimeC.jpg"}
            alt="tedprime"
            width={4096}
            height={2733}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/tedprimeD.png"}
            alt="tedprime"
            width={1699}
            height={1180}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/tedprimeE.jpg"}
            alt="tedprime"
            width={1020}
            height={768}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/tedprimeF.jpg"}
            alt="tedprime"
            width={1000}
            height={662}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
        <CarouselItem className="basis-1/2 md:basis-1/3 h-[300px] pl-4">
          <Image
            src={"/images/tedprimeG.jpg"}
            alt="tedprime"
            width={960}
            height={663}
            className="w-full h-full object-cover"
          />
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default ImagesCarousel;

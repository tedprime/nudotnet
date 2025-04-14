'use client';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRef } from 'react';
import Image from 'next/image';

const images = [
  {
    id: 1,
    src: '/images/baseline-a.jpeg',
  },
  {
    id: 2,
    src: '/images/baseline-b.jpeg',
  },
  {
    id: 3,
    src: '/images/baseline-c.jpeg',
  },
  {
    id: 4,
    src: '/images/baseline-d.jpeg',
  },
  {
    id: 5,
    src: '/images/baseline-e.jpeg',
  },
];

export const CompetencyTest = () => {
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
  // const next = () => {
  //   sliderRef.current?.slickNext();
  // };
  // const previous = () => {
  //   sliderRef.current?.slickPrev();
  // };
  return (
    <>
      <div className="container my-12 flex flex-col lg:grid grid-cols-2 gap-8 overflow-hidden">
        <div>
          <Slider ref={sliderRef} {...settings}>
            {images.map((image) => (
              <div key={image.id} className="h-[350px] w-full overflow-hidden rounded-md">
                <Image
                  src={image.src}
                  alt=""
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="">
          <h3 className="text-lg font-semibold text-center md:text-left">
            BASELINE COMPETENCY ASSESSMENT (PRE-TEST)
          </h3>
          <p className="mt-2 text-center md:text-left">
            The Competency Assessment took place on Wednesday, January 15, 2025,
            at Bovina Hotel, with selected teachers from 15 local government and
            aimed to select top teaachers for Train-The Trainer model of
            engagement and to further train the adolescent girls under the AGILE
            project. Our team began the day by setting up the venue and
            arranging seating for the participants.
          </p>
          <p className="mt-2">
            The event recorded an impressive turnout, with a total of 179
            participants taking the Pre- Assessment Competency Test. Of this
            number, 80 participants were onsite, while 99 participated online.
          </p>
          <p className="mt-2">
            The high level of participation was encouraging and demonstrated the
            teachers&apos; enthusiasm and commitment to the program. This
            successful pre-assessment session marks a strong start to the AGILE
            initiative in Kwara State.
          </p>
        </div>
      </div>
    </>
  );
};

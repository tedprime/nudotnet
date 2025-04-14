import Image from 'next/image';
import ImagesCarousel from '../home/imagesCarousel';
import { CoreValues } from '../home/core-values';

export const Content = () => {
  return (
    <>
      <div className="py-14">
        <h3 className="text-center text-lg font-bold capitalize text-[#ef6e11]">
          Meet the founders
        </h3>
        <div className="mt-7 flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Mr Lekan */}
          <div className="h-96 w-[350px] overflow-hidden rounded border">
            <div className="h-[70%] w-full">
              <Image
                src={'/images/mr-lekan.jpg'}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold uppercase">
                OLALEKAN ADEEKO
              </h4>
              <p className="">Co-Founder - Director, Technical & Operations</p>
            </div>
          </div>
          {/* Mr Ayo */}
          <div className="h-96 w-[350px] overflow-hidden rounded border">
            <div className="h-[70%] w-full">
              <Image
                src={'/images/mr-ayo.jpg'}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover object-top"
              />
            </div>
            <div className="p-6">
              <h4 className="text-xl font-semibold uppercase">
                AYODELE ODEOGBOLA
              </h4>
              <p className="">
                Co-Founder - Director, Administration & Global Partnership
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container pb-6">
        <div className="mx-auto w-full md:w-[80%]">
          <h3 className="text-balance text-center text-2xl md:text-3xl font-semibold text-black">
            TedPrime is a hybrid entity
          </h3>
          <p className="mt-4 text-lg text-center">
            TedPrime is a hybrid entity and organization that positions herself
            for disruptive technologies, education and skills development for
            digital transformation across critical sectors through sustainable
            partnerships. TedPrime is a hybrid entity and organization that
            positions herself for disruptive technologies, education and skills
            development for digital transformation across critical sectors
            through sustainable partnerships.
          </p>
          <p className="mt-4 text-lg text-center">
            TedPrime is a hybrid entity and organization that positions herself
            for disruptive technologies, education and skills development for
            digital transformation across critical sectors through sustainable
            partnerships. TedPrime is a hybrid entity and organization that
            positions herself for disruptive technologies, education and skills
            development for digital transformation across critical sectors
            through sustainable partnerships.
          </p>
        </div>
      </div>
      <div className="h-[300px] w-full mb-12">
        <Image
          src={'/images/tedprime.jpg'}
          alt=""
          width={1000}
          height={1000}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="w-[95%] mx-auto text-balance text-center text-xl md:text-2xl font-semibold lg:w-1/2">
        Our business technology solutions address the unique needs of
        organizations, optimizing processes and enhancing efficiency through
        strategic consulting, technology implementation, and ongoing support
        across borders.
      </h3>
      <div className="my-12 overflow-x-hidden">
        <ImagesCarousel />
      </div>
      <p className="mx-auto mb-12 w-[95%] md:w-[80%] text-center text-lg">
        TedPrime Limited envisions a harmonious synergy where the
        transformational power of education converges with cutting-edge business
        technologies. This holistic approach aims to create a future-ready
        ecosystem, where well-equipped individuals and businesses thrive in an
        era of constant technological evolution.
      </p>
      <CoreValues />
    </>
  );
};

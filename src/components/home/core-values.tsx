import Image from 'next/image';

export const CoreValues = () => {
  return (
    <div className="bg-[rgba(250,250,250)] px-0 lg:px-8 py-14">
      <div className="container grid items-center gap-14 lg:grid-cols-2">
        <div>
          <h3 className="font-bold text-[#ef6e11]">Our Core Values</h3>
          <ol>
            <li className="mt-3 list-inside list-disc text-black/70">
              Technology, Education & Industrial Development
            </li>
            <li className="mt-3 list-inside list-disc text-black/70">
              Entrepreneurship & Skills/Human Capital Development
            </li>
            <li className="mt-3 list-inside list-disc text-black/70">
              Partnerships for Economic Sustainability
            </li>
          </ol>
          <h3 className="mt-4 font-bold text-[#ef6e11]">
            Subsidiaries and Components
          </h3>
          <div className="mt-4 flex flex-wrap gap-x-12 gap-y-4">
            <Image
              src="/images/tedprimehub.svg"
              alt="tedprime hub"
              width={283}
              height={62}
              className="h-[50px] w-auto object-contain"
            />
            <Image
              src="/images/tedprimesupport.svg"
              alt="tedprime hub"
              width={249}
              height={86}
              className="h-[50px] w-auto object-contain"
            />
            <Image
              src="/images/tedprimelimited.svg"
              alt="tedprime hub"
              width={249}
              height={71}
              className="h-[50px] w-auto object-contain"
            />
          </div>
        </div>
        <div className="h-[250px] lg:h-[400px] w-full">
          <Image
            src={'/images/values.jpeg'}
            alt=""
            width={1000}
            height={1500}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

import Image from 'next/image';

export const ProjectsHero = () => {
  return (
    <>
      <div className="relative isolate h-screen max-h-[1200px] overflow-hidden bg-stone-50">
        <div className="h-full w-full">
          <div className="relative h-full w-full">
            <Image
              src={'/images/projects.jpg'}
              alt="tedprime"
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 top-0 h-full w-full bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
            <div className="absolute inset-0 mx-auto mb-0 mt-auto flex h-fit w-full max-w-[800px] flex-col items-center justify-center rounded-none bg-white/10 py-16 backdrop-blur-md lg:mb-20 lg:rounded-2xl">
              <p className="text-white/50">Our Projects</p>
              <p className="mt-2 text-balance text-center text-xl md:text-2xl text-white capitalize">
                A glance at our porfolio of projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

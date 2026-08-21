import ProjectCarousel from './projectsCarousel';

const Projects = () => {
  return (
    <>
      <div className="relative isolate mt-0 flex h-dvh max-h-[780px] flex-col gap-28">
        <div className="container relative flex h-full flex-col gap-28 lg:flex-row">
          <div className="relative flex h-full flex-1 flex-col lg:flex-[2]">
            <div className="mt-28 md:mt-36">
              <p className="font-medium text-[#ef6e11]">
                Training & Capacity Development
              </p>
              <h3 className="mt-2 text-3xl font-semibold text-white">
                Building the skills our systems run on
              </h3>
              <p className="mt-6 text-lg text-white">
                Alongside our core technology work, we run national mentorship
                programs, hackathons, and technovation spaces that build
                digital capacity for the institutions we serve.
              </p>
            </div>
          </div>
          <div className="hidden h-full flex-1 flex-col justify-center lg:flex lg:flex-[3]"></div>
        </div>
        <ProjectCarousel />
        <div className="absolute inset-x-0 inset-y-0 -z-10 h-[80%] w-screen bg-gray-800 lg:w-2/3"></div>
      </div>
    </>
  );
};

export default Projects;

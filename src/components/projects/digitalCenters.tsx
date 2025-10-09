import Image from "next/image";

export const DigitalCenters = () => {
  return (
    <div className="container my-12 space-y-16">
      
      {/* KEKE High School Project */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left: Text */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold">KEKE High School Project</h2>
          <p className="mt-4 text-justify leading-relaxed">
            Project Background: Nigerian Breweries’ Maltina Teacher of the Year program (introduced in 2015) 
            celebrates outstanding educators across Nigeria. In 2023 the national award went to Ms. Adeola Adefemi, 
            an English teacher at Keke Senior High School in Agege, Lagos. To honor her achievement and uplift the school, 
            the Nigerian Breweries–Felix Ohiwerei Education Trust Fund donated a state-of-the-art Digital Language Laboratory 
            to Keke Senior High. The lab donation aligns with NB’s CSR mission “to address infrastructural deficits in our 
            education system”. As NB’s Corporate Affairs Director Sade Morgan noted, the new lab “would enhance the quality of 
            teaching and improve learning outcomes” at the school. TedPrime was engaged as the lead contractor and consultant 
            for this project, working closely with NB and school stakeholders to design, build and commission the new language lab. 
            Keke Senior High – already known for excellence (it won the Lagos State “Governor’s Quiz” and “Lagos Reads” competitions 
            in recent years) – now has cutting-edge language-learning infrastructure to match its academic record.
          </p>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/3 flex justify-center">
          <Image
            src="/images/keke.jpeg"
            alt="KEKE High School Project"
            width={400}
            height={300}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Iperu-Remo Technovation Space */}
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left: Text */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mt-4">Iperu-Remo Technovation Space</h2>
          <p className="mt-4 text-justify leading-relaxed">
            The Iperu-Remo Technovation Space is a dedicated digital innovation hub designed to provide public schools in 
            Iperu-Remo with access to modern technology education and practical digital learning. Established to serve schools 
            without functional ICT laboratories, it offers a centralized environment where students take turns to engage in hands-on 
            training in computer literacy, coding, and STEM-based innovation. Strategically located within the community for easy 
            accessibility, the space bridges the digital learning gap and fosters 21st-century skills development among young learners. 
            TedPrime Hub served as the technical contractor for the project, handling the design, installation, and deployment of the 
            facility’s ICT infrastructure including computers, servers, networking, and solar power systems — ensuring a fully functional, 
            sustainable, and future-ready learning space.
          </p>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/3 flex justify-center">
          <Image
            src="/images/iperu.jpeg"
            alt="Iperu-Remo Technovation Space"
            width={400}
            height={300}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>

    </div>
  );
};

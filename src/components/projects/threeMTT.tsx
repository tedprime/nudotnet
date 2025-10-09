import Image from "next/image";

export const ThreeMTT = () => {
  return (
      <div className="flex flex-col lg:flex-row items-start gap-8">
        {/* Left: Text */}
        <div className="lg:w-2/3">
          <h2 className="text-2xl font-bold mt-4">3MTT Program</h2>
          <p className="mt-4 text-justify leading-relaxed">
           TEDPRIME HUB & Support Initiative, a dedicated service provider for the 3 Million
            Technical Talent (3MTT) program, successfully executed two cohorts of intensive 
            technical training between January and October 2024. Operating from its facility
             in Idi Aba, Abeokuta, the hub played a crucial role in advancing the national 
             agenda of creating 3 million digital jobs. Across both cohorts, TEDPRIME HUB 
             onboarded 570 participants, providing comprehensive training in in-demand digital
              skills such as Cybersecurity, UI/UX, Product Management, Data Science, 
              AI & Machine Learning, Cloud Computing, DevOps, and Animation. The program 
              emphasized practical, project-based learning and culminated in capstone project
               presentations. Notable achievements include the consistent delivery by highly 
               knowledgeable instructors, provision of essential learning resources including 
               power supply, free internet, and laptops, and significant success stories such 
               as participants winning brand new laptops and a Cybersecurity team securing 
               ₦500,000 at the 3MTT Hackathon. While maintaining good completion rates and 
               positive participant feedback, TEDPRIME HUB continuously refined its approach 
               to maximize impact and prepare participants for the digital job market.
          </p>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/3 flex justify-center mt-4 mb-4">
          <Image
            src="/images/3mtt-winners.jpeg"
            alt="Iperu-Remo Technovation Space"
            width={400}
            height={300}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
  );
};

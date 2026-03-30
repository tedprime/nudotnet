import Image from 'next/image';


export const BAC = () => {
  return (
    <>
      {/* hero */}
      <div className="relative isolate h-screen max-h-[1200px] overflow-hidden bg-stone-50">
        <div className="h-full w-full">
          <div className="relative h-full w-full">
            <Image
              src={'/images/_A1A4699.jpg'}
              alt="BAC"
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 top-0 h-full w-full bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
            <div className="absolute inset-0 mx-auto mb-0 mt-auto flex h-fit w-full max-w-[800px] flex-col items-center justify-center rounded-none bg-black/20 py-16 backdrop-blur-md lg:mb-20 lg:rounded-2xl">
              <p className="text-white/50">TedPrime Hub</p>
              <p className="mt-2 text-balance text-center text-xl text-white md:text-2xl">
                NEWS
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="container py-12 w-full flex flex-col justify-center items-center gap-4">
       
        <h3 className='text-3xl font-bold w-[80%] text-center'>TedPrime and Others to Support French Embassy's Bilingual and Competitive Project in 22 Nigerian Tertiary Institutions </h3>

        <p className='w-[90%] text-left flex flex-col justify-center items-center gap-2'>
          <p className='w-full'>
            The French Embassy in Nigeria partnered with TedPrime Ltd and other partners to support its bilingual and competitive project aimed at promoting transversal skills, bilingual learning, diplomacy, technology and entrepreneurship in 22 Nigerian institutions.
          </p>
          <p className='w-full'>
            The initiative is a 2-year Project under the French Embassy Funds (FEF) which provides support to programmes benefitting local institutions, youth and communities.
          </p>
          <p className='w-full'>
            This was revealed by the Ambassador of France to Nigeria, Marc Fonbaustier during the launch of the project held at the French Embassy, Abuja recently.
          </p>
          <p className='w-full'>
            He enthused that over 5000 students in  more than 200 faculties in 22 Nigerian tertiary Institutions are the targeted beneficiaries who will benefit from the major core themes of Bilingual and Competitive Project which are diplomacy, business, technology and agriculture
          </p>
          <p className='w-full'>
            He noted that apart from the 22 Tertiary institutions benefitting form the project, 11 other institutions will be supported with digital infrastructure and resources.
          </p>
          <p className='w-full'>
            The ambassador emphasized the importance of French Language to Nigeria’s national economic and social development especially as a nation surrounded by francophone countries.
          </p>
          <p className='w-full'>
            According to Fonbaustier, “through the French Embassy Funds (FEF), we are supporting institutions that invest in quality education, skills development and international openness. 
          </p>
          <p className='w-full'>
            "This Project recognizes your institutions as key actors in shaping the future of bilingual education in Nigeria,” he said. 
          </p>
          <p className='w-full'>
            Speaking on the fact that Africa’s strength lies in its youth, the ambassador posited that “young people are not fully equipped to save the major challenges of today's globalised world. Sometimes, they are not even informed about the best way to conquer the world,” he added. 
          </p>
          <p className='w-full'>
            He therefore called for more support, participation, collaboration and feedback to make the project a success, stressing the French Embassy's ambition of supporting the three C's which he defined as competence, confidence and creativity. 
          </p>
          <p className='w-full'>
            In her remarks, Head of Pedagogy, Attaché for Cooperation in the French Language and Coordinator for Bilingual And Competitive Project of the Department of Cooperation and Cultural Affairs, Madame Losange Magaly stressed the project's impact.
          </p>
          <p className='w-full'>
            She highlighted the success from the previous project under "À toi le micro, Naija" between 2023- 2025 and Bilingual And Competitive as Projects funded by Fonds Équipe France (FEF) a funding instrument established by the French Ministry of Europe and Foreign Affairs to empower expansion of the richness of the French Culture among foreign nations.
          </p>
          <p className='w-full'>
            In his presentation, the Director of Operations for TedPrime Limited, Mr Olalekan Adeeko shared the programme structure for the selected beneficiary institutions during the two year project spanning across digital infrastructure deployment and skills, technology and AI for bilingual development, and entrepreneurship through Hackathons.
          </p>
          <p className='w-full'>
            He appreciated the huge investment to education and language development in Nigeria through the Bilingual and Competitive Project.
          </p>
          <p className='w-full'>
            One of the Institutions’ beneficiaries and representatives, Prof. Robbin Anjola from Lead City University in her response appreciated the Embassy of France "for considering this strategic investment in developing the teaching and learning of French Language in Nigerian Institutions through digital cultural activities, technology equipment support, digital skills and development for both lecturers and students.”
          </p>
          <p className='w-full'>
            The event  also featured the Ambassador Cocktail Dinner to celebrate the institutions and the International French Teachers’ Day in Nigeria.
          </p>
          <p className='w-full'>
            TedPrime Ltd is a corporate entity that positions itself for disruptive technologies, practices, innovation and human capital development in Nigeria.
          </p>
          
        </p>

      </div>
    </>
  );
};

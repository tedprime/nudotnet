import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { getPartnerLogos } from '@/lib/data/partnerships';

async function Partnerships() {
  const logos = await getPartnerLogos();

  return (
    <div className="mb-5 mt-10">
      <h2 className="mb-5 text-center font-bold text-[#ef6e11]">
        Partnerships and Collaborations
      </h2>
      <Marquee>
        {logos.map((logo) => (
          <Image
            key={logo.id}
            src={logo.imageUrl}
            alt={logo.alt}
            width={300}
            height={200}
            className="ml-8 h-20 w-20 object-contain"
          />
        ))}
      </Marquee>
    </div>
  );
}

export default Partnerships;

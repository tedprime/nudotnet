import Image from 'next/image';
import Marquee from 'react-fast-marquee';

function Partnerships() {
  return (
    <div className="mb-5 mt-10">
      <h2 className="mb-5 text-center font-bold text-[#ef6e11]">
        Partnerships and Collaborations
      </h2>
      <Marquee className="">
        <Image
          src={'/images/hp-business-partner.png'}
          alt="hp business partner"
          width={300}
          height={134}
          className="ml-8 h-20 w-20 object-cover"
        />
        <Image
          src={'/images/microsoft-logo.svg'}
          alt="microsoft logo"
          width={150}
          height={150}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/us-consultate-logo.png'}
          alt="us consultate logo"
          width={186}
          height={200}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/3mtt.jpeg'}
          alt="3mtt logo"
          width={150}
          height={150}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/federal-ministry-communications.png'}
          alt="federal ministry of communications and digital economy"
          width={224}
          height={225}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/botswana-logo.svg'}
          alt="republic of botswana"
          width={240}
          height={185}
          className="ml-8 h-20 w-[100px] object-contain"
        />
        <Image
          src={'/images/sterling-logo.png'}
          alt="sterling bank logo"
          width={1024}
          height={431}
          className="ml-8 h-20 w-[200px] object-contain"
        />
        <Image
          src={'/images/delware-logo.png'}
          alt="delware logo"
          width={3840}
          height={2159}
          className="ml-8 h-20 w-[100px] object-contain"
        />
        <Image
          src={'/images/federal-college-logo.png'}
          alt="federal college of education logo"
          width={500}
          height={500}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/ghana-education-service.png'}
          alt="ghana education service logo"
          width={210}
          height={240}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/ogun-state-logo.png'}
          alt="ogun state nigeria logo"
          width={235}
          height={217}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/kat-logo.png'}
          alt="caka logo"
          width={218}
          height={136}
          className="ml-8 h-20 w-20 object-contain"
        />
        <Image
          src={'/images/nb-logo.png'}
          alt="nigerian breweries logo"
          width={135}
          height={65}
          className="ml-8"
        />
      </Marquee>
    </div>
  );
}

export default Partnerships;

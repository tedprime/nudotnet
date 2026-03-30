import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-gray-800 pb-8 pt-12">
        <div className="container grid gap-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex h-[53px] w-fit items-center justify-center rounded-md bg-white px-2">
              <Link href={'/'}>
                <Image
                  src={'/images/logo.png'}
                  alt="logo"
                  width={100}
                  height={100}
                  className="h-[100px] w-[100px] object-contain"
                />
              </Link>
            </div>
            <p className="mt-4 text-white">
              TEDPRIME HUB BESIDE BGC, IDI-ABA ABEOKUTA 110101 OGUN STATE,
              NIGERIA
            </p>
            <div className="mt-4 flex items-center gap-1 text-sm font-bold text-white">
              <p>Phone:</p>
              <Link href={'tel:+234 708 059 5110'} className="">
                +234 708 059 5110
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm font-bold text-white">
              <p>Email:</p>
              <Link href={'mailto:info@tedprimehub.org'} className="">
                info@tedprimehub.org
              </Link>
            </div>
          </div>
          <div>
            <p className="text-lg font-bold text-white">Our Projects</p>
            <ul className="mt-5 space-y-3 text-white">
              <li>
                <Link href="/projects">KEKE</Link>
              </li>
              <li>
                <Link href={'/projects'}>Kwara AGILE</Link>
              </li>
              <li>
                <Link href={'/projects'}>Microsoft Agro-tech Hackathon</Link>
              </li>
              <li>
                <Link href={'/projects'}>Digital Language Laboratory</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold text-white">Explore</p>
            <ul className="mt-5 space-y-3 text-white">
              <li>
                <Link href={'/'}>Home</Link>
              </li>
              <li>
                <Link href={'/about'}>About Us</Link>
              </li>
              <li>
                <Link href={'/contact'}>Contact</Link>
              </li>
              <li>
                <Link href={'/edubox'}>Edubox</Link>
              </li>
              <li>
                <Link href={'/projects'}>3MTT</Link>
              </li>
              <li>
                <Link href={'/News/BAC'}>BAC NEWS</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-lg font-bold text-white">Our Socials</p>
            <ul className="mt-5 space-y-3 text-white">
              <li>
                <Link href={'https://www.instagram.com/tedprimehub/'} target="_blank" rel="noopener noreferrer">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://www.facebook.com/tedprimeSI/" target="_blank" rel="noopener noreferrer">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href={'https://x.com/tedprimehub'} target="_blank" rel="noopener noreferrer">Twitter</Link>
              </li>
              <li>
                <Link href={'https://www.linkedin.com/company/tedprime-hub/'} target="_blank" rel="noopener noreferrer">
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-t-white/50 pt-8 text-center text-sm text-white/70">
          © Copyright TedPrimeHub. All Rights Reserved
        </div>
      </footer>
    </>
  );
};

export default Footer;

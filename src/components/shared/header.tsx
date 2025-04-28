'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showMobileNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showMobileNav]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[999] grid h-24 px-4 transition-all duration-300 ease-in md:px-7 ${scrollY > 50 ? 'bg-gray-700/70 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div className="container flex items-center">
        <div className="flex h-[53px] items-center justify-center rounded-md bg-white px-2">
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
        <nav className="relative z-10 mx-auto hidden max-w-max flex-1 items-center justify-center rounded-full bg-white/10 py-2 backdrop-blur-md transition-all duration-300 ease-in md:block">
          <div className="relative">
            <ul className="group flex flex-1 list-none items-center justify-center space-x-3 px-2 text-white">
              <li>
                <Link
                  href={'/'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${pathname === '/' ? 'bg-accent/50' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={'/about'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${pathname === '/about' ? 'bg-accent/50' : ''}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={'/projects'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none ${pathname === '/projects' ? 'bg-accent/50' : ''}`}
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href={'/contact'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${pathname === '/contact' ? 'bg-accent/50' : ''}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="absolute left-0 top-full flex justify-center"></div>
        </nav>
        <nav className="ml-auto md:hidden">
          <div onClick={() => setShowMobileNav(!showMobileNav)}>
            <GiHamburgerMenu color="white" size={28} />
          </div>
          <div
            className={`absolute ${showMobileNav ? 'right-0' : '-right-[100%]'} top-0 z-[999] flex h-screen w-full flex-col bg-gray-800 transition-all duration-300 ease-in`}
          >
            <div
              onClick={() => setShowMobileNav(false)}
              className="ml-auto mr-5 mt-5"
            >
              <IoMdClose color="white" size={28} />
            </div>
            <ul className="mt-8 space-y-8 pl-3">
              <li>
                <Link
                  href={'/'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors ${pathname === '/' ? 'bg-white text-gray-800' : 'bg-transparent text-white'}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={'/about'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors ${pathname === '/about' ? 'bg-white text-gray-800' : 'bg-transparent text-white'}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={'/projects'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors ${pathname === '/projects' ? 'bg-white text-gray-800' : 'bg-transparent text-white'}`}
                >
                  Our Projects
                </Link>
              </li>
              <li>
                <Link
                  href={'/contact'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors ${pathname === '/contact' ? 'bg-white text-gray-800' : 'bg-transparent text-white'}`}
                  >
                
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </nav>
  );
};

export default Header;

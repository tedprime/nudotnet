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

  useEffect(() => {
    setShowMobileNav(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[999] grid h-24 px-4 transition-all duration-300 ease-in md:px-7 ${scrollY > 50 ? 'bg-gray-700/70 backdrop-blur-md' : 'bg-transparent'}`}
    >
      <div className="container relative flex items-center justify-between">
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
        <nav className="absolute left-1/2 top-1/2 z-10 hidden max-w-max -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 py-2 backdrop-blur-md transition-all duration-300 ease-in md:block">
          <div className="relative">
            <ul className="group flex flex-1 list-none items-center justify-center space-x-1 px-2 text-white lg:space-x-3">
              <li>
                <Link
                  href={'/'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-3 py-2 text-sm font-bold transition-colors hover:text-[#ef6e11] focus:outline-none lg:px-4 ${pathname === '/' ? 'bg-white/70 text-black' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={'/solutions'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-3 py-2 text-sm font-bold transition-colors hover:text-[#ef6e11] focus:outline-none lg:px-4 ${pathname === '/solutions' ? 'bg-white/70 text-black' : ''}`}
                >
                  Solutions
                </Link>
              </li>
              <li>
                <Link
                  href={'/about'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-3 py-2 text-sm font-bold transition-colors hover:text-[#ef6e11] focus:outline-none lg:px-4 ${pathname === '/about' ? 'bg-white/70 text-black' : ''}`}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href={'/projects'}
                  className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-3 py-2 text-sm font-bold transition-colors hover:text-[#ef6e11] focus:outline-none lg:px-4 ${pathname === '/projects' ? 'bg-white/70 text-black' : ''}`}
                >
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          <div className="absolute left-0 top-full flex justify-center"></div>
        </nav>
        <div className="ml-auto flex shrink-0 items-center">
          <Link
            href={'/contact'}
            className="hidden shrink-0 rounded-full bg-[#ef6e11] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#ef6e11]/90 md:inline-flex md:items-center md:justify-center"
          >
            Contact
          </Link>
          <nav className="relative md:hidden">
            <button
              type="button"
              onClick={() => setShowMobileNav(!showMobileNav)}
              className="flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <GiHamburgerMenu color="white" size={28} />
            </button>

            {showMobileNav && (
              <div
                className="fixed inset-0 z-[998] bg-black/40"
                onClick={() => setShowMobileNav(false)}
                aria-hidden="true"
              />
            )}

            <div
              className={`fixed right-0 top-0 z-[999] flex h-screen w-[80%] max-w-sm flex-col bg-gray-800 transition-transform duration-300 ease-in ${showMobileNav ? 'translate-x-0' : 'translate-x-full'}`}
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
                    href={'/solutions'}
                    className={`group inline-flex h-10 w-max items-center justify-center !rounded-full px-4 py-2 text-sm font-bold transition-colors ${pathname === '/solutions' ? 'bg-white text-gray-800' : 'bg-transparent text-white'}`}
                  >
                    Solutions
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
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href={'/contact'}
                    className="group inline-flex h-10 w-max items-center justify-center !rounded-full bg-[#ef6e11] px-6 py-2 text-sm font-bold text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;

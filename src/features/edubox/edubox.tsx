import Image from 'next/image';
import Link from 'next/link';

export const EduBox = () => {
  return (
    <>
      {/* hero */}
      <div className="relative isolate h-screen max-h-[1200px] overflow-hidden bg-stone-50">
        <div className="h-full w-full">
          <div className="relative h-full w-full">
            <Image
              src={'/images/edubox.jpg'}
              alt="edubox"
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-top"
            />
            <div className="absolute inset-0 top-0 h-full w-full bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
            <div className="absolute inset-0 mx-auto mb-0 mt-auto flex h-fit w-full max-w-[800px] flex-col items-center justify-center rounded-none bg-black/20 py-16 backdrop-blur-md lg:mb-20 lg:rounded-2xl">
              <p className="text-white/50">TedPrime Hub</p>
              <p className="mt-2 text-balance text-center text-xl text-white md:text-2xl">
                EduBox Device Technology
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="container py-12">
        <div className="mx-auto w-full md:w-[80%]">
          <h3 className="text-balance text-center text-xl font-semibold text-black md:text-2xl">
            We are a global IT Hub promoting STEM, Entrepreneurship, Digital
            Skills and Connectivity around Digital Education across Nigeria
          </h3>
          <p className="mt-4 text-center text-lg">
            We are working to propel Nigeria into becoming one of the active key
            players of the United Nations Sustainable Development Goals in
            Education to create a safer planet by 2030 and beyond
          </p>
        </div>
        <div className="mx-auto my-4 w-full md:w-fit">
          <Image
            src={'/images/edubox.jpg'}
            alt="edubox"
            width={1000}
            height={1000}
            className="h-[200px] md:h-[300px] w-full md:w-[500px] object-cover object-top"
          />
        </div>
        <div className="mx-auto mt-8 w-full md:w-[80%]">
          <h3 className="text-balance text-center text-lg font-semibold text-black md:text-xl">
            Device Specifications:
          </h3>
          <p className="mt-4 text-center text-base">
            EduBox Device Technology 3.0 (Enhanced Version) Wireless Hotspot
            Educational Resource Device, Up to 100 Device Wireless connection,
            128GB K6-K12 Preloaded Educational Resources e.g. e-books, PHET
            Simulations, Khan Academy, CK 12, World Map, W3 Schools, DigiClass
            E-Learning Resources e.t.c. Broadcom BCM2711, Quad core Cortex-A72
            (ARM v8) 64-bit SoC @ 1.5GHz, 2GB LPDDR4-3200 SDRAM, 2.4GHz and 5.0
            GHz IEEE 802.11ac wireless, Bluetooth 5.0, BLE, Micro-SD card, 5V DC
            via USB-C connector.
          </p>
          <h3 className="mt-4 text-balance text-center text-lg font-semibold text-black md:text-xl">
            To Connect:
          </h3>
          <ul className="mt-4 space-y-3 text-center">
            <li className="list-inside list-disc">Connect to EduBox WiFi</li>
            <li className="list-inside list-disc">Open a browser</li>
            <li className="list-inside list-disc">
              Type 10.10.10.10 in the URL
            </li>
            <li className="list-inside list-disc">
              Browse through all available resources
            </li>
          </ul>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href={
              'https://forms.office.com/pages/responsepage.aspx?id=BS-NO_10zkuBA8bV9V6sCGvn84mGALhAjV34XBKYTxVURUw4RzZROTdWNDU4M0pFUTFSVDBENDM4TS4u&route=shorturl'
            }
            target="_blank"
            className="mt-8 rounded-xl bg-[#ef6e11] px-8 py-2 text-center text-white font-semibold"
          >
            Make a Request
          </Link>
        </div>
      </div>
    </>
  );
};

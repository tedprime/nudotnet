'use client';
import { PageHeroSection } from '@/components/shared/page-hero';

type ContactHero = { image: string; eyebrow: string; body: string } | null;

export const Contact = ({ hero }: { hero: ContactHero }) => {
  return (
    <>
      {hero && (
        <PageHeroSection image={hero.image} eyebrow={hero.eyebrow} body={hero.body} alt="contact" />
      )}
      {/* form */}
      <form onSubmit={(e) => e.preventDefault()} className="py-14">
        <h3 className="text-balance text-center text-lg font-semibold text-black md:text-xl">
          Send a message!
        </h3>
        <p className="mt-4 text-center text-base">
          We&apos;d love to hear from you. Please fill out this form.
        </p>
        <div className="mx-auto mt-8 w-[95%] lg:w-1/3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="first-name" className="text-sm font-medium">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                className="mt-2 w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm outline-none"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="first-name" className="text-sm font-medium">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                className="mt-2 w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm outline-none"
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="text"
              className="mt-2 w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm outline-none"
              placeholder="example@gmail.com"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="phone-number" className="text-sm font-medium">
              Phone Number
            </label>
            <input
              id="phone-number"
              type="tel"
              className="mt-2 w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm outline-none"
              placeholder="e.g +234"
            />
          </div>
          <div className="mt-3">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="mesage"
              rows={5}
              className="mt-2 w-full resize-none rounded-md border border-input bg-transparent px-3 py-3 text-sm outline-none"
              placeholder="Leave us a message here..."
            />
          </div>
          <button
            type="submit"
            className="mt-8 w-full rounded-lg bg-[#ef6e11] py-2 text-center text-white"
          >
            Send Message
          </button>
        </div>
      </form>
    </>
  );
};

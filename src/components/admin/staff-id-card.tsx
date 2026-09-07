import Image from 'next/image';

type Props = {
  fullName: string;
  title: string;
  staffId: string;
  photoUrl: string | null;
};

// Matches the reference design in public/images/id-card.png: black card,
// logo top-left, a large rounded photo panel fading to black at its own
// bottom edge, then the name (given name(s) + UPPERCASE surname, in the
// brand orange), role, and staff ID underneath.
export const StaffIdCard = ({ fullName, title, staffId, photoUrl }: Props) => {
  const nameParts = fullName.trim().split(/\s+/);
  const surname = nameParts.length > 1 ? nameParts.pop() : undefined;
  const givenNames = nameParts.join(' ');

  return (
    <div
      id="staff-id-card"
      className="mx-auto w-full max-w-sm overflow-hidden rounded-[28px] bg-black p-6 print:rounded-none print:p-6"
    >
      <Image
        src="/images/logo.png"
        alt="TedPrime"
        width={160}
        height={64}
        className="h-8 w-auto object-contain"
      />

      <div className="relative mt-6 aspect-[4/5] w-full overflow-hidden rounded-[24px] bg-gradient-to-b from-[#ef6e11]/60 to-black">
        {photoUrl && (
          <Image src={photoUrl} alt={fullName} fill className="object-cover" unoptimized />
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className="mt-6">
        <h2 className="text-3xl font-extrabold leading-tight text-[#ef6e11]">
          {givenNames}
          {surname && <> {surname.toUpperCase()}</>}
        </h2>
        <p className="mt-2 text-lg font-semibold text-white">{title}</p>
        <p className="mt-1 text-base text-white/70">{staffId}</p>
      </div>
    </div>
  );
};

'use client'

import Link from "next/link";
import { useState } from "react";
import { CompetencyTest } from "./agile/competency-test";
import { FlagOffCarousel } from "./agile/flagoff-carousel";
import { TrainingSessions } from "./agile/training-sessions";
import { ThreeMTT } from "./threeMTT";
import { DigitalCenters } from "./digitalCenters";

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState("AGILE");

  const renderContent = () => {
    switch (activeTab) {
      case "AGILE":
        return (
          <>
            <CompetencyTest />
            <FlagOffCarousel />
            <TrainingSessions />
          </>
        );
      case "3MTT":
        return <ThreeMTT />;
      case "Digital Centers":
        return <DigitalCenters />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="sticky top-24 z-50 h-20 w-full bg-[rgba(250,250,250)]">
        <div className="container flex h-full items-center justify-center gap-8 border">
          <Link
            href={"#"}
            onClick={() => setActiveTab("AGILE")}
            className={`rounded-full border border-[#ef6e11] bg-transparent px-6 py-3 text-center text-sm lg:text-left lg:text-base ${activeTab === "AGILE" ? "text-[#ef6e11]" : "text-gray-500"}`}
          >
            AGILE
          </Link>
          <Link
            href={"#"}
            onClick={() => setActiveTab("3MTT")}
            className={`px-6 py-3 text-center text-sm lg:text-left lg:text-base ${activeTab === "3MTT" ? "text-[#ef6e11] border border-[#ef6e11] rounded-full" : "text-gray-500"}`}
          >
            3MTT
          </Link>
          <Link
            href={"#"}
            onClick={() => setActiveTab("Digital Centers")}
            className={`px-6 py-3 text-center text-sm lg:text-left lg:text-base ${activeTab === "Digital Centers" ? "text-[#ef6e11] border border-[#ef6e11] rounded-full" : "text-gray-500"}`}
          >
            Digital Centers
          </Link>
        </div>
      </div>
      <div className="tab-content">
        {renderContent()}
      </div>
    </>
  );
};

// import Link from "next/link";

// export const Tabs = () => {
//   return (
//     <>
//       <div className="sticky top-24 z-50 h-20 w-full bg-[rgba(250,250,250)]">
//         <div className="container flex h-full items-center justify-center gap-8 border">
//           <Link
//             href={''}
//             className={`rounded-full border border-[#ef6e11] bg-transparent px-6 py-3 text-center text-sm text-[#ef6e11] lg:text-left lg:text-base`}
//           >
//             AGILE
//           </Link>
//           <Link
//             href={''}
//             className={`px-6 py-3 text-center text-sm lg:text-left lg:text-base`}
//           >
//             3MTT
//           </Link>
//           <Link
//             href={''}
//             className={`px-6 py-3 text-center text-sm lg:text-left lg:text-base`}
//           >
//             Digital Centers
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

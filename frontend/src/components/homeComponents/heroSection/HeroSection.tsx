"use client";
import React from "react";
import { IoSparklesSharp } from "react-icons/io5";

const HeroSection = () => {
  return (
    <section className="py-12 text-center bg-white">
      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-4 py-1 text-[12px]  font-medium text-[#252B37] ">
          <span><IoSparklesSharp/></span> Join with the community
        </button>
      </div>

      {/* Heading */}
      <h1 className="mt-6 text-4xl font-bold text-black sm:text-5xl md:text-[66px] leading-tight">
        Manage Your Event.
        <br />
        From Start
        {/* <div className="inline-block w-[80px] h-[80px] mx-1 bg-yellow-200 rounded-lg">
          <FaRegLightbulb size={30} className="inline text-yellow-600" />
        </div> */}
        
        To End
        <span className="inline-block px-2 py-1 mx-1 bg- rounded-lg">

{/* <Image
  src="/icons/horn.png"
  alt="Promotion Icon"
  width={100}
  height={100}
  className=""
/> */}

        </span>
      </h1>

      {/* Paragraph */}
      <p className="max-w-2xl mx-auto   font-bold mt-6 text-xl text-[#666C79]">
        Easily plan, manage, and publish events — all in one platform. Whether
        you&apos;re hosting a public gathering or a private experience, everything
        from registration to payments and participant management.
      </p>

      {/* Buttons */}
      <div className="flex justify-center mt-8 space-x-4">
        <button className="px-[24px] py-[6px]  text-sm font-medium text-black bg-[#0000000D] rounded-lg">
          Button
        </button>
        <button className="px-[24px] py-[6px]  text-sm font-medium bg-black text-white rounded-lg">
          Button
        </button>
     
      </div>
    </section>
  );
};

export default HeroSection;

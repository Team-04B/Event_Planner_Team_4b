"use client";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineBell, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Event", href: "/event" },
  { name: "About", href: "#" },
  { name: "Contact", href: "#" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative bg-white shadow">
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="flex items-center justify-between">
            <a href="#">
              <h3 className="text-[14px] font-medium text-black">EvenTora</h3>
            </a>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                aria-label="Toggle menu"
              >
                {!isOpen ? (
                  <HiOutlineMenu  size={24} />
                ) : (
                  <HiOutlineX size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Menu */}
          <div
            className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
              {navLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="px-3 py-2  mt-2 text-[14px] text-gray-700 transition-colors duration-300 transform rounded-md "
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center mt-4 lg:mt-0">
              <button
                className="hidden mx-4 text-gray-600 transition-colors duration-300 transform lg:block hover:text-gray-700 focus:text-gray-700 focus:outline-none"
                aria-label="Show notifications"
              >
                <HiOutlineBell size={24} />
              </button>

              <button
                type="button"
                className="flex items-center focus:outline-none"
                aria-label="Toggle profile dropdown"
              >
                <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  <Image
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=334&q=80"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>

                <h3 className="mx-2 text-gray-700 lg:hidden">Khatab wedaa</h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

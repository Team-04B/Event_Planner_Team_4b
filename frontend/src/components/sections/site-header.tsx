"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-gray-200 bg-white/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/" className="flex items-center">
            <span className={cn("text-xl font-bold transition-colors", scrolled ? "text-purple-600" : "text-white")}>
              EventPlanner
            </span>
          </Link>
        </motion.div>

        <nav className="hidden md:flex md:items-center md:space-x-6">
          {["Home", "Events", "How It Works", "Pricing"].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-purple-600",
                  scrolled ? "text-gray-600" : "text-white",
                )}
              >
                {item}
              </Link>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="hidden md:flex md:items-center md:space-x-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Button
            variant="ghost"
            className={cn(
              "transition-colors",
              scrolled ? "text-gray-600 hover:text-purple-600" : "text-white hover:bg-white/10 hover:text-white",
            )}
          >
            Log In
          </Button>
          <Button
            className={cn(
              "transition-colors",
              scrolled ? "bg-purple-600 text-white hover:bg-purple-700" : "bg-white text-purple-600 hover:bg-gray-100",
            )}
          >
            Sign Up
          </Button>
        </motion.div>

        <motion.button
          className="flex items-center md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {isMenuOpen ? (
            <X className={scrolled ? "h-6 w-6 text-gray-900" : "h-6 w-6 text-white"} />
          ) : (
            <Menu className={scrolled ? "h-6 w-6 text-gray-900" : "h-6 w-6 text-white"} />
          )}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="absolute left-0 right-0 z-20 bg-white px-4 py-6 shadow-lg md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col space-y-4">
              {["Home", "Events", "How It Works", "Pricing"].map((item) => (
                <Link
                  key={item}
                  href={item === "Home" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-sm font-medium text-gray-700 hover:text-purple-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
                  Log In
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Sign Up</Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

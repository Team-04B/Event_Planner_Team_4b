"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function SectionNavigation() {
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3
      const sections = document.querySelectorAll("section[data-section]")

      sections.forEach((section, index) => {
        const element = section as HTMLElement
        const offsetTop = element.offsetTop
        const height = element.offsetHeight

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll("section[data-section]")
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 transform md:block">
      <div className="flex flex-col items-center space-y-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={cn(
              "h-3 w-3 rounded-full transition-all duration-300",
              activeSection === index ? "bg-black scale-125" : "bg-gray-300 hover:bg-gray-400",
            )}
            aria-label={`Navigate to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

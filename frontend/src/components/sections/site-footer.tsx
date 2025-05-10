"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Blog", href: "/blog" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "FAQs", href: "/faqs" },
        { name: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Partners", href: "/partners" },
        { name: "Legal", href: "/legal" },
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <Link href="/" className="mb-4 inline-block">
              <span className="text-xl font-bold text-purple-600">EventPlanner</span>
            </Link>
            <p className="mb-4 max-w-md text-gray-600">
              Creating meaningful connections through exceptional events. Our platform makes it easy to create,
              discover, and participate in events that matter to you.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Twitter className="h-5 w-5" />, name: "Twitter" },
                { icon: <Facebook className="h-5 w-5" />, name: "Facebook" },
                { icon: <Instagram className="h-5 w-5" />, name: "Instagram" },
                { icon: <Linkedin className="h-5 w-5" />, name: "LinkedIn" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-purple-100 hover:text-purple-600"
                  aria-label={social.name}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </motion.div>

          {footerLinks.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h3 className="mb-4 text-lg font-semibold text-gray-900">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-600 hover:text-purple-600">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-12 border-t border-gray-200 pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="mb-4 text-sm text-gray-600 md:mb-0">
              © {new Date().getFullYear()} EventPlanner. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/terms" className="text-sm text-gray-600 hover:text-purple-600">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-purple-600">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-sm text-gray-600 hover:text-purple-600">
                Cookie Policy
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

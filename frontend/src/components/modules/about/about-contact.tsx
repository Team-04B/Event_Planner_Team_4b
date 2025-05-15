import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function AboutContact() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-8 shadow-lg md:p-12">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold tracking-tight">Get in Touch</h2>
              <p className="mb-8 text-lg text-gray-600">
                Have questions or feedback? We&apos;d love to hear from you. Our team is always ready to assist.
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">hello@eventplanner.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="mt-1 text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Location</h3>
                    <p className="mt-1 text-gray-600">
                      123 Event Street, Suite 100
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Follow Us</h3>
                <div className="flex space-x-4">
                  {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((platform, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 shadow-sm transition-colors hover:bg-gray-200"
                    >
                      <span className="sr-only">{platform}</span>
                      {/* Placeholder for social icons */}
                      <div className="h-5 w-5 rounded-full bg-gray-500"></div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl">
              <div className="relative aspect-[4/3] h-full w-full">
                <Image
                  src="/images/born.jpg?height=600&width=800"
                  alt="Our office"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <p className="text-lg font-medium text-white">Visit our headquarters</p>
                <p className="text-white/80">Monday-Friday, 9am-5pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

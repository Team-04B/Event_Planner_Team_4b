
import Image from "next/image"
import { Heart, Users } from "lucide-react"

export default function AboutTeam() {
  return (
    <section data-section className="relative bg-gray-50 py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute -right-16 -top-16 h-64 w-64 text-gray-100"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M42.7,-73.4C55.9,-67.1,67.7,-57.2,76.3,-44.6C84.9,-32,90.3,-16,89.5,-0.5C88.7,15,81.8,30,72.2,42.4C62.6,54.8,50.3,64.7,36.7,70.5C23.1,76.3,8.2,78.1,-6.9,77.8C-22,77.5,-37.3,75.1,-49.3,67.5C-61.3,59.9,-70,47.1,-76.2,32.8C-82.4,18.5,-86.1,2.7,-83.2,-11.8C-80.3,-26.3,-70.8,-39.5,-59.2,-48.9C-47.6,-58.3,-33.9,-63.9,-20.8,-70.1C-7.7,-76.3,5.8,-83.1,19.2,-82.1C32.6,-81.1,46,-79.6,42.7,-73.4Z"
            transform="translate(100 100)"
          />
        </svg>

        <svg
          className="absolute -bottom-16 -left-16 h-64 w-64 text-gray-100"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M47.7,-79.1C62.3,-71.9,75.1,-60.5,83.2,-46.1C91.3,-31.7,94.7,-14.3,92.9,2.1C91.1,18.5,84.1,33.9,74.3,47.2C64.5,60.5,51.9,71.7,37.2,77.7C22.5,83.7,5.8,84.5,-10.2,81.9C-26.2,79.3,-41.5,73.3,-54.4,63.5C-67.3,53.7,-77.8,40.1,-83.2,24.5C-88.6,8.9,-88.9,-8.7,-83.5,-24.2C-78.1,-39.7,-67,-53.2,-53.4,-61.4C-39.8,-69.6,-23.7,-72.5,-7.4,-71.9C8.9,-71.3,33.1,-67.2,47.7,-79.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            <Users className="mr-2 h-4 w-4" />
            The Visionaries
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Meet the Team Behind <br />
            the Innovation
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            A diverse group of passionate individuals united by a shared vision.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              name: "Alex Morgan",
              role: "Founder & CEO",
              image: "/images/1.png?height=400&width=400",
              quote: "Technology should enhance human connection, not replace it.",
            },
            {
              name: "Jamie Chen",
              role: "Chief Technology Officer",
              image: "/images/2.png?height=400&width=400",
              quote: "We build for people first, technology second.",
            },
            {
              name: "Sam Wilson",
              role: "Head of Design",
              image: "/images/1.png?height=400&width=400",
              quote: "Great design disappears, leaving only great experiences.",
            },
            {
              name: "Taylor Reed",
              role: "Community Director",
              image: "/images/2.png?height=400&width=400",
              quote: "Communities thrive when everyone feels they belong.",
            },
          ].map((member, index) => (
            <div key={index} className="group relative">
              <div className="relative mb-6 overflow-hidden rounded-2xl bg-gray-100">
                <div className="aspect-[3/4]">
                  <div className="relative h-full w-full">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm font-light italic">"{member.quote}"</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Company Culture */}
        <div className="mx-auto mt-32 max-w-6xl rounded-2xl bg-white p-8 shadow-sm md:p-12">
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                <Heart className="mr-2 h-4 w-4" />
                Our Culture
              </div>
              <h3 className="mt-6 text-2xl font-bold md:text-3xl">
                Built on Passion, <br />
                Driven by Purpose
              </h3>
              <div className="mt-6 space-y-4 text-gray-600">
                <p>
                  We&apos;ve cultivated a culture where innovation thrives, diverse perspectives are celebrated, and
                  every team member is empowered to make an impact.
                </p>
                <p>
                  Our shared values guide everything we do—from how we build our platform to how we interact with our
                  community.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["Innovation", "Integrity", "Inclusion", "Impact", "Empathy"].map((value, i) => (
                  <span key={i} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                    {value}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { src: "/images/about1.png?height=300&width=300", alt: "Team collaboration" },
                { src: "/images/about2.png?height=300&width=300", alt: "Office environment" },
                { src: "/images/about3.png?height=300&width=300", alt: "Team meeting" },
                { src: "/images/about4.png?height=300&width=300", alt: "Team celebration" },
              ].map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={img.src || "/images/born.jpg"}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

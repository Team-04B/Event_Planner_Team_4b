import Image from "next/image"
import { ChevronRight, Globe, Heart, MessageSquare, Shield, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AboutPhilosophy() {
  return (
    <section data-section className="relative bg-gradient-to-b from-white to-gray-50 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            <Star className="mr-2 h-4 w-4" />
            Our Philosophy
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Guided by Purpose, <br />
            <span className="text-black">Driven by Excellence</span>
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            We&apos;ve built our platform around core principles that guide every feature, interaction, and experience.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-3">
          {[
            {
              icon: <Globe className="h-8 w-8 text-gray-500" />,
              title: "Inclusive by Design",
              description:
                "We believe events should be accessible to everyone. Our platform removes barriers and creates welcoming spaces for diverse communities.",
              color: "bg-gray-50",
              highlight: "border-l-gray-500",
            },
            {
              icon: <Shield className="h-8 w-8 text-gray-500" />,
              title: "Trust as Foundation",
              description:
                "Every feature is built with security and transparency at its core, creating a trusted environment for all participants.",
              color: "bg-gray-50",
              highlight: "border-l-gray-500",
            },
            {
              icon: <Heart className="h-8 w-8 text-gray-500" />,
              title: "Connection as Purpose",
              description:
                "Technology should bring people together. We design every interaction to strengthen human connections, not replace them.",
              color: "bg-gray-50",
              highlight: "border-l-gray-500",
            },
          ].map((value, index) => (
            <div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md",
                "before:absolute before:bottom-0 before:left-0 before:top-0 before:w-1 before:transition-all before:duration-300",
                value.highlight,
                "hover:before:w-2",
              )}
            >
              <div className={cn("mb-6 flex h-16 w-16 items-center justify-center rounded-xl", value.color)}>
                {value.icon}
              </div>
              <h3 className="mb-4 text-xl font-semibold">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>

        {/* Approach Section */}
        <div className="mx-auto mt-32 max-w-6xl">
          <div className="grid gap-16 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Our Approach
              </div>
              <h3 className="mt-6 text-3xl font-bold tracking-tight">Thoughtfully Crafted Experiences</h3>
              <div className="mt-6 space-y-6 text-lg text-gray-600">
                <p>
                  We believe that exceptional event experiences don&apos;t happen by accident—they&lsquo;re meticulously
                  designed with intention and care.
                </p>
                <p>
                  Our platform is built on a foundation of user-centered design, where every feature, interaction, and
                  workflow is crafted to feel intuitive and effortless.
                </p>
              </div>

              <div className="mt-10 space-y-6">
                {[
                  {
                    title: "User-Centered Design",
                    description: "Every feature is built around real user needs and feedback.",
                  },
                  {
                    title: "Continuous Improvement",
                    description: "We're constantly refining and enhancing the platform based on community insights.",
                  },
                  {
                    title: "Ethical Technology",
                    description: "We build with integrity, prioritizing privacy and transparency.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                      <ChevronRight className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.title}</h4>
                      <p className="mt-1 text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <div className="relative h-full w-full">
                  <Image
                    src="/images/experience.png?height=800&width=800"
                    alt="Our design process"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating stats cards */}
              <div className="absolute -bottom-6 -left-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:max-w-[240px]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">User Satisfaction</p>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                    <ChevronRight className="h-5 w-5 rotate-90" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">98.7%</p>
                <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 w-[98.7%] rounded-full bg-gray-500"></div>
                </div>
              </div>

              <div className="absolute -right-6 top-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg md:max-w-[240px]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">Platform Growth</p>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 text-gray-600">
                    <ChevronRight className="h-5 w-5 -rotate-90" />
                  </div>
                </div>
                <p className="mt-2 text-3xl font-bold text-gray-900">127%</p>
                <p className="mt-1 text-sm text-gray-500">Year over year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

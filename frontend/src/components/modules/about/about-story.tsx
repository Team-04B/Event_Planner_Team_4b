import Image from "next/image"

export default function AboutStory() {
  return (
    <section data-section className="relative py-24 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-[600px] w-[600px] rounded-full border border-gray-100 opacity-50"></div>
        <div className="absolute -left-16 top-16 h-[400px] w-[400px] rounded-full border border-gray-100 opacity-50"></div>
        <div className="absolute -right-32 bottom-0 h-[600px] w-[600px] rounded-full border border-gray-100 opacity-50"></div>
        <div className="absolute -right-16 bottom-16 h-[400px] w-[400px] rounded-full border border-gray-100 opacity-50"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex items-center justify-center">
            <div className="h-px w-12 bg-gray-300"></div>
            <h2 className="mx-4 text-center text-lg font-medium uppercase tracking-widest text-gray-600">
              Our Journey
            </h2>
            <div className="h-px w-12 bg-gray-300"></div>
          </div>

          <div className="grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="relative h-full overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 to-gray-500/10"></div>
                <div className="relative aspect-[3/4] h-full w-full">
                  <Image
                    src="/images/born.jpg?height=800&width=600"
                    alt="Our journey visualization"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-1 rounded-full bg-white"></div>
                    <div className="h-1 w-1 rounded-full bg-white"></div>
                    <div className="h-1 w-1 rounded-full bg-white"></div>
                    <div className="h-1 w-12 rounded-full bg-white"></div>
                  </div>
                  <p className="mt-4 text-sm font-medium uppercase tracking-wider text-white">Est. 2023</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center md:col-span-7">
              <h3 className="mb-6 text-4xl font-bold tracking-tight">A Vision Born from Necessity</h3>

              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  <span className="font-semibold text-gray-900">In a world of disconnected event solutions,</span> we
                  envisioned a platform that would seamlessly unite creators and participants under one intuitive
                  ecosystem.
                </p>

                <p>
                  Our journey began when a team of event enthusiasts—frustrated by fragmented tools and opaque
                  processes—decided to build the platform they wished existed. What started as a solution to our own
                  challenges quickly evolved into a mission to transform the entire event landscape.
                </p>

                <p>
                  Today, we&apos;re proud to offer a comprehensive platform that handles everything from event creation
                  and discovery to participation management and payment processing—all while maintaining the human
                  connection that makes events special.
                </p>

                <div className="pt-4">
                  <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
                    <span className="mr-2">Our core belief:</span>
                    <span className="font-semibold">Technology should enhance human connection, not replace it.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

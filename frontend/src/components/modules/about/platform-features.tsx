import { Calendar, Clock, Globe, MessageSquare, Shield, Users } from "lucide-react"

export default function PlatformFeatures() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            <Calendar className="mr-2 h-4 w-4" />
            Platform Capabilities
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight md:text-4xl">
            Engineered for Exceptional <br />
            Event Experiences
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            Our comprehensive suite of features empowers event creators and attendees alike.
          </p>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Calendar className="h-6 w-6 text-gray-500" />,
              title: "Flexible Event Creation",
              description: "Create public or private events with customizable registration options and fee structures.",
              features: ["Public & private events", "Custom registration forms", "Flexible pricing options"],
            },
            {
              icon: <Users className="h-6 w-6 text-gray-500" />,
              title: "Intelligent Participation",
              description: "Our smart system manages approvals, payments, and communications in one seamless flow.",
              features: ["Automated approvals", "Integrated payments", "Participant management"],
            },
            {
              icon: <Clock className="h-6 w-6 text-gray-500" />,
              title: "Real-time Management",
              description: "Monitor registrations, approve requests, and communicate with participants instantly.",
              features: ["Live dashboard", "Instant notifications", "Participant messaging"],
            },
            {
              icon: <Shield className="h-6 w-6 text-gray-500" />,
              title: "Secure Transactions",
              description: "Enterprise-grade security ensures safe and transparent financial transactions.",
              features: ["PCI compliance", "Fraud protection", "Transparent fees"],
            },
            {
              icon: <Globe className="h-6 w-6 text-gray-500" />,
              title: "Discovery Engine",
              description:
                "Intelligent algorithms connect users with events that match their interests and preferences.",
              features: ["Personalized recommendations", "Advanced search", "Interest matching"],
            },
            {
              icon: <MessageSquare className="h-6 w-6 text-gray-500" />,
              title: "Community Building",
              description: "Foster connections before, during, and after events with integrated communication tools.",
              features: ["Event discussions", "Attendee networking", "Post-event engagement"],
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute -right-3 -top-3 h-24 w-24 rounded-br-[100px] bg-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              <div className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-50">
                {feature.icon}
              </div>

              <div className="relative">
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="mb-6 text-gray-600">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500">
                      <div className="mr-2 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

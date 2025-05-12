
import CtaSection from "@/components/sections/cta-section";
import EventTypesSection from "@/components/sections/event-types-section";
import FaqSection from "@/components/sections/faq-section";
import FeaturedEventsSection, { Event } from "@/components/sections/featured-events-section";
import HeroSection from "@/components/sections/hero-section";
import HowItWorksSection from "@/components/sections/how-it-works-section";
import NewsletterSection from "@/components/sections/newsletter-section";
import StatsSection from "@/components/sections/stats-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

const HomePage = ({events}:{events:Event[]}) => {
console.log(events)
    return (
      <div className="flex min-h-screen w-full flex-col bg-white">


      <main>
        <Suspense fallback={<Loader2 />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <FeaturedEventsSection events={events} />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <EventTypesSection />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <HowItWorksSection />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <TestimonialsSection />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <StatsSection />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <FaqSection />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <NewsletterSection />
        </Suspense>

        <Suspense fallback={<Loader2 />}>
          <CtaSection />
        </Suspense>
      </main>

    </div>
    );
};

export default HomePage;
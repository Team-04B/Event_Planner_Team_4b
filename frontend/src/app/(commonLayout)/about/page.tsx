import AboutContact from "@/components/modules/about/about-contact";
import AboutCTA from "@/components/modules/about/about-cta";
import AboutHero from "@/components/modules/about/about-hero";
import AboutPhilosophy from "@/components/modules/about/about-philosophy";
import AboutStory from "@/components/modules/about/about-story";
import AboutTeam from "@/components/modules/about/about-team";
import PlatformFeatures from "@/components/modules/about/platform-features";
import SectionNavigation from "@/components/modules/about/section-navigation";


export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Fixed navigation dots - client component */}
      <SectionNavigation />

      {/* Hero Section */}
      <AboutHero />

      {/* Our Story Section */}
      <AboutStory />

      {/* Philosophy & Approach */}
      <AboutPhilosophy />

      {/* Platform Features */}
      <PlatformFeatures />

      {/* Team Section */}
      <AboutTeam />

      {/* CTA Section */}
      <AboutCTA />

      {/* Contact Section */}
      <AboutContact />
    </div>
  )
}

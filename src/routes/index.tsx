import { createFileRoute } from "@tanstack/react-router"

import {
  FaqSection,
  GlimpseSection,
  HeroSection,
  SiteFooter,
  SiteNav,
  WaitlistSection,
  WhySection,
} from "@/features/landing"

export const Route = createFileRoute("/")({ component: LandingPage })

function LandingPage() {
  return (
    <div className="min-h-svh bg-background">
      <SiteNav />
      <main>
        <HeroSection />
        <WhySection />
        <GlimpseSection />
        <WaitlistSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </div>
  )
}

import PageWrapper from '@/components/layout/PageWrapper'
import Nav from '@/components/sections/Nav'
import Hero from '@/components/sections/Hero'
import Marquee from '@/components/ui/Marquee'
import ProblemSection from '@/components/sections/ProblemSection'
import BookingCounterSection from '@/components/sections/BookingCounterSection'
import FixSection from '@/components/sections/FixSection'
import ServicesSection from '@/components/sections/ServicesSection'
import HowItWorks from '@/components/sections/HowItWorks'
import AboutSection from '@/components/sections/AboutSection'
import Testimonials from '@/components/sections/Testimonials'
import ROICalculator from '@/components/sections/ROICalculator'
import CTASection from '@/components/sections/CTASection'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <PageWrapper>
      <Nav />
      <Hero />
      <ProblemSection />
      <FixSection />
      <BookingCounterSection />
      <Marquee />
      <ServicesSection />
      <HowItWorks />
      <AboutSection />
      <Testimonials />
      <ROICalculator />
      <CTASection />
      <Footer />
    </PageWrapper>
  )
}

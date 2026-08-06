import HeroSection from '@/components/HeroSection'
import ProfileDetailSection from '@/components/ProfileDetailSection'
import ServicesSection from '@/components/ServicesSection'
import AboutSection from '@/components/AboutSection'
import ComparisonSection from '@/components/ComparisonSection'
import PortfolioSection from '@/components/PortfolioSection'
import BlogSection from '@/components/BlogSection'
import ContactSection from '@/components/ContactSection'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Profile Detail Section — target del CTA del hero */}
      <ProfileDetailSection />

      {/* Services Section */}
      <ServicesSection />

      {/* About Section */}
      <AboutSection />

    

      {/* Portfolio Section */}
      <PortfolioSection />

        {/* Comparison Section */}
        <ComparisonSection />

      {/* Blog Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />
    </main>
  )
}

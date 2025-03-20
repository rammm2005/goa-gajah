"use client"

import { useEffect } from "react"
import { Header as LayoutHeader } from "@/components/layout/header"
import { Footer as LayoutFooter } from "@/components/layout/footer"
import { HeroSection as SectionHero } from "@/components/sections/hero-section"
import { AboutSection as SectionAbout } from "@/components/sections/about-section"
import { GallerySection as SectionGallery } from "@/components/sections/gallery-section"
import { VisitorInfoSection as SectionVisitorInfo } from "@/components/sections/visitor-info-section"
import { MapSection as SectionMap } from "@/components/sections/map-section"
import { TestimonialsSection as SectionTestimonials } from "@/components/sections/testimonials-section"
import AOS from "aos"

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    })
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <LayoutHeader />
      <main className="flex-1 px-4">
        <SectionHero />
        <SectionAbout />
        <SectionGallery />
        <SectionVisitorInfo />
        <SectionMap />
        <SectionTestimonials />
      </main>
      <LayoutFooter />
    </div>
  )
}




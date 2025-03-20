"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export function TestimonialsSection() {
    const t = useTranslations("testimonialsSection")

    const title = t("title", { defaultValue: "Testimoni" })
    const subtitle = t("subtitle", { defaultValue: "Apa kata mereka" })

    // Ambil array testimonial menggunakan t.raw()
    const rawTestimonials = t.raw("testimonials") as Testimonial[] | undefined
    const testimonials = Array.isArray(rawTestimonials) ? rawTestimonials : []

    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <section
            id="testimonials"
            className="py-20 md:py-28 bg-[url('/placeholder.svg?height=600&width=1200&text=Pattern')] bg-fixed bg-cover relative"
        >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
            <div className="container relative z-10">
                <SectionHeading
                    title={title}
                    subtitle={subtitle}
                    centered
                    data-aos="fade-up"
                />

                <div className="mt-16">
                    {/* Desktop View */}
                    <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((testimonial, i) => (
                            <TestimonialCard key={i} testimonial={testimonial} data-aos="fade-up" data-aos-delay={i * 100} />
                        ))}
                    </div>

                    {/* Mobile View - Carousel */}
                    <div className="md:hidden">
                        <div className="relative px-4">
                            <div className="overflow-hidden">
                                <div
                                    className="flex transition-transform duration-300 ease-in-out"
                                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                                >
                                    {testimonials.map((testimonial, i) => (
                                        <div key={i} className="w-full flex-shrink-0 px-4">
                                            <TestimonialCard testimonial={testimonial} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center mt-6 gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        className={cn(
                                            "w-2 h-2 rounded-full transition-all",
                                            activeIndex === i ? "bg-primary w-6" : "bg-muted",
                                        )}
                                        onClick={() => setActiveIndex(i)}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

interface Testimonial {
    name: string
    location: string
    rating: number
    comment: string
}

interface TestimonialCardProps {
    testimonial: Testimonial
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="text-xl font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
            </div>
            <div className="mt-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                        key={i}
                        className={cn("h-4 w-4", i < testimonial.rating ? "fill-primary text-primary" : "text-muted")}
                    />
                ))}
            </div>
            <p className="mt-4 text-muted-foreground italic">{testimonial.comment}</p>
        </div>
    )
}

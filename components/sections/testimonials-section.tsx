"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Aos from "aos"

export function TestimonialsSection() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        Aos.init({ duration: 1000 });
        fetch("/api/get-testimonials")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch testimonials");
                }
                return res.json();
            })
            .then((data) => {
                setTestimonials(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <section
            id="testimonials"
            className="py-20 md:py-28 px-5 bg-[url('/placeholder.svg?height=600&width=1200&text=Pattern')] bg-fixed bg-cover relative"
        >
            <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
            <div className="container relative z-10">
                <SectionHeading title="Testimoni" subtitle="What they response 😄" centered data-aos="fade-up" />

                <div className="mt-16">
                    {loading && <p className="text-center text-muted">Loading testimonials...</p>}
                    {error && <p className="text-center text-red-500">{error}</p>}

                    {!loading && !error && testimonials.length === 0 && (
                        <p className="text-center text-muted">No testimonials available.</p>
                    )}

                    {!loading && !error && testimonials.length > 0 && (
                        <>
                            {/* Desktop View */}
                            <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {testimonials.map((testimonial, i) => (
                                    <TestimonialCard
                                        key={i}
                                        testimonial={testimonial}
                                        data-aos="fade-up"
                                        data-aos-delay={i * 100}
                                    />
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
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

interface Testimonial {
    name: string
    country: string
    city: string
    rating: number
    feedback: string
    images?: string[]
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
                    <p className="text-sm text-muted-foreground">{testimonial.city}, {testimonial.country}</p>
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
            <p className="mt-4 text-muted-foreground italic">{testimonial.feedback}</p>
            {testimonial.images && testimonial.images.length > 0 && (
                <div className="mt-4 flex gap-2">
                    {testimonial.images.map((img, i) => (
                        <Image key={i} src={img} alt={`Testimonial ${i + 1}`} width={100} height={100} className="h-16 w-16 rounded-lg object-cover" />
                    ))}
                </div>
            )}
        </div>
    )
}
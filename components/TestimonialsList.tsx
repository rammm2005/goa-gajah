"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import AOS from "aos";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/effect-coverflow";

interface Testimonial {
    name: string;
    rating: number;
    country: string;
    city: string;
    feedback: string;
    image: string;
}

export default function TestimonialsList() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        AOS.init({ duration: 1000 });
        fetch("/api/get-testimonials")
            .then((res) => res.json())
            .then((data) => setTestimonials(data));
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-4">
            {/* Grid untuk Desktop */}
            <div className="hidden md:grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, i) => (
                    <TestimonialCard key={i} testimonial={testimonial} data-aos="fade-up" data-aos-delay={i * 100} />
                ))}
            </div>

            {/* Swiper untuk Mobile */}
            <div className="md:hidden">
                <Swiper
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    modules={[Autoplay, EffectCoverflow]}
                    className="mySwiper"
                >
                    {testimonials.map((testimonial, i) => (
                        <SwiperSlide key={i} className="flex justify-center">
                            <TestimonialCard testimonial={testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
    return (
        <div className=" p-6 shadow-lg rounded-lg text-center transform hover:scale-105 transition duration-300 w-64">
            <Image src={testimonial.image} alt={testimonial.name} width={80} height={80} className="mx-auto rounded-full object-cover" />
            <h3 className="text-lg font-semibold mt-3">{testimonial.name}</h3>
            <p className="text-gray-500 text-sm">{testimonial.city}, {testimonial.country}</p>
            <p className="mt-2 text-yellow-500 text-xl">{"⭐".repeat(testimonial.rating)}</p>
            <p className="mt-3 text-gray-700">{testimonial.feedback}</p>
        </div>
    );
}

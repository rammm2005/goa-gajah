"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

export function GallerySection() {
    const t = useTranslations("gallerySection");
    const images = t.raw("images") as { src: string; alt: string; title: string }[];
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    return (
        <section id="gallery" className="py-20 md:py-28 bg-stone-100 dark:bg-stone-900">
            <div className="container">
                <SectionHeading title={t("title")} subtitle={t("subtitle")} centered data-aos="fade-up" />

                <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer"
                            onClick={() => setSelectedImage(i)}
                            data-aos="fade-up"
                            data-aos-delay={i * 100}
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={800}
                                    height={600}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-4 w-full">
                                    <h3 className="text-white font-medium">{image.title}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center" data-aos="fade-up">
                    <Button variant="outline" className="rounded-full px-6">
                        {t("viewAllButton")}
                    </Button>
                </div>

                {selectedImage !== null && (
                    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                        <div className="relative max-w-5xl w-full">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute -top-12 right-0 text-white hover:bg-white/10 z-10"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X className="h-6 w-6" />
                                <span className="sr-only">{t("close")}</span>
                            </Button>
                            <div className="relative">
                                <Image
                                    src={images[selectedImage].src}
                                    alt={images[selectedImage].alt}
                                    width={1200}
                                    height={900}
                                    className="w-full h-auto rounded-lg"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 rounded-b-lg">
                                    <h3 className="text-white text-lg font-medium">{images[selectedImage].title}</h3>
                                    <p className="text-white/80 text-sm">{images[selectedImage].alt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

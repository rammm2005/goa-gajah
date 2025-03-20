"use client"

import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { useTranslations } from "next-intl"
import Link from "next/link"

export function MapSection() {
    const t = useTranslations()

    const distances = Object.values(t.raw("mapSection.distances.items")) as { from: string, distance: string }[]
    const nearbyAttractions = Object.values(t.raw("mapSection.nearbyAttractions.items")) as { name: string, description: string }[]

    return (
        <section id="location" className="py-20 md:py-28 bg-stone-100 dark:bg-stone-900">
            <div className="container">
                <SectionHeading
                    title={t("mapSection.title")}
                    subtitle={t("mapSection.subtitle")}
                    centered
                    data-aos="fade-up"
                />

                <div className="mt-16 grid gap-12 md:grid-cols-2 items-center">
                    {/* Peta */}
                    <div
                        className="rounded-lg overflow-hidden h-[400px] relative shadow-lg border border-muted/50"
                        data-aos="fade-right"
                    >
                        <Image
                            src="/placeholder.svg?height=400&width=600&text=Map+of+Goa+Gajah"
                            alt={t("mapSection.title")}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-black/30 transition-colors">
                            <Link href={t("mapSection.link-map")} className="cursor-pointer">
                                < Button className="bg-white/90 hover:bg-white text-primary" >
                                    {t("mapSection.text-map")}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Informasi lokasi */}
                    <div className="space-y-8" data-aos="fade-left">
                        {/* Alamat */}
                        <div>
                            <h3 className="text-2xl font-bold font-serif text-primary">{t("mapSection.address.title")}</h3>
                            <div className="h-1 w-16 bg-primary/30 my-3" />
                            <p className="mt-2 leading-relaxed">{t("mapSection.address.description")}</p>
                        </div>

                        {/* Jarak dari lokasi populer */}
                        <div>
                            <h3 className="text-2xl font-bold font-serif text-primary">{t("mapSection.distances.title")}</h3>
                            <div className="h-1 w-16 bg-primary/30 my-3" />
                            <ul className="mt-2 space-y-3">
                                {distances.map((item, index) => (
                                    <li key={index} className="flex items-center justify-between border-b border-muted pb-2">
                                        <span>{item.from}</span>
                                        <span className="font-medium">{item.distance}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Tempat Wisata Terdekat */}
                        <div>
                            <h3 className="text-2xl font-bold font-serif text-primary">{t("mapSection.nearbyAttractions.title")}</h3>
                            <div className="h-1 w-16 bg-primary/30 my-3" />
                            <ul className="mt-2 space-y-4">
                                {nearbyAttractions.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="rounded-full bg-primary/10 p-1 mt-1">
                                            <ChevronRight className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <span className="font-medium">{item.name}</span>
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </section >
    )
}

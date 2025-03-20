"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const heroImages = [
    "/image/goa-gajah.jpg?height=1080&width=1920&text=Goa+Gajah+Entrance",
    "/image/goa-gajah.jpg?height=1080&width=1920&text=Ancient+Bathing+Pools",
    "/image/pancuran-goa-gajah.jpg?height=1080&width=1920&text=Temple+Courtyard",
];

export function HeroSection() {
    const t = useTranslations("heroSection");
    const infoCards = t.raw("infoCards");

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative">
            <div className="relative h-[85vh] px-4 overflow-hidden">
                {heroImages.map((src, index) => (
                    <div
                        key={src}
                        className="absolute inset-0 transition-opacity duration-1000"
                        style={{ opacity: currentImage === index ? 1 : 0 }}
                    >
                        <Image
                            src={src || "/placeholder.svg"}
                            alt={`photo ${index}`}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                    </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />

                <div className="container relative z-10 flex h-full flex-col items-start justify-center gap-4 text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl font-serif">
                            {t("title")} {" "}
                            <span className="text-primary-foreground">
                                {t("subtitle")}
                            </span>
                        </h1>
                        <div className="h-1 w-20 bg-primary mt-4 mb-6" />
                        <p className="max-w-xl text-lg sm:text-xl text-white/90 leading-relaxed">
                            {t("description")}
                        </p>
                    </motion.div>

                    <motion.div
                        className="mt-8 flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <Button size="lg" className="rounded-full px-6" asChild>
                            <Link href="#about">{t("learnMoreButton")}</Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="bg-white/10 border-white/30 text-white rounded-full px-6 hover:bg-white/20"
                            asChild
                        >
                            <Link href="#visitor-info">
                                {t("visitPlanButton")}
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>

            <div className="container">
                <div className="relative -mt-28 px-4 grid grid-cols-1 gap-4 md:grid-cols-3 z-20">
                    {Array.isArray(infoCards) &&
                        infoCards.map((card, index) => (
                            <InfoCard
                                key={index}
                                icon={getIcon(card.icon)}
                                title={card.title}
                                description={card.description}
                            />
                        ))}
                </div>
            </div>
        </section>
    );
}

interface InfoCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

function InfoCard({ icon, title, description }: InfoCardProps) {
    return (
        <motion.div
            className="rounded-lg bg-background p-6 shadow-lg border border-muted/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
        >
            <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">{icon}</div>
                <div>
                    <h3 className="font-medium">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </motion.div>
    );
}

function getIcon(iconName: string) {
    const icons = {
        Clock: <Clock className="h-6 w-6 text-primary" />,
        MapPin: <MapPin className="h-6 w-6 text-primary" />,
        Calendar: <Calendar className="h-6 w-6 text-primary" />
    };
    return icons[iconName] || <Clock className="h-6 w-6 text-primary" />;
}

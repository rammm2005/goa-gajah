import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionHeading } from "@/components/ui/section-heading"
import { useTranslations } from "next-intl"

export function AboutSection() {
    const t = useTranslations("aboutSection")
    const sections = t.raw("sections");

    console.log(t);

    return (
        <section id="about" className="py-16 md:py-24 lg:py-28">
            <div className="container mx-auto px-4 lg:px-8">
                <SectionHeading
                    title={t("title")}
                    subtitle={t("subtitle")}
                    centered
                    data-aos="fade-up"
                />

                <div className="mt-12 grid gap-12 lg:grid-cols-2 items-center">
                    <div className="relative w-full max-w-lg mx-auto lg:mx-0" data-aos="fade-right">
                        <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-primary/30" />
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-primary/30" />
                        <Image
                            src="/placeholder.svg?height=600&width=800"
                            alt="photo"
                            width={800}
                            height={600}
                            className="rounded-lg object-cover shadow-lg relative z-10 w-full"
                        />
                    </div>

                    <div className="space-y-8 max-w-lg mx-auto lg:mx-0" data-aos="fade-left">
                        {sections.map((section: { title: string; content: string }, index: number) => (
                            <div key={index}>
                                <h3 className="text-xl md:text-2xl font-bold font-serif text-primary">{section.title}</h3>
                                <div className="h-1 w-16 bg-primary/30 my-3" />
                                <p className="mt-3 text-muted-foreground leading-relaxed text-sm md:text-base">{section.content}</p>
                            </div>
                        ))}

                        <div className="flex justify-center lg:justify-start">
                            <Button variant="outline" className="mt-6 group" asChild>
                                <Link href="#gallery">
                                    {t("galleryButton")}
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

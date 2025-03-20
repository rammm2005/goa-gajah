"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/ui/language-switcher"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useTranslations } from "next-intl"

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <header
            className={cn(
                "sticky top-0 z-50 w-full transition-all duration-300",
                isScrolled
                    ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b shadow-sm"
                    : "bg-background/10"
            )}
        >
            <div className="container flex h-16 md:h-20 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border-2 border-primary/20">
                        <Image src="/placeholder.svg?height=48&width=48" alt="Goa Gajah Logo" fill className="object-cover" />
                    </div>
                    <span className={cn(
                        "text-xl md:text-2xl font-bold font-serif transition-colors",
                        isScrolled ? "text-foreground" : "dark:text-slate-200 text-foreground"
                    )}>
                        Goa Gajah
                    </span>
                </Link>

                <DesktopNav isScrolled={isScrolled} />
                <MobileNav isScrolled={isScrolled} />
            </div>
        </header>
    )
}

function DesktopNav({ isScrolled }: { isScrolled: boolean }) {
    const t = useTranslations()
    const visit = useTranslations()

    const navLinks = [
        { href: t("navLinks.about.href"), label: t("navLinks.about.label") },
        { href: t("navLinks.gallery.href"), label: t("navLinks.gallery.label") },
        { href: t("navLinks.visitorInfo.href"), label: t("navLinks.visitorInfo.label") },
        { href: t("navLinks.location.href"), label: t("navLinks.location.label") },
        { href: t("navLinks.testimonials.href"), label: t("navLinks.testimonials.label") }
    ]

    return (
        <>
            <nav className="hidden md:flex gap-8">
                {navLinks.map(({ href, label }, index) => (
                    <Link
                        key={index}
                        href={href}
                        className={cn(
                            "text-sm font-medium transition-colors relative group",
                            isScrolled ? "text-foreground hover:text-primary" : "dark:text-slate-200 text-foreground/90 hover:text-foreground"
                        )}
                    >
                        {label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                    </Link>
                ))}
            </nav>
            <div className="hidden md:flex items-center gap-4">
                <ThemeToggle />
                <LanguageSwitcher />
                <Button
                    variant={isScrolled ? "default" : "default"}
                    className={cn("transition-all", !isScrolled && "bg-black/20 dark:text-slate-200 hover:bg-black/50 text-foreground/90 hover:text-foreground border-black/50")}
                    asChild
                >
                    <Link href="#visitor-info">{visit("visit-now")}</Link>
                </Button>
            </div>
        </>
    )
}

function MobileNav({ isScrolled }: { isScrolled: boolean }) {
    const [isOpen, setIsOpen] = useState(false)
    const t = useTranslations()


    const navLinks = [
        { href: t("navLinks.about.href"), label: t("navLinks.about.label") },
        { href: t("navLinks.gallery.href"), label: t("navLinks.gallery.label") },
        { href: t("navLinks.visitorInfo.href"), label: t("navLinks.visitorInfo.label") },
        { href: t("navLinks.location.href"), label: t("navLinks.location.label") },
        { href: t("navLinks.testimonials.href"), label: t("navLinks.testimonials.label") }
    ]

    return (
        <div className="md:hidden">
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(true)}
                    className={cn("md:hidden", !isScrolled && "text-white hover:bg-white/10")}
                >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </div>
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setIsOpen(false)}>
                    <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-background shadow-lg transition-transform transform translate-x-0" onClick={(e) => e.stopPropagation()}>
                        <nav className="grid gap-2 p-6">
                            {navLinks.map(({ href, label }, index) => (
                                <Link
                                    key={index}
                                    href={href}
                                    className="flex items-center gap-2 text-lg font-medium hover:text-primary py-2 border-b border-muted"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {label}
                                </Link>
                            ))}
                            <div className="mt-6">
                                <LanguageSwitcher />
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </div>
    )
}
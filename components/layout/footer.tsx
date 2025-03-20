import type { ReactNode } from "react";
import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function Footer() {
    const t = useTranslations();
    return (
        <footer className="bg-stone-100 dark:bg-stone-900 pt-16 pb-8 border-t">
            <div className="container px-4">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative w-10 h-10 overflow-hidden rounded-full border-2 border-primary/20">
                                <Image src="/image/goa-gajah-prof.jpg?height=40&width=40" alt="Goa Gajah" fill className="object-cover" />
                            </div>
                            <span className="text-xl font-bold font-serif">{t("siteName")}</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            {t("description")}
                        </p>
                        <div className="mt-6 flex gap-4">
                            <SocialIcon href="#" icon="facebook" />
                            <SocialIcon href="#" icon="instagram" />
                            <SocialIcon href="#" icon="twitter" />
                            <SocialIcon href="#" icon="youtube" />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold font-serif">{t("quickLinks")}</h3>
                        <div className="h-1 w-12 bg-primary/30 mt-2 mb-4" />
                        <nav className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                            <FooterLink href="#about">{t("about")}</FooterLink>
                            <FooterLink href="#gallery">{t("gallery")}</FooterLink>
                            <FooterLink href="#visitor-info">{t("visitorInfo")}</FooterLink>
                            <FooterLink href="#location">{t("location")}</FooterLink>
                            <FooterLink href="#testimonials">{t("testimonials")}</FooterLink>
                            <FooterLink href="#">{t("newsEvents")}</FooterLink>
                            <FooterLink href="#">{t("contact")}</FooterLink>
                            <FooterLink href="#">{t("faq")}</FooterLink>
                        </nav>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold font-serif">{t("contact")}</h3>
                        <div className="h-1 w-12 bg-primary/30 mt-2 mb-4" />
                        <div className="mt-4 space-y-4">
                            <p className="flex items-start gap-3 text-sm">
                                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{t("address")}</span>
                            </p>
                            <p className="flex items-start gap-3 text-sm">
                                <PhoneIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{t("phone")}</span>
                            </p>
                            <p className="flex items-start gap-3 text-sm">
                                <MailIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{t("email")}</span>
                            </p>
                            <p className="flex items-start gap-3 text-sm">
                                <ClockIcon className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                <span>
                                    {t("openingHours")}
                                    <br />
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold font-serif">{t("subscribe")}</h3>
                        <div className="h-1 w-12 bg-primary/30 mt-2 mb-4" />
                        <p className="mt-4 text-sm text-muted-foreground">
                            {t("subscribeText")}
                        </p>
                        <div className="mt-4">
                            <div className="flex gap-2">
                                <Input type="email" placeholder={t("emailPlaceholder")} className="h-10" />
                                <Button size="sm" className="h-10">
                                    {t("send")}
                                </Button>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-center md:text-left text-sm text-muted-foreground">
                            &copy; {new Date().getFullYear()} Goa Gajah
                            <span className="block md:inline md:ml-1">Rama Dev</span>
                        </p>
                        <div className="flex gap-4 text-sm">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                {t("privacyPolicy")}
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                {t("termsConditions")}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link href={href} className="text-sm hover:text-primary transition-colors">
            {children}
        </Link>
    );
}

function SocialIcon({ href, icon }: { href: string; icon: string }) {
    return (
        <Link
            href={href}
            className="rounded-full bg-muted p-2 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
        >
            {icon === "facebook" && <FacebookIcon className="h-5 w-5" />}
            {icon === "instagram" && <InstagramIcon className="h-5 w-5" />}
            {icon === "twitter" && <TwitterIcon className="h-5 w-5" />}
            {icon === "youtube" && <YoutubeIcon className="h-5 w-5" />}
            <span className="sr-only">{icon}</span>
        </Link>
    )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
    )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
    )
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
            <path d="m10 15 5-3-5-3z" />
        </svg>
    )
}

function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    )
}

function ClockIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}


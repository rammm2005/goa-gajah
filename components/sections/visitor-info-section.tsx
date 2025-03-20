import type React from "react";
import { useTranslations } from "next-intl";
import { Clock, Calendar, Info, MapPin, MessageSquare, Utensils } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { InfoCard } from "@/components/ui/info-card";

const ICONS: Record<string, React.ReactNode> = {
    Clock: <Clock />,
    Calendar: <Calendar />,
    Info: <Info />,
    MapPin: <MapPin />,
    MessageSquare: <MessageSquare />,
    Utensils: <Utensils />,
};

export function VisitorInfoSection() {
    const t = useTranslations("visitorInfoSection");

    const infoCards = t.raw("infoCards");

    return (
        <section id="visitor-info" className="py-20 md:py-28">
            <div className="container">
                <SectionHeading
                    title={t("title")}
                    subtitle={t("subtitle")}
                    centered
                    data-aos="fade-up"
                />

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {infoCards.map((card, index) => (
                        <InfoCard
                            key={index}
                            icon={ICONS[card.icon] || <Info />}
                            title={card.title}
                            data-aos="fade-up"
                            data-aos-delay={100 * (index + 1)}
                        >
                            <div className="mt-4 space-y-2">
                                {Array.isArray(card.content) ? (
                                    <ul className="space-y-3 text-sm">
                                        {card.content.map((item, idx) => (
                                            <ListItem key={idx}>{item}</ListItem>
                                        ))}
                                    </ul>
                                ) : (
                                    <>
                                        {card.content.description && (
                                            <p className="text-sm">{card.content.description}</p>
                                        )}
                                        {card.content.days && card.content.hours && (
                                            <div className="flex justify-between">
                                                <span>{card.content.days}</span>
                                                <span>{card.content.hours}</span>
                                            </div>
                                        )}
                                        {card.content.domestic && card.content.foreign && (
                                            <>
                                                <div className="flex justify-between">
                                                    <span>Domestic</span>
                                                    <span>{card.content.domestic}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Foreign Tourists</span>
                                                    <span>{card.content.foreign}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Children</span>
                                                    <span>{card.content.children}</span>
                                                </div>
                                            </>
                                        )}
                                        {card.content.options && (
                                            <ul className="space-y-3 text-sm mt-2">
                                                {card.content.options.map((option, idx) => (
                                                    <ListItem key={idx}>{option}</ListItem>
                                                ))}
                                            </ul>
                                        )}
                                        {card.content.services && (
                                            <ul className="space-y-3 text-sm mt-2">
                                                {card.content.services.map((service, idx) => (
                                                    <ListItem key={idx}>{service}</ListItem>
                                                ))}
                                            </ul>
                                        )}
                                        {card.content.cost && (
                                            <p className="mt-4 text-sm text-muted-foreground">
                                                {card.content.cost}
                                            </p>
                                        )}
                                        {card.content.note && (
                                            <p className="mt-4 text-sm text-muted-foreground">
                                                {card.content.note}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </InfoCard>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ListItem({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex items-start gap-2">
            <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span>{children}</span>
        </li>
    );
}

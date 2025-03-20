"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Language = "id" | "en";

export function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [language, setLanguage] = useState<Language>("id");

    useEffect(() => {
        const storedLang = localStorage.getItem("NEXT_LOCALE") as Language | null;
        if (storedLang) {
            setLanguage(storedLang);
        }
    }, []);

    const handleLanguageChange = (lang: Language) => {
        const newPath = pathname.replace(/^\/(id|en)/, "").replace(/^\/$/, "");
        router.push(`/${lang}${newPath}`);
        setLanguage(lang);
        localStorage.setItem("NEXT_LOCALE", lang);
    };

    return (
        <div className="flex items-center gap-1 border rounded-md p-1 bg-background/80">
            <LanguageButton lang="id" isActive={language === "id"} onClick={() => handleLanguageChange("id")} />
            <LanguageButton lang="en" isActive={language === "en"} onClick={() => handleLanguageChange("en")} />
        </div>
    );
}

interface LanguageButtonProps {
    lang: Language;
    isActive: boolean;
    onClick: () => void;
}

function LanguageButton({ lang, isActive, onClick }: LanguageButtonProps) {
    return (
        <Button
            variant={isActive ? "default" : "ghost"}
            size="sm"
            onClick={onClick}
            className={cn(
                "text-xs h-8 px-3 font-medium transition-all",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
        >
            {lang.toUpperCase()}
        </Button>
    );
}

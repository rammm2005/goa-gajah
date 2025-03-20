import type React from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    subtitle?: string
    centered?: boolean
}

export function SectionHeading({ title, subtitle, centered = false, className, ...props }: SectionHeadingProps) {
    return (
        <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)} {...props}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-serif">{title}</h2>
            {subtitle && (
                <>
                    <div className={cn("h-1 w-16 bg-primary my-4", centered && "mx-auto")} />
                    <p className="mt-4 text-muted-foreground">{subtitle}</p>
                </>
            )}
        </div>
    )
}


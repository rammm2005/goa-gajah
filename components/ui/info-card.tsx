import type React from "react"
import { cn } from "@/lib/utils"

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ReactNode
    title: string
    children: React.ReactNode
}

export function InfoCard({ icon, title, children, className, ...props }: InfoCardProps) {
    return (
        <div className={cn("rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md", className)} {...props}>
            <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">{icon}</div>
                <h3 className="text-xl font-bold font-serif">{title}</h3>
            </div>
            {children}
        </div>
    )
}


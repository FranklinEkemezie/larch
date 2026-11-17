import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string | number;
}

export function StatCard({ icon: Icon, label, value }: StatCardProps) {
    return (
        <Card className="gap-2 py-3 shadow-none">
            <CardContent className="px-3">
                <Icon
                    className="text-muted-foreground mb-2 size-4"
                    strokeWidth={1.8}
                />
                <div className="text-xl font-semibold tracking-tight">{value}</div>
                <div className="text-muted-foreground text-xs">{label}</div>
            </CardContent>
        </Card>
    );
}

import { ClipboardCheck } from 'lucide-react';
import { Badge } from '@/shared/components/ui/badge.tsx';
import { Separator } from '@/shared/components/ui/separator';
import { usePreoperational } from '@/features/preoperational/context/PreoperationalContext.tsx';
import type { PreoperationalAnswers } from '@/features/preoperational/context/PreoperationalContext.tsx';
import { PreoperationalHeader } from '@/features/preoperational/components/preoperational-header.tsx';
import { PreoperationalHero } from '@/features/preoperational/components/preoperational-hero.tsx';
import { PreoperationalCategoryCard } from '@/features/preoperational/components/preoperational-category-card.tsx';
import { PreoperationalComments } from '@/features/preoperational/components/preoperational-comments.tsx';
import { PreoperationalFooter } from '@/features/preoperational/components/preoperational-footer.tsx';
import { PreoperationalFiltersCard } from '@/features/preoperational/components/preoperational-filters-card.tsx';
import type { PreoperationalVehicle } from '@/features/preoperational/types/preoperational-res.ts';

interface Props {
    date: string;
    vehicles: PreoperationalVehicle[];
    selectedVehicle: PreoperationalVehicle;
    onDateChange: (date: string) => void;
    onVehicleChange: (vehicleId: number) => void;
    onSave: (answers: PreoperationalAnswers) => void;
    isSubmitting: boolean;
}

export const PreoperationalForm = ({
    date,
    vehicles,
    selectedVehicle,
    onDateChange,
    onVehicleChange,
    onSave,
    isSubmitting,
}: Props) => {
    const { categories, totalItems, answeredCount, failures, progress } =
        usePreoperational();

    return (
        <main className="min-h-screen bg-background pb-16 font-sans">
            <PreoperationalHeader>
                <Badge variant="secondary" className="shrink-0">
                    {answeredCount}/{totalItems}
                </Badge>
            </PreoperationalHeader>

            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                <PreoperationalHero progress={progress} />

                <PreoperationalFiltersCard
                    date={date}
                    onDateChange={onDateChange}
                    vehicles={vehicles}
                    selectedVehicle={selectedVehicle}
                    onVehicleChange={onVehicleChange}
                >
                    <PreoperationalComments />
                </PreoperationalFiltersCard>

                <div className="mt-7 flex items-end justify-between gap-3">
                    <div>
                        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                            Puntos de revisión
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Marca Bueno, Malo o N/A e indica la cantidad si
                            aplica.
                        </p>
                    </div>
                    {failures > 0 ? (
                        <Badge variant="destructive" className="shrink-0">
                            {failures} en mal estado
                        </Badge>
                    ) : (
                        <ClipboardCheck
                            className="mb-1 h-5 w-5 shrink-0 text-muted-foreground"
                            aria-hidden="true"
                        />
                    )}
                </div>
                <Separator className="mt-4" />

                <div className="mt-4 grid gap-4">
                    {categories.map((category) => (
                        <PreoperationalCategoryCard
                            key={category.category}
                            category={category}
                        />
                    ))}
                </div>

                <PreoperationalFooter
                    onSave={onSave}
                    isSubmitting={isSubmitting}
                />
            </div>
        </main>
    );
};

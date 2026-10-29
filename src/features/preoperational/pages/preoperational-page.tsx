import { useNavigate } from 'react-router';
import { Bus, CheckCircle2 } from 'lucide-react';
import { QueryState } from '@/shared/components/custom/validate-error.tsx';
import {
    PRE_OPERATIONAL_QUESTIONS,
    type VehicleType,
} from '@/features/preoperational/constants/question.ts';
import { PreoperationalProvider } from '@/features/preoperational/context/PreoperationalProvider.tsx';
import type { PreoperationalAnswers } from '@/features/preoperational/context/PreoperationalContext.tsx';
import { PreoperationalHeader } from '@/features/preoperational/components/preoperational-header.tsx';
import { PreoperationalHero } from '@/features/preoperational/components/preoperational-hero.tsx';
import { PreoperationalFiltersCard } from '@/features/preoperational/components/preoperational-filters-card.tsx';
import { StateCard } from '@/shared/components/custom/state-card.tsx';
import { PreoperationalForm } from '@/features/preoperational/components/preoperational-form.tsx';
import { usePreoperationalFilters } from '@/features/preoperational/hooks/usePreoperationalFilters.ts';
import { useAllPreoperational } from '@/features/preoperational/hooks/useAllPreoperational.ts';
import { useSavePreoperational } from '@/features/preoperational/hooks/useSavePreoperational.ts';
import { convertToPreoperationalSave } from '@/features/preoperational/mappers/convert-to-preoperational-save.ts';
import { formatDateLabel } from '@/features/preoperational/utils/date.ts';

const isVehicleType = (value: string | null): value is VehicleType =>
    value !== null &&
    Object.prototype.hasOwnProperty.call(PRE_OPERATIONAL_QUESTIONS, value);

export const PreoperationalPage = () => {
    const navigate = useNavigate();
    const { date, vehicleId, setDate, setVehicleId } =
        usePreoperationalFilters();

    const preoperationalQuery = useAllPreoperational(date, vehicleId);
    const savePreoperational = useSavePreoperational();

    return (
        <QueryState query={preoperationalQuery}>
            {(result) => {
                if (result.kind === 'exists') {
                    return (
                        <main className="min-h-screen bg-background pb-16 font-sans">
                            <PreoperationalHeader />
                            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                                <PreoperationalHero />
                                <PreoperationalFiltersCard
                                    date={date}
                                    onDateChange={setDate}
                                />
                                <StateCard
                                    icon={CheckCircle2}
                                    title="Preoperacional ya registrado"
                                    description={`Ya diligenciaste el preoperacional del ${formatDateLabel(date)}. No es necesario volver a llenarlo.`}
                                    hint="Puedes cambiar la fecha para consultar otro día."
                                />
                            </div>
                        </main>
                    );
                }

                const { vehicles, vehicle_selected, vehicle_type } =
                    result.data;

                if (!vehicle_selected || !isVehicleType(vehicle_type)) {
                    return (
                        <main className="min-h-screen bg-background pb-16 font-sans">
                            <PreoperationalHeader />
                            <div className="mx-auto max-w-5xl px-4 py-5 sm:px-6 sm:py-8">
                                <PreoperationalHero />
                                <PreoperationalFiltersCard
                                    date={date}
                                    onDateChange={setDate}
                                    vehicles={vehicles}
                                    selectedVehicle={vehicle_selected}
                                    onVehicleChange={setVehicleId}
                                />
                                {vehicle_selected ? (
                                    <StateCard
                                        icon={Bus}
                                        tone="muted"
                                        title="Este vehículo no tiene preoperacionales asignados"
                                        description={`El vehículo ${vehicle_selected.plate} (${vehicle_selected.type_vehicle}) no cuenta con una lista de chequeo preoperacional.`}
                                        hint="Selecciona otro vehículo o comunícate con tu administrador."
                                    />
                                ) : (
                                    <StateCard
                                        icon={Bus}
                                        tone="muted"
                                        title="No tienes vehículos asignados"
                                        description="Para diligenciar el preoperacional necesitas tener al menos un vehículo asignado a tu perfil."
                                        hint="Comunícate con tu administrador."
                                    />
                                )}
                            </div>
                        </main>
                    );
                }

                const categories = PRE_OPERATIONAL_QUESTIONS[vehicle_type];

                const handleSave = (answers: PreoperationalAnswers) => {
                    const request = convertToPreoperationalSave({
                        date,
                        vehicleId: vehicle_selected.id,
                        categories,
                        answers,
                    });

                    savePreoperational.mutate(request, {
                        onSuccess: () => navigate('/'),
                    });
                };

                return (
                    <PreoperationalProvider
                        key={`${date}-${vehicle_selected.id}`}
                        categories={categories}
                    >
                        <PreoperationalForm
                            date={date}
                            vehicles={vehicles}
                            selectedVehicle={vehicle_selected}
                            onDateChange={setDate}
                            onVehicleChange={setVehicleId}
                            onSave={handleSave}
                            isSubmitting={savePreoperational.isPending}
                        />
                    </PreoperationalProvider>
                );
            }}
        </QueryState>
    );
};

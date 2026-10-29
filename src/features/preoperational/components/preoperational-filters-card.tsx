import type { ReactNode } from 'react';
import { CalendarDays } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input.tsx';
import { Label } from '@/shared/components/ui/label.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select';
import type { PreoperationalVehicle } from '@/features/preoperational/types/preoperational-res.ts';
import {
    formatDateLabel,
    getTodayDate,
} from '@/features/preoperational/utils/date.ts';

interface Props {
    date: string;
    onDateChange: (date: string) => void;
    vehicles?: PreoperationalVehicle[];
    selectedVehicle?: PreoperationalVehicle | null;
    onVehicleChange?: (vehicleId: number) => void;
    children?: ReactNode;
}

export const PreoperationalFiltersCard = ({
    date,
    onDateChange,
    vehicles = [],
    selectedVehicle,
    onVehicleChange,
    children,
}: Props) => {
    return (
        <Card className="mt-6 border-border/70 shadow-sm">
            <CardHeader className="p-4 pb-2 sm:p-5 sm:pb-2">
                <CardTitle className="font-display text-base font-semibold tracking-tight">
                    Datos de la inspección
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-4 pt-2 sm:grid-cols-2 sm:p-5 sm:pt-2">
                <div className="grid gap-2">
                    <Label htmlFor="fecha">Fecha</Label>
                    <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            id="fecha"
                            type="date"
                            value={date}
                            max={getTodayDate()}
                            onChange={(event) => {
                                if (event.target.value) {
                                    onDateChange(event.target.value);
                                }
                            }}
                            className="pl-9"
                        />
                    </div>
                    <p className="text-xs capitalize text-muted-foreground">
                        {formatDateLabel(date)}
                    </p>
                </div>

                {vehicles.length > 0 ? (
                    <div className="grid gap-2">
                        <Label htmlFor="placa">Placa del vehículo</Label>
                        <Select
                            value={
                                selectedVehicle
                                    ? String(selectedVehicle.id)
                                    : ''
                            }
                            onValueChange={(value) => {
                                if (value) onVehicleChange?.(Number(value));
                            }}
                        >
                            <SelectTrigger id="placa" className="w-full">
                                <SelectValue placeholder="Selecciona la placa">
                                    {selectedVehicle?.plate}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {vehicles.map((vehicle) => (
                                    <SelectItem
                                        key={vehicle.id}
                                        value={String(vehicle.id)}
                                    >
                                        {vehicle.plate} · {vehicle.type_vehicle}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <p className="text-xs capitalize text-muted-foreground">
                            {selectedVehicle
                                ? `Tipo: ${selectedVehicle.type_vehicle}`
                                : 'Vehículos asignados a tu perfil.'}
                        </p>
                    </div>
                ) : null}

                {children}
            </CardContent>
        </Card>
    );
};

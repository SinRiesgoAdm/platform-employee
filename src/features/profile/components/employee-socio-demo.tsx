import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { useForm } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import { FormSelect } from '@/shared/components/custom/select.tsx';
import { forwardRef, useImperativeHandle } from 'react';

import type { EmployeeExtendResponse } from '@/features/profile/types/employee-extend.ts';
import {
    DWELLING_OPTIONS,
    LEVEL_OPTIONS,
    MARITAL_OPTIONS,
    SALARY_OPTIONS,
    STRATUM_OPTIONS,
} from '@/features/profile/constant/extends.ts';
import { useUpdateEmployeeExtends } from '@/features/profile/hooks/useUpdateEmployeeExtends.ts';

interface Props {
    socioeconomicData: EmployeeExtendResponse;
}

export interface SocioeconomicEditRef {
    submit: () => Promise<void>;
}

export const EmployeeSocioeconomicEdit = forwardRef<
    SocioeconomicEditRef,
    Props
>(({ socioeconomicData }, ref) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<EmployeeExtendResponse>({
        defaultValues: socioeconomicData,
    });

    const employeeExtendsUpdate = useUpdateEmployeeExtends();

    const onSubmit = async (data: EmployeeExtendResponse) => {
        await employeeExtendsUpdate.mutateAsync(data);
    };

    useImperativeHandle(ref, () => ({
        submit: async () => {
            await handleSubmit(onSubmit)();
        },
    }));

    return (
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <Card className="w-full border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="font-display text-base tracking-tight">
                        Información Socioeconómica y Laboral
                    </CardTitle>
                </CardHeader>

                <CardContent className="grid w-full gap-4 sm:grid-cols-2">
                    <div className="min-w-0 space-y-1.5">
                        <FormSelect
                            name="marital"
                            control={control}
                            label="Estado Civil"
                            options={MARITAL_OPTIONS}
                            rules={{
                                required: 'El estado civil es obligatorio',
                            }}
                        />

                        {errors.marital && (
                            <p className="text-xs text-destructive">
                                {errors.marital.message}
                            </p>
                        )}
                    </div>
                    <div className="min-w-0 space-y-1.5">
                        <FormSelect
                            name="stratum"
                            control={control}
                            label="Estrato de servicios"
                            options={STRATUM_OPTIONS}
                            rules={{
                                required: 'El estrato es obligatorio',
                            }}
                        />
                    </div>
                    <div className="min-w-0 space-y-1.5">
                        <FormSelect
                            name="dwelling"
                            control={control}
                            label="Tipo de vivienda"
                            options={DWELLING_OPTIONS}
                            rules={{
                                required: 'El tipo de vivienda es obligatorio',
                            }}
                        />
                    </div>
                    <div className="min-w-0 space-y-1.5">
                        <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Número de personas que dependan económicamente de
                            usted
                        </Label>

                        <Input
                            type="number"
                            {...register('dependency', {
                                required: 'Este campo es obligatorio',
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'El valor no puede ser negativo',
                                },
                            })}
                            aria-invalid={!!errors.dependency}
                        />

                        {errors.dependency && (
                            <p className="text-xs text-destructive">
                                {errors.dependency.message}
                            </p>
                        )}
                    </div>
                    <div className="min-w-0 space-y-1.5">
                        <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            ¿Hace cuántos años que trabaja en la empresa?
                        </Label>

                        <Input
                            type="number"
                            {...register('time', {
                                required: 'Este campo es obligatorio',
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'El valor no puede ser negativo',
                                },
                            })}
                            aria-invalid={!!errors.time}
                        />

                        {errors.time && (
                            <p className="text-xs text-destructive">
                                {errors.time.message}
                            </p>
                        )}
                    </div>
                    <div className="min-w-0 space-y-1.5">
                        <FormSelect
                            name="level"
                            control={control}
                            label="Tipo de cargo parecido al que usted desempeña"
                            options={LEVEL_OPTIONS}
                            rules={{
                                required: 'El tipo de cargo es obligatorio',
                            }}
                        />
                    </div>
                    <div className="min-w-0 space-y-1.5">
                        <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            ¿Hace cuántos años desempeña el cargo u oficio
                            actual en esta empresa?
                        </Label>

                        <Input
                            type="number"
                            {...register('time_2', {
                                required: 'Este campo es obligatorio',
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: 'El valor no puede ser negativo',
                                },
                            })}
                            aria-invalid={!!errors.time_2}
                        />

                        {errors.time_2 && (
                            <p className="text-xs text-destructive">
                                {errors.time_2.message}
                            </p>
                        )}
                    </div>
                    <div className="min-w-0 space-y-1.5">
                        <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                            Indique cuántas horas diarias de trabajo están
                            establecidas habitualmente por la empresa para su
                            cargo
                        </Label>

                        <Input
                            type="number"
                            {...register('hours', {
                                required: 'Las horas son obligatorias',
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: 'Debe ser al menos 1 hora',
                                },
                                max: {
                                    value: 24,
                                    message: 'Máximo 24 horas',
                                },
                            })}
                            aria-invalid={!!errors.hours}
                        />

                        {errors.hours && (
                            <p className="text-xs text-destructive">
                                {errors.hours.message}
                            </p>
                        )}
                    </div>
                    <div className="min-w-0 space-y-1.5 sm:col-span-2">
                        <FormSelect
                            name="salary"
                            control={control}
                            label="Tipo de salario que recibe"
                            options={SALARY_OPTIONS}
                            rules={{
                                required: 'El tipo de salario es obligatorio',
                            }}
                        />
                    </div>
                </CardContent>
            </Card>
        </form>
    );
});

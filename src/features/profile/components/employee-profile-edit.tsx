import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import {
    type EmployeeProfileResponse,
    getContract,
    getWorkDay,
} from '@/features/profile/types/employee-profile-res.ts';
import { useForm } from 'react-hook-form';
import { Label } from '@/shared/components/ui/label.tsx';
import { Input } from '@/shared/components/ui/input.tsx';
import {
    LEVEL_EDUCATION_MAP,
    LICENSE_TYPE_MAP,
    ROLE_VIAL_MAP,
    SEX_MAP,
    VEHICLE_ROLE_MAP,
    VEHICLE_TYPES_MAP,
    ZONE_MAP,
} from '@/features/profile/constant/profiles.ts';
import { FormSelect } from '@/shared/components/custom/select.tsx';
import { forwardRef, useImperativeHandle } from 'react';
import { useUpdateProfileEmployee } from '@/features/profile/hooks/useUpdateProfileEmployee.ts';

interface props {
    employeeProfileResponse: EmployeeProfileResponse;
}

export interface EmployeeProfileEditRef {
    submit: () => Promise<void>;
}

export const EmployeeProfileEdit = forwardRef<EmployeeProfileEditRef, props>(
    ({ employeeProfileResponse }, ref) => {
        const {
            register,
            control,
            watch,
            handleSubmit,
            formState: { errors },
        } = useForm<EmployeeProfileResponse>({
            defaultValues: employeeProfileResponse,
        });

        const updateProfileEmployee = useUpdateProfileEmployee();
        const onSubmit = async (data: EmployeeProfileResponse) => {
            await updateProfileEmployee.mutateAsync(data);
        };

        useImperativeHandle(ref, () => ({
            submit: async () => {
                await handleSubmit(onSubmit)();
            },
        }));

        const roleVial = watch('roleVial');
        const isDriver = roleVial === 'conductor';

        return (
            <>
                <form className="contents" onSubmit={handleSubmit(onSubmit)}>
                    <Card className="border-border/70 shadow-sm">
                        <CardHeader>
                            <CardTitle className="font-display text-base tracking-tight">
                                Datos personales
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Nombre
                                </Label>
                                <Input
                                    {...register('name', { required: true })}
                                    aria-invalid={!!errors.name}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Cédula (CC)
                                </Label>
                                <Input
                                    {...register('uid', { required: true })}
                                    aria-invalid={!!errors.uid}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Fecha de nacimiento
                                </Label>
                                <Input
                                    type="date"
                                    {...register('birthday', {
                                        required: true,
                                    })}
                                    aria-invalid={!!errors.birthday}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Estado civil
                                </Label>
                                <Input
                                    {...register('estadoCivil', {
                                        required: true,
                                    })}
                                    aria-invalid={!!errors.estadoCivil}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <FormSelect
                                    name="educationLevel"
                                    control={control}
                                    label="Nivel de educación"
                                    options={Object.entries(
                                        LEVEL_EDUCATION_MAP,
                                    ).map(([value, label]) => ({
                                        value: Number(value),
                                        label,
                                    }))}
                                    rules={{
                                        required:
                                            'El nivel de educación es obligatorio',
                                    }}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Ocupación
                                </Label>
                                <Input
                                    {...register('ocupation', {
                                        required: true,
                                    })}
                                    aria-invalid={!!errors.ocupation}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <FormSelect
                                    name="gender"
                                    control={control}
                                    label="Sexo"
                                    options={Object.entries(SEX_MAP).map(
                                        ([value, label]) => ({
                                            value: Number(value),
                                            label,
                                        }),
                                    )}
                                    rules={{
                                        required: 'El sexo es obligatorio',
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/70 shadow-sm">
                        <CardHeader>
                            <CardTitle className="font-display text-base tracking-tight">
                                Contacto y ubicación
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Dirección
                                </Label>
                                <Input
                                    {...register('address', { required: true })}
                                    aria-invalid={!!errors.address}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Celular
                                </Label>
                                <Input
                                    {...register('mobile', { required: true })}
                                    aria-invalid={!!errors.mobile}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Correo electrónico
                                </Label>
                                <Input
                                    {...register('email', { required: true })}
                                    aria-invalid={!!errors.email}
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Ubicación
                                </Label>
                                <Input
                                    value={
                                        employeeProfileResponse.employeeLocation ??
                                        ''
                                    }
                                    disabled
                                />
                            </div>
                            <div className="min-w-0 space-y-1.5">
                                <FormSelect
                                    name="zone"
                                    control={control}
                                    label="Zona"
                                    options={Object.entries(ZONE_MAP).map(
                                        ([value, label]) => ({
                                            value: value,
                                            label,
                                        }),
                                    )}
                                    rules={{
                                        required: 'La zona es obligatoria',
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/70 shadow-sm">
                        <CardHeader>
                            <CardTitle className="font-display text-base tracking-tight">
                                Datos laborales
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Empleador
                                </Label>

                                <Input
                                    value={
                                        employeeProfileResponse.temporalTemp ??
                                        ''
                                    }
                                    disabled
                                />
                            </div>

                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Área
                                </Label>

                                <Input
                                    value={
                                        employeeProfileResponse.areaTemp ?? ''
                                    }
                                    disabled
                                />
                            </div>

                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Cargo
                                </Label>

                                <Input
                                    value={
                                        employeeProfileResponse.positionName ??
                                        ''
                                    }
                                    disabled
                                />
                            </div>

                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Tipo de contrato
                                </Label>

                                <Input
                                    id="contractType"
                                    value={getContract(
                                        employeeProfileResponse.contractType,
                                    )}
                                    disabled
                                    readOnly
                                />
                            </div>

                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Jornada
                                </Label>
                                <Input
                                    id="workday"
                                    value={getWorkDay(
                                        employeeProfileResponse.workday,
                                    )}
                                    disabled
                                    readOnly
                                />
                            </div>

                            <div className="min-w-0 space-y-1.5">
                                <Label className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                                    Inicio de contrato
                                </Label>

                                <Input
                                    type="date"
                                    value={
                                        employeeProfileResponse.startdate ?? ''
                                    }
                                    disabled
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/70 shadow-sm">
                        <CardHeader>
                            <CardTitle className="font-display text-base tracking-tight">
                                Pesv
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid gap-4 sm:grid-cols-2">
                            <FormSelect
                                name="roleVial"
                                control={control}
                                label="Rol vial"
                                options={Object.entries(ROLE_VIAL_MAP).map(
                                    ([value, label]) => ({
                                        value,
                                        label,
                                    }),
                                )}
                                rules={{
                                    required: 'El rol vial es obligatorio',
                                }}
                            />

                            <FormSelect
                                name="typeDisplacement"
                                control={control}
                                label="Tipo de desplazamiento"
                                options={Object.entries(VEHICLE_ROLE_MAP).map(
                                    ([value, label]) => ({
                                        value,
                                        label,
                                    }),
                                )}
                                rules={{
                                    required:
                                        'El tipo de desplazamiento es obligatorio',
                                }}
                            />

                            {isDriver && (
                                <>
                                    <FormSelect
                                        name="typeVehicle"
                                        control={control}
                                        label="Tipo de vehículo"
                                        options={Object.entries(
                                            VEHICLE_TYPES_MAP,
                                        ).map(([value, label]) => ({
                                            value,
                                            label,
                                        }))}
                                        rules={{
                                            required:
                                                'El tipo de vehículo es obligatorio',
                                        }}
                                    />

                                    <FormSelect
                                        name="licenceCategory"
                                        control={control}
                                        label="Categoría de licencia"
                                        options={Object.entries(
                                            LICENSE_TYPE_MAP,
                                        ).map(([value, label]) => ({
                                            value,
                                            label,
                                        }))}
                                        rules={{
                                            required:
                                                'La categoría de licencia es obligatoria',
                                        }}
                                    />

                                    <div className="min-w-0 space-y-1.5">
                                        <Label
                                            htmlFor="licenceVenc"
                                            className="text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground"
                                        >
                                            Fecha vencimiento de licencia
                                        </Label>

                                        <Input
                                            id="licenceVenc"
                                            type="date"
                                            {...register('licenceVenc', {
                                                required:
                                                    'La fecha de vencimiento es obligatoria',
                                            })}
                                            aria-invalid={!!errors.licenceVenc}
                                        />

                                        {errors.licenceVenc && (
                                            <p className="text-xs text-destructive">
                                                {errors.licenceVenc.message}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </form>
            </>
        );
    },
);

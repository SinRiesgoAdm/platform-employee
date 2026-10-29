import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/shared/components/ui/card.tsx';
import { ItemEmployeeDetail } from '@/features/profile/components/item-employee-detail.tsx';
import {
    type EmployeeProfileResponse,
    getContract,
    getEducationLevelLabel,
    getLicenseCategory,
    getRoleVial,
    getSex,
    getTypeDisplacement,
    getTypeVehicle,
    getWorkDay,
    getZone,
} from '@/features/profile/types/employee-profile-res.ts';

interface props {
    employeeProfileResponse: EmployeeProfileResponse;
}

export const EmployeeProfileInfo = ({ employeeProfileResponse }: props) => {
    return (
        <>
            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="font-display text-base tracking-tight">
                        Datos personales
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <ItemEmployeeDetail
                        name="Nombre"
                        value={employeeProfileResponse.name}
                    />
                    <ItemEmployeeDetail
                        name="Cédula (CC)"
                        value={employeeProfileResponse.uid}
                    />
                    <ItemEmployeeDetail
                        name="Fecha de nacimiento"
                        value={employeeProfileResponse.startdate}
                    />
                    <ItemEmployeeDetail
                        name="Estado civil"
                        value={employeeProfileResponse.estadoCivil}
                    />
                    <ItemEmployeeDetail
                        name="Nivel de educación"
                        value={getEducationLevelLabel(
                            employeeProfileResponse.educationLevel,
                        )}
                    />
                    <ItemEmployeeDetail
                        name="Ocupación"
                        value={employeeProfileResponse.ocupation}
                    />
                    <ItemEmployeeDetail
                        name="Sexo"
                        value={getSex(employeeProfileResponse.gender)}
                    />
                </CardContent>
            </Card>
            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="font-display text-base tracking-tight">
                        Contacto y ubicación
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <ItemEmployeeDetail
                        name="Dirección"
                        value={employeeProfileResponse.address}
                    />
                    <ItemEmployeeDetail
                        name="Celular"
                        value={employeeProfileResponse.mobile}
                    />
                    <ItemEmployeeDetail
                        name="Correo electrónico"
                        value={employeeProfileResponse.email}
                    />
                    <ItemEmployeeDetail
                        name="Ubicación"
                        value={employeeProfileResponse.employeeLocation}
                    />
                    <ItemEmployeeDetail
                        name="Zona"
                        value={getZone(employeeProfileResponse.zone)}
                    />
                </CardContent>
            </Card>
            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="font-display text-base tracking-tight">
                        Datos laborales
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <ItemEmployeeDetail
                        name="Empleador"
                        value={employeeProfileResponse.temporalTemp}
                    />
                    <ItemEmployeeDetail
                        name="Área"
                        value={employeeProfileResponse.areaTemp}
                    />
                    <ItemEmployeeDetail
                        name="Cargo"
                        value={employeeProfileResponse.positionName}
                    />
                    <ItemEmployeeDetail
                        name="Tipo de contrato"
                        value={getContract(
                            employeeProfileResponse.contractType,
                        )}
                    />
                    <ItemEmployeeDetail
                        name="Jornada"
                        value={getWorkDay(employeeProfileResponse.workday)}
                    />

                    <ItemEmployeeDetail
                        name="Inicio de contrato"
                        value={employeeProfileResponse.startdate}
                    />
                </CardContent>
            </Card>
            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="font-display text-base tracking-tight">
                        Pesv
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <ItemEmployeeDetail
                        name="Rol Vial"
                        value={getRoleVial(employeeProfileResponse.roleVial)}
                    />

                    {employeeProfileResponse.roleVial === 'conductor' && (
                        <>
                            <ItemEmployeeDetail
                                name="Tipo de Vehiculo"
                                value={getTypeVehicle(
                                    employeeProfileResponse.typeVehicle,
                                )}
                            />

                            <ItemEmployeeDetail
                                name="Categoría de Licencia"
                                value={getLicenseCategory(
                                    employeeProfileResponse.licenceCategory,
                                )}
                            />
                        </>
                    )}

                    <ItemEmployeeDetail
                        name="Tipo de Desplazamiento"
                        value={getTypeDisplacement(
                            employeeProfileResponse.typeDisplacement,
                        )}
                    />
                    {employeeProfileResponse.roleVial === 'conductor' && (
                        <ItemEmployeeDetail
                            name="Fecha Vencimiento de Licencia"
                            value={employeeProfileResponse.licenceVenc}
                        />
                    )}
                </CardContent>
            </Card>
            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle className="font-display text-base tracking-tight">
                        Seguridad social
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <ItemEmployeeDetail
                        name="ARL"
                        value={employeeProfileResponse.arlName}
                    />
                    <ItemEmployeeDetail
                        name="EPS"
                        value={employeeProfileResponse.epsName}
                    />

                    <ItemEmployeeDetail
                        name="Fondo de pensiones"
                        value={employeeProfileResponse.fpName}
                    />
                </CardContent>
            </Card>
        </>
    );
};

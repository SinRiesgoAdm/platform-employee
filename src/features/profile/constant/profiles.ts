export const ZONE_MAP = {
    '1': 'Rural',
    '2': 'Urbana',
} as const;

export const TYPE_CONTRACTS_MAP = {
    1: 'Administrativo',
    2: 'Aprendizaje',
    3: 'Prestación de servicio',
    4: 'Comercial',
    5: 'Obra Labor',
    6: 'Temporal/Ocasional',
    7: 'Termino Fijo',
    8: 'Termino Indefinido',
    9: 'Convenio de Asociación',
} as const;

export const WORKING_DAY_MAP = {
    1: 'Diurna',
    2: 'Nocturna',
    3: 'Mixta',
    4: 'Turno',
} as const;

export const LEVEL_EDUCATION_MAP = {
    0: 'No definido',
    1: 'Primaria',
    2: 'Bachiller',
    3: 'Técnica',
    4: 'Tecnóloga',
    5: 'Universitaria',
    6: 'Maestría',
    7: 'Doctorado',
} as const;

export const SEX_MAP = {
    1: 'Masculino',
    2: 'Femenino',
    3: 'Otros',
} as const;

export const ROLE_VIAL_MAP = {
    conductor: 'Conductor',
    peaton: 'Peatón',
    pasajero: 'Pasajero',
    empleado: 'Empleado',
} as const;

export const VEHICLE_TYPES_MAP = {
    bicicleta: 'Bicicleta',
    utilitario: 'Utilitario',
    montacarga: 'Montacarga',
    moto: 'Moto',
    automóvil: 'Automóvil',
    'bus-microbus': 'Bus Microbus',
    motocarro: 'Motocarro',
    camioneta: 'Camioneta',
    camión: 'Camión',
    'camión-grua': 'Camión-Grúa',
    tractor: 'Tractor',
    'tracto-camión': 'Tracto Camión',
    furgón: 'Furgón',
    volqueta: 'Volqueta',
    vibrocompactador: 'Vibrocompactador',
    motoniveladora: 'Motoniveladora',
    'retro-pajarita': 'Retro-Pajarita',
    Otro: 'Otro',
} as const;

export const LICENSE_TYPE_MAP = {
    'n/a': 'n/a',
    a1: 'A1',
    a2: 'A2',
    b1: 'B1',
    b2: 'B2',
    b3: 'B3',
    c1: 'C1',
    c2: 'C2',
    c3: 'C3',
} as const;

export const VEHICLE_ROLE_MAP = {
    'n/a': 'n/a',
    'conductor-ruta': 'Conductor Ruta',
    'conductor directo-funciones': 'Conductor Directo-Funciones-Trabajo-Casa',
    'Conductor contratista/afiliado': 'Conductor Contratista/Afiliado',
    'conductor-outsourcing/intermediacion':
        'Conductor Outsourcing/Intermediación',
    'conductores-funciones': 'Conductores Funciones',
    'punto/funciones': 'Punto/Funciones',
    'trabajo/casa': 'Trabajo/Casa',
} as const;

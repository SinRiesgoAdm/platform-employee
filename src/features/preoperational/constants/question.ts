/**
 * Catálogo de preguntas por tipo de preoperacional. Espejo de
 * `PRE_OPRATIONAL` del backend: los ids son la referencia que se guarda en
 * `data` y NO deben reutilizarse ni cambiarse.
 */
export interface PreOperationalQuestion {
    id: number;
    label: string;
}

export interface PreOperationalCategory {
    category: string;
    items: PreOperationalQuestion[];
}

export type VehicleType =
    | 'vehicleLight'
    | 'motorcycle'
    | 'dumpTruck'
    | 'vehicleCompactor'
    | 'vehicleGrader'
    | 'vehicleBird'
    | 'vehicleBus'
    | 'vehicleCrane'
    | 'vehicleTruck'
    | 'vehicleVan'
    | 'vehicleVanFur'
    | 'vehicleTractor'
    | 'vehicleUtilitarian'
    | 'vehicleForklift';

export const PRE_OPERATIONAL_QUESTIONS: Record<
    VehicleType,
    PreOperationalCategory[]
> = {
    vehicleLight: [
        {
            category: 'LLANTAS',
            items: [
                {
                    id: 1001,
                    label: 'Verifica la profundidad del labrado, presión, cortaduras o protuberancias',
                },
            ],
        },
        {
            category: 'LUCES',
            items: [
                {
                    id: 1002,
                    label: 'Verifica el funcionamiento correcto de luces altas y bajas, posición, direccionales, freno, reversa y estacionarias',
                },
            ],
        },
        {
            category: 'BOCINA',
            items: [{ id: 1003, label: 'Verifica su funcionamiento' }],
        },
        {
            category: 'ESPEJOS',
            items: [
                {
                    id: 1004,
                    label: 'Revisa y posiciona correctamente los espejos laterales y centrales',
                },
            ],
        },
        {
            category: 'NIVELES DE LIQUIDOS',
            items: [
                {
                    id: 1005,
                    label: 'Verifica el aceite, líquido de frenos, limpiaparabrisas, refrigerante, y dirección hidráulica (si aplica)',
                },
            ],
        },
        {
            category: 'FUGAS DE FLUIDOS',
            items: [
                {
                    id: 1006,
                    label: 'Verifica que no existan fugas ni humedades en el habitáculo del motor y en el piso donde parqueas',
                },
            ],
        },
        {
            category: 'ESTADO DE FRENOS',
            items: [
                {
                    id: 1007,
                    label: 'Verifica el estado de las pastillas y una óptima tensión del pedal y del freno de parqueo',
                },
            ],
        },
        {
            category: 'PARABRISAS',
            items: [
                {
                    id: 1008,
                    label: 'Verifica que no esté fisurado y el funcionamiento de las plumillas',
                },
            ],
        },
        {
            category: 'ELEMENTOS DE RETENCIÓN',
            items: [
                {
                    id: 1009,
                    label: 'Revisa el estado del cinturón de seguridad y el anclaje de las sillas',
                },
            ],
        },
        {
            category: 'DOCUMENTOS',
            items: [
                {
                    id: 1010,
                    label: 'Verifica la tarjeta de propiedad, SOAT y revisión técnico mecánica (si aplica)',
                },
            ],
        },
        {
            category: 'EQUIPOS DE PREVENCIÓN',
            items: [
                {
                    id: 1011,
                    label: 'Revisa la caja de herramientas, extintor, botiquín, conos, tacos, linterna, llanta de repuesto, gato, cruceta y chaleco reflectivo',
                },
            ],
        },
        {
            category: 'LUCES DE TABLERO Y TESTIGOS',
            items: [
                {
                    id: 1012,
                    label: 'Antes de iniciar la marcha, verifica que todos los testigos, excepto el de parqueo, estén apagados',
                },
            ],
        },
    ],
    motorcycle: [
        {
            category: 'LLANTAS',
            items: [
                {
                    id: 2001,
                    label: 'Verifica la profundidad del labrado, presión, cortaduras o protuberancia',
                },
            ],
        },
        {
            category: 'LUCES',
            items: [
                {
                    id: 2002,
                    label: 'Verifica el funcionamiento correcto de luces altas y bajas, posición, direccionales y freno',
                },
            ],
        },
        {
            category: 'BOCINA',
            items: [{ id: 2003, label: 'Verifica su funcionamiento' }],
        },
        {
            category: 'ESPEJOS',
            items: [
                {
                    id: 2004,
                    label: 'Revisa y posiciona correctamente los espejos',
                },
            ],
        },
        {
            category: 'NIVELES DE LIQUIDOS',
            items: [
                {
                    id: 2005,
                    label: 'Revisa los niveles de aceite, líquido de frenos y refrigerante (si aplica)',
                },
            ],
        },
        {
            category: 'FUGAS DE FLUIDOS',
            items: [
                {
                    id: 2006,
                    label: 'Revisa que no existan fugas ni humedades en el motor, suspensión, frenos y líquido refrigerante (si aplica)',
                },
            ],
        },
        {
            category: 'ESTADO DE FRENOS',
            items: [
                {
                    id: 2007,
                    label: 'Verifica la tensión del pedal y el estado de las pastillas',
                },
            ],
        },
        {
            category: 'PARABRISAS',
            items: [
                {
                    id: 2008,
                    label: 'Verifica que no esté fisurado y el funcionamiento de las plumillas',
                },
            ],
        },
        {
            category: 'TRANSMISIÓN',
            items: [
                {
                    id: 2009,
                    label: 'Verifica la tensión de la cadena y lubricación',
                },
            ],
        },
        {
            category: 'DOCUMENTOS',
            items: [
                {
                    id: 2010,
                    label: 'Verifica la tarjeta de propiedad, SOAT y revisión técnico mecánica (si aplica)',
                },
            ],
        },
        {
            category: 'KIT DE PREVENCIÓN',
            items: [
                {
                    id: 2011,
                    label: 'Revisa las herramientas y el impermeable',
                },
            ],
        },
    ],
    dumpTruck: [
        {
            category: 'LUCES',
            items: [
                { id: 3001, label: 'Frontales' },
                { id: 3002, label: 'Traseras de trabajo (reflector)' },
                {
                    id: 3003,
                    label: 'Direccionales delanteras de parqueo (Giro)',
                },
                { id: 3004, label: 'Direccionales traseras de parqueo (Giro)' },
                { id: 3005, label: 'De Stop y señal trasera' },
            ],
        },
        {
            category: 'CABINA',
            items: [
                { id: 3006, label: 'Espejos laterales' },
                { id: 3007, label: 'Alarma de retroceso' },
                { id: 3008, label: 'Pito' },
                { id: 3009, label: 'Freno de servicio' },
                { id: 3010, label: 'Freno de emergencia' },
                { id: 3011, label: 'Dirección/suspensión (Terminales)' },
                { id: 3012, label: 'Cinturón de seguridad' },
                { id: 3013, label: 'Vidrio frontal (en buen estado)' },
                { id: 3014, label: 'Limpia brisas' },
                { id: 3015, label: 'Extintor de incendios (10 lbs) PQS' },
                { id: 3016, label: 'Asiento en buena condición' },
                { id: 3017, label: 'Indicadores (hidráulico-voltímetro)' },
                { id: 3018, label: 'Motor-refrigerante-horómetro, aire' },
                { id: 3019, label: 'Batería y cables' },
            ],
        },
        {
            category: 'LLANTAS',
            items: [
                {
                    id: 3020,
                    label: 'Sin cortaduras profundas y sin abultamientos',
                },
            ],
        },
        {
            category: 'ESTADO MECÁNICO',
            items: [
                { id: 3021, label: 'Control de fugas hidráulicas' },
                { id: 3022, label: 'Pasadores, suspensión' },
                { id: 3023, label: 'Control fugas de aire' },
                { id: 3024, label: 'Grapas y anclaje de chasis' },
                { id: 3025, label: 'Cadena del cardán' },
                { id: 3026, label: 'Acoples rápidos' },
                { id: 3027, label: 'Mangueras' },
                { id: 3028, label: 'Estado general del volco' },
                { id: 3029, label: 'Gato de levante del volco' },
                { id: 3030, label: 'Estado de la compuerta' },
                {
                    id: 3031,
                    label: 'Tanque de combustible (Abrazaderas, Soporte)',
                },
                { id: 3032, label: 'Motor de bomba' },
            ],
        },
    ],
    vehicleCompactor: [
        {
            category: 'LUCES',
            items: [
                { id: 4001, label: 'De trabajo delanteras (Trabajo nocturno)' },
                { id: 4002, label: 'De trabajo traseras (Trabajo nocturno)' },
            ],
        },
        {
            category: 'CABINA',
            items: [
                { id: 4003, label: 'Cabina antivuelo (R.O.P.S)' },
                { id: 4004, label: 'Cinturón de seguridad' },
                { id: 4005, label: 'Extintor de incendios 10 lbs PQS' },
                { id: 4006, label: 'Asiento' },
                { id: 4007, label: 'Mandos de avance' },
                {
                    id: 4008,
                    label: 'Indicadores (hidráulicos-refrigerantes-horometro-corriente-aceite motor-combustible)',
                },
                { id: 4009, label: 'Control ingreso humo (tubo de escape)' },
                { id: 4010, label: 'Alarma de retroceso' },
                { id: 4011, label: 'Pito' },
                { id: 4012, label: 'Escaleras y apoyos de acceso' },
                { id: 4013, label: 'Espejo retrovisor central (convexo)' },
                { id: 4014, label: 'Estado de pedales' },
                { id: 4015, label: 'Estado de mandos manuales' },
            ],
        },
        {
            category: 'ESTADO MECÁNICO',
            items: [
                { id: 4016, label: 'Control de fugas hidráulicas' },
                { id: 4017, label: 'Estado de cilindro (amortiguadores)' },
                { id: 4018, label: 'Llantas en buen estado' },
                { id: 4019, label: 'Mecanismo de viraje' },
                { id: 4020, label: 'Dirección (terminales, bomba hidráulica)' },
                { id: 4021, label: 'Mando de estacionamiento (emergencia)' },
                { id: 4022, label: 'Motor' },
                { id: 4023, label: 'Pasadores y tornillos en buen estado' },
                { id: 4024, label: 'Bateria y cables' },
                { id: 4025, label: 'Freno de servicio' },
                { id: 4026, label: 'Resguardos' },
                { id: 4027, label: 'Anclajes de contrapeso' },
            ],
        },
    ],
    vehicleGrader: [
        {
            category: 'LUCES',
            items: [
                { id: 5001, label: 'Frontales de trabajo' },
                { id: 5002, label: 'Traseras de trabajo (Reflector)' },
                { id: 5003, label: 'Direccionales delanteras de parqueo' },
                { id: 5004, label: 'Direccionales traseras de parqueo' },
                { id: 5005, label: 'De stop y señal trasera' },
            ],
        },
        {
            category: 'CABINA',
            items: [
                { id: 5006, label: 'Espejo central convexo' },
                { id: 5007, label: 'Espejos laterales' },
                { id: 5008, label: 'Alarma de retroceso' },
                { id: 5009, label: 'Pito' },
                { id: 5010, label: 'Frenos de servicio' },
                { id: 5011, label: 'Dirección' },
                { id: 5012, label: 'Cinturón de seguridad 3 Puntos' },
                { id: 5013, label: 'Cabina antivuelco (R.O.P.S)' },
                { id: 5014, label: 'Vidrio frontal (en buen estado)' },
                { id: 5015, label: 'Limpiabrisas' },
                { id: 5016, label: 'Extintor de incendio (20 PQA)' },
                { id: 5017, label: 'Asiento en buena condición' },
                {
                    id: 5018,
                    label: 'Indicadores (hidráulico-refrigerante motor-horometro)',
                },
                { id: 5019, label: 'Escaleras y pasamanos' },
            ],
        },
        {
            category: 'LLANTAS',
            items: [
                {
                    id: 5020,
                    label: 'En buen estado (sin cortaduras profundas y sin abultamientos)',
                },
            ],
        },
        {
            category: 'ESTADO MECÁNICO',
            items: [
                { id: 5021, label: 'Control de fugas hidráulicas' },
                { id: 5022, label: 'Estado pasadores' },
                {
                    id: 5023,
                    label: 'Mecanismo de giro y escualización cuchillas',
                },
                { id: 5024, label: 'Terminales de dirección' },
                { id: 5025, label: 'Mandos de avance' },
                { id: 5026, label: 'Motor' },
                { id: 5027, label: 'Bomba Hidraulica' },
                { id: 5028, label: 'Servotransmisión' },
            ],
        },
    ],
    vehicleBird: [
        {
            category: 'LUCES',
            items: [
                { id: 6001, label: 'Frontales' },
                { id: 6002, label: 'Traseras de trabajo (reflector)' },
                {
                    id: 6003,
                    label: 'Direccionales delanteras de parqueo (Giro)',
                },
                { id: 6004, label: 'Direccionales traseras de parqueo (Giro)' },
                { id: 6005, label: 'De Stop y señal trasera' },
            ],
        },
        {
            category: 'CABINA',
            items: [
                { id: 6006, label: 'Espejos laterales' },
                { id: 6007, label: 'Alarma de retroceso' },
                { id: 6008, label: 'Pito' },
                { id: 6009, label: 'Freno de servicio' },
                { id: 6010, label: 'Freno de emergencia' },
                { id: 6011, label: 'Dirección/suspensión (Terminales)' },
                { id: 6012, label: 'Cinturón de seguridad' },
                { id: 6013, label: 'Vidrio frontal (en buen estado)' },
                { id: 6014, label: 'Limpia brisas' },
                { id: 6015, label: 'Extintor de incendios (10 lbs) PQS' },
                { id: 6016, label: 'Asiento en buena condición' },
                { id: 6017, label: 'Indicadores (hidráulico-voltímetro)' },
                { id: 6018, label: 'Motor-refrigerante-horómetro, aire' },
                { id: 6019, label: 'Batería y cables' },
            ],
        },
        {
            category: 'LLANTAS',
            items: [
                {
                    id: 6020,
                    label: 'Sin cortaduras profundas y sin abultamientos',
                },
            ],
        },
        {
            category: 'ESTADO MECÁNICO',
            items: [
                { id: 6021, label: 'Control de fugas hidráulicas' },
                { id: 6022, label: 'Pasadores, suspensión' },
                { id: 6023, label: 'Control fugas de aire' },
                { id: 6024, label: 'Grapas y anclaje de chasis' },
                { id: 6025, label: 'Cadena del cardán' },
                { id: 6026, label: 'Acoples rápidos' },
                { id: 6027, label: 'Mangueras' },
                { id: 6028, label: 'Estado general del volco' },
                { id: 6029, label: 'Gato de levante del volco' },
                { id: 6030, label: 'Estado de la compuerta' },
                {
                    id: 6031,
                    label: 'Tanque de combustible (Abrazaderas, Soporte)',
                },
                { id: 6032, label: 'Motor de bomba' },
            ],
        },
    ],
    vehicleBus: [
        {
            category: 'SISTEMA DE LUCES',
            items: [
                { id: 7001, label: 'Luz delantera alta' },
                { id: 7002, label: 'Luz delantera baja' },
                { id: 7003, label: 'Luz intermitente delantera (direccional)' },
                { id: 7004, label: 'Luces de emergencia delantera' },
                { id: 7005, label: 'Luces neblineras' },
                { id: 7006, label: 'Luz posterior' },
                { id: 7007, label: 'Luz de freno posterior' },
                { id: 7008, label: 'Luz intermitente posterior (direccional)' },
                { id: 7009, label: 'Luz de emergencia posterior' },
                { id: 7010, label: 'Luz interior' },
                { id: 7011, label: 'Luz de faros piratas (2)' },
            ],
        },
        {
            category: 'ESTADO DE LLANTAS',
            items: [
                { id: 7012, label: 'Llanta delantera derecha' },
                { id: 7013, label: 'Llanta delantera izquierda' },
                { id: 7014, label: 'Llanta posterior derecha' },
                { id: 7015, label: 'Llanta posterior izquierda' },
                { id: 7016, label: 'Llanta de repuesto' },
            ],
        },
        {
            category: 'PARTE EXTERNA',
            items: [
                { id: 7017, label: 'Parabrisas delantera' },
                { id: 7018, label: 'Parabrisas posterior' },
                { id: 7019, label: 'Limpieza parabrisas' },
                { id: 7020, label: 'Sistema de agua bomba limpieza' },
                { id: 7021, label: 'Vidrio manubrio puerta derecha' },
                { id: 7022, label: 'Vidrio manubrio puerta izquierda' },
                { id: 7023, label: 'Espejo lateral derecho' },
                { id: 7024, label: 'Espejo lateral izquierdo' },
                { id: 7025, label: 'Cinta reflectiva' },
                { id: 7026, label: 'Circulina' },
                { id: 7027, label: 'Pértiga' },
            ],
        },
        {
            category: 'ACCESORIOS DE SEGURIDAD',
            items: [
                { id: 7028, label: 'Triángulo de seguridad (2)' },
                { id: 7029, label: 'Extintor' },
                { id: 7030, label: 'Alarma de retroceso' },
                { id: 7031, label: 'Claxon' },
                { id: 7032, label: 'Circulina' },
                { id: 7033, label: 'Tacos de seguridad (2)' },
            ],
        },
        {
            category: 'PARTE INTERNA',
            items: [
                {
                    id: 7034,
                    label: 'Estado de tablero / Indicadores operativos',
                },
                { id: 7035, label: 'Freno de mano' },
                { id: 7036, label: 'Freno de servicio' },
                { id: 7037, label: 'Cinturón de seguridad chofer' },
                { id: 7038, label: 'Cinturón de seguridad copiloto' },
                { id: 7039, label: 'Cinturón de seguridad asiento posterior' },
                { id: 7040, label: 'Espejo retrovisor antideslumbrante' },
                { id: 7041, label: 'Linterna de mano' },
                { id: 7042, label: 'Orden y limpieza de cabina' },
                { id: 7043, label: 'Dirección' },
            ],
        },
        {
            category: 'TAPAS Y OTROS',
            items: [
                { id: 7044, label: 'Tapa de radiador' },
                { id: 7045, label: 'Tapa del tanque de gasolina y/o petróleo' },
                { id: 7046, label: 'Tapa de aceite motor' },
                { id: 7047, label: 'Gata hidráulica' },
                { id: 7048, label: 'Herramientas y palanca de ruedas' },
                { id: 7049, label: 'Cable, cadena y/o estrobo' },
                {
                    id: 7050,
                    label: 'Cable para transferencia de carga de batería',
                },
            ],
        },
    ],
    vehicleCrane: [
        {
            category: 'LUCES',
            items: [
                { id: 8001, label: 'Frontales' },
                {
                    id: 8002,
                    label: 'Direccionales delanteras de parqueo (Giro)',
                },
                { id: 8003, label: 'Direccionales traseras de parqueo (Giro)' },
                { id: 8004, label: 'De Stop y señal trasera' },
            ],
        },
        {
            category: 'CABINA',
            items: [
                { id: 8005, label: 'Drive Right' },
                { id: 8006, label: 'Espejo central' },
                { id: 8007, label: 'Espejos laterales' },
                { id: 8008, label: 'Alarma de retroceso' },
                { id: 8009, label: 'Pito' },
                { id: 8010, label: 'Freno de servicio' },
                { id: 8011, label: 'Freno de emergencia' },
                { id: 8012, label: 'Dirección /suspensión (terminales)' },
                { id: 8013, label: 'Cinturón de seguridad' },
                { id: 8014, label: 'Puertas en buen estado' },
                { id: 8015, label: 'Vidrio frontal (en buen estado)' },
                { id: 8016, label: 'Limpia brisas' },
                { id: 8017, label: 'Extintor de incendios (10 lbs)' },
                { id: 8018, label: 'Botiquín' },
                { id: 8019, label: 'Asientos en buenas condiciones' },
                { id: 8020, label: 'Indicadores (hidráulico-voltímetro)' },
            ],
        },
        {
            category: 'COMPARTIMIENTO DEL MOTOR',
            items: [
                {
                    id: 8021,
                    label: 'Nivel de fluidos (frenos, hidráulico, refrigerante, dirección)',
                },
                { id: 8022, label: 'Radiador' },
                { id: 8023, label: 'Estado de correas' },
                { id: 8024, label: 'Batería, cables, conexiones' },
            ],
        },
        {
            category: 'LLANTAS',
            items: [
                { id: 8025, label: 'Por lo menos 2mm de profundidad' },
                {
                    id: 8026,
                    label: 'Sin cortaduras profundas y sin abultamientos',
                },
            ],
        },
        {
            category: 'ESTADO MECÁNICO',
            items: [
                { id: 8027, label: 'Control de fugas hidráulicas' },
                { id: 8028, label: 'Caja de cambios en buen estado' },
                { id: 8029, label: 'Detectar olores o ruidos extraños' },
                { id: 8030, label: 'Tanque de combustible (verificar fugas)' },
                { id: 8031, label: 'Exosto (porosidad, ranuras)' },
            ],
        },
        {
            category: 'CARROCERÍA',
            items: [
                {
                    id: 8032,
                    label: 'Estado de la carpa (verificar amarres, y estado del tableado)',
                },
                {
                    id: 8033,
                    label: 'Diferencia verificar certificación estado de cadenas',
                },
                {
                    id: 8034,
                    label: 'Soporte de diferencial Verificar estado general',
                },
            ],
        },
        {
            category: 'SISTEMA DE ANCLAJE',
            items: [
                { id: 8035, label: 'Extensiones de gatos' },
                { id: 8036, label: 'Prueba gatos hidráulicos' },
                { id: 8037, label: 'Revisión fugas hidráulicas' },
                { id: 8038, label: 'Revisión mangueras y zapatas' },
            ],
        },
        {
            category: 'SISTEMA DE IZAJE',
            items: [
                { id: 8039, label: 'Prueba de mandos' },
                {
                    id: 8040,
                    label: 'Estructura del brazo articulado (fisuras golpes)',
                },
                { id: 8041, label: 'Gancho (desgaste y lengüeta)' },
                { id: 8042, label: 'Extensión brazo articulado' },
                { id: 8043, label: 'Cadena de servicio' },
                { id: 8044, label: 'Eslinga, cables, Grilletes y amarres' },
            ],
        },
        {
            category: 'ACCESORIOS',
            items: [
                { id: 8045, label: 'Polines y pads' },
                { id: 8046, label: 'Conos de señalización' },
                { id: 8047, label: 'Cajas de herramientas' },
            ],
        },
        {
            category: 'OTROS',
            items: [
                { id: 8048, label: 'Cadena cardán' },
                {
                    id: 8049,
                    label: 'Equipo de contingencia ambiental (pala, bolsa, aserrín)',
                },
            ],
        },
        {
            category: 'DOCUMENTOS',
            items: [
                { id: 8050, label: 'Calcomanía de servicio técnica' },
                { id: 8051, label: 'Tarjeta de propiedad' },
                { id: 8052, label: 'Seguro obligatorio' },
                { id: 8053, label: 'Licencia de conducción' },
            ],
        },
    ],
    vehicleTruck: [
        {
            category: 'SISTEMA DE LUCES',
            items: [
                { id: 9001, label: 'Luz delantera alta' },
                { id: 9002, label: 'Luz delantera baja' },
                { id: 9003, label: 'Luz intermitente delantera (direccional)' },
                { id: 9004, label: 'Luces de emergencia delantera' },
                { id: 9005, label: 'Luces neblineras' },
                { id: 9006, label: 'Luz posterior' },
                { id: 9007, label: 'Luz de freno posterior' },
                { id: 9008, label: 'Luz intermitente posterior (direccional)' },
                { id: 9009, label: 'Luz de emergencia posterior' },
                { id: 9010, label: 'Luz interior' },
                { id: 9011, label: 'Luz de faros piratas (2)' },
            ],
        },
        {
            category: 'ESTADO DE LLANTAS',
            items: [
                { id: 9012, label: 'Llanta delantera derecha' },
                { id: 9013, label: 'Llanta delantera izquierda' },
                { id: 9014, label: 'Llanta posterior derecha' },
                { id: 9015, label: 'Llanta posterior izquierda' },
                { id: 9016, label: 'Llanta de repuesto' },
            ],
        },
        {
            category: 'PARTE EXTERNA',
            items: [
                { id: 9017, label: 'Parabrisas delantera' },
                { id: 9018, label: 'Parabrisas posterior' },
                { id: 9019, label: 'Limpieza parabrisas' },
                { id: 9020, label: 'Sistema de agua bomba limpieza' },
                { id: 9021, label: 'Vidrio manubrio puerta derecha' },
                { id: 9022, label: 'Vidrio manubrio puerta izquierda' },
                { id: 9023, label: 'Espejo lateral derecho' },
                { id: 9024, label: 'Espejo lateral izquierdo' },
                { id: 9025, label: 'Cinta reflectiva' },
                { id: 9026, label: 'Circulina' },
                { id: 9027, label: 'Pértiga' },
            ],
        },
        {
            category: 'ACCESORIOS DE SEGURIDAD',
            items: [
                { id: 9028, label: 'Triángulo de seguridad (2)' },
                { id: 9029, label: 'Extintor' },
                { id: 9030, label: 'Alarma de retroceso' },
                { id: 9031, label: 'Claxon' },
                { id: 9032, label: 'Circulina' },
                { id: 9033, label: 'Tacos de seguridad (2)' },
            ],
        },
        {
            category: 'PARTE INTERNA',
            items: [
                {
                    id: 9034,
                    label: 'Estado de tablero / Indicadores operativos',
                },
                { id: 9035, label: 'Freno de mano' },
                { id: 9036, label: 'Freno de servicio' },
                { id: 9037, label: 'Cinturón de seguridad chofer' },
                { id: 9038, label: 'Cinturón de seguridad copiloto' },
                { id: 9039, label: 'Cinturón de seguridad asiento posterior' },
                { id: 9040, label: 'Espejo retrovisor antideslumbrante' },
                { id: 9041, label: 'Linterna de mano' },
                { id: 9042, label: 'Orden y limpieza de cabina' },
                { id: 9043, label: 'Dirección' },
            ],
        },
        {
            category: 'TAPAS Y OTROS',
            items: [
                { id: 9044, label: 'Tapa de radiador' },
                { id: 9045, label: 'Tapa del tanque de gasolina y/o petróleo' },
                { id: 9046, label: 'Tapa de aceite motor' },
                { id: 9047, label: 'Gata hidráulica' },
                { id: 9048, label: 'Herramientas y palanca de ruedas' },
                { id: 9049, label: 'Cable, cadena y/o estrobo' },
                {
                    id: 9050,
                    label: 'Cable para transferencia de carga de batería',
                },
            ],
        },
    ],
    vehicleVan: [
        {
            category: 'SISTEMA DE LUCES',
            items: [
                { id: 10001, label: 'Luz delantera alta' },
                { id: 10002, label: 'Luz delantera baja' },
                {
                    id: 10003,
                    label: 'Luz intermitente delantera (direccional)',
                },
                { id: 10004, label: 'Luces de emergencia delantera' },
                { id: 10005, label: 'Luces neblineras' },
                { id: 10006, label: 'Luz posterior' },
                { id: 10007, label: 'Luz de freno posterior' },
                {
                    id: 10008,
                    label: 'Luz intermitente posterior (direccional)',
                },
                { id: 10009, label: 'Luz de emergencia posterior' },
                { id: 10010, label: 'Luz interior' },
                { id: 10011, label: 'Luz de faros piratas (2)' },
            ],
        },
        {
            category: 'ESTADO DE LLANTAS',
            items: [
                { id: 10012, label: 'Llanta delantera derecha' },
                { id: 10013, label: 'Llanta delantera izquierda' },
                { id: 10014, label: 'Llanta posterior derecha' },
                { id: 10015, label: 'Llanta posterior izquierda' },
                { id: 10016, label: 'Llanta de repuesto' },
            ],
        },
        {
            category: 'PARTE EXTERNA',
            items: [
                { id: 10017, label: 'Parabrisas delantera' },
                { id: 10018, label: 'Parabrisas posterior' },
                { id: 10019, label: 'Limpieza parabrisas' },
                { id: 10020, label: 'Sistema de agua bomba limpieza' },
                { id: 10021, label: 'Vidrio manubrio puerta derecha' },
                { id: 10022, label: 'Vidrio manubrio puerta izquierda' },
                { id: 10023, label: 'Espejo lateral derecho' },
                { id: 10024, label: 'Espejo lateral izquierdo' },
                { id: 10025, label: 'Cinta reflectiva' },
                { id: 10026, label: 'Circulina' },
                { id: 10027, label: 'Pértiga' },
            ],
        },
        {
            category: 'ACCESORIOS DE SEGURIDAD',
            items: [
                { id: 10028, label: 'Triángulo de seguridad (2)' },
                { id: 10029, label: 'Extintor' },
                { id: 10030, label: 'Alarma de retroceso' },
                { id: 10031, label: 'Claxon' },
                { id: 10032, label: 'Circulina' },
                { id: 10033, label: 'Tacos de seguridad (2)' },
            ],
        },
        {
            category: 'PARTE INTERNA',
            items: [
                {
                    id: 10034,
                    label: 'Estado de tablero / Indicadores operativos',
                },
                { id: 10035, label: 'Freno de mano' },
                { id: 10036, label: 'Freno de servicio' },
                { id: 10037, label: 'Cinturón de seguridad chofer' },
                { id: 10038, label: 'Cinturón de seguridad copiloto' },
                { id: 10039, label: 'Cinturón de seguridad asiento posterior' },
                { id: 10040, label: 'Espejo retrovisor antideslumbrante' },
                { id: 10041, label: 'Linterna de mano' },
                { id: 10042, label: 'Orden y limpieza de cabina' },
                { id: 10043, label: 'Dirección' },
            ],
        },
        {
            category: 'TAPAS Y OTROS',
            items: [
                { id: 10044, label: 'Tapa de radiador' },
                {
                    id: 10045,
                    label: 'Tapa del tanque de gasolina y/o petróleo',
                },
                { id: 10046, label: 'Tapa de aceite motor' },
                { id: 10047, label: 'Gata hidráulica' },
                { id: 10048, label: 'Herramientas y palanca de ruedas' },
                { id: 10049, label: 'Cable, cadena y/o estrobo' },
                {
                    id: 10050,
                    label: 'Cable para transferencia de carga de batería',
                },
            ],
        },
    ],
    vehicleVanFur: [
        {
            category: 'SISTEMA DE LUCES',
            items: [
                { id: 11001, label: 'Luz delantera alta' },
                { id: 11002, label: 'Luz delantera baja' },
                {
                    id: 11003,
                    label: 'Luz intermitente delantera (direccional)',
                },
                { id: 11004, label: 'Luces de emergencia delantera' },
                { id: 11005, label: 'Luces neblineras' },
                { id: 11006, label: 'Luz posterior' },
                { id: 11007, label: 'Luz de freno posterior' },
                {
                    id: 11008,
                    label: 'Luz intermitente posterior (direccional)',
                },
                { id: 11009, label: 'Luz de emergencia posterior' },
                { id: 11010, label: 'Luz interior' },
                { id: 11011, label: 'Luz de faros piratas (2)' },
            ],
        },
        {
            category: 'ESTADO DE LLANTAS',
            items: [
                { id: 11012, label: 'Llanta delantera derecha' },
                { id: 11013, label: 'Llanta delantera izquierda' },
                { id: 11014, label: 'Llanta posterior derecha' },
                { id: 11015, label: 'Llanta posterior izquierda' },
                { id: 11016, label: 'Llanta de repuesto' },
            ],
        },
        {
            category: 'PARTE EXTERNA',
            items: [
                { id: 11017, label: 'Parabrisas delantera' },
                { id: 11018, label: 'Parabrisas posterior' },
                { id: 11019, label: 'Limpieza parabrisas' },
                { id: 11020, label: 'Sistema de agua bomba limpieza' },
                { id: 11021, label: 'Vidrio manubrio puerta derecha' },
                { id: 11022, label: 'Vidrio manubrio puerta izquierda' },
                { id: 11023, label: 'Espejo lateral derecho' },
                { id: 11024, label: 'Espejo lateral izquierdo' },
                { id: 11025, label: 'Cinta reflectiva' },
                { id: 11026, label: 'Circulina' },
                { id: 11027, label: 'Pértiga' },
            ],
        },
        {
            category: 'ACCESORIOS DE SEGURIDAD',
            items: [
                { id: 11028, label: 'Triángulo de seguridad (2)' },
                { id: 11029, label: 'Extintor' },
                { id: 11030, label: 'Alarma de retroceso' },
                { id: 11031, label: 'Claxon' },
                { id: 11032, label: 'Circulina' },
                { id: 11033, label: 'Tacos de seguridad (2)' },
            ],
        },
        {
            category: 'PARTE INTERNA',
            items: [
                {
                    id: 11034,
                    label: 'Estado de tablero / Indicadores operativos',
                },
                { id: 11035, label: 'Freno de mano' },
                { id: 11036, label: 'Freno de servicio' },
                { id: 11037, label: 'Cinturón de seguridad chofer' },
                { id: 11038, label: 'Cinturón de seguridad copiloto' },
                { id: 11039, label: 'Cinturón de seguridad asiento posterior' },
                { id: 11040, label: 'Espejo retrovisor antideslumbrante' },
                { id: 11041, label: 'Linterna de mano' },
                { id: 11042, label: 'Orden y limpieza de cabina' },
                { id: 11043, label: 'Dirección' },
            ],
        },
        {
            category: 'TAPAS Y OTROS',
            items: [
                { id: 11044, label: 'Tapa de radiador' },
                {
                    id: 11045,
                    label: 'Tapa del tanque de gasolina y/o petróleo',
                },
                { id: 11046, label: 'Tapa de aceite motor' },
                { id: 11047, label: 'Gata hidráulica' },
                { id: 11048, label: 'Herramientas y palanca de ruedas' },
                { id: 11049, label: 'Cable, cadena y/o estrobo' },
                {
                    id: 11050,
                    label: 'Cable para transferencia de carga de batería',
                },
            ],
        },
        {
            category: 'TERMOKING',
            items: [
                { id: 11051, label: 'Motor del Thermo King' },
                { id: 11052, label: 'Nivel y estado del aceite' },
                { id: 11053, label: 'Nivel de refrigerante' },
                {
                    id: 11054,
                    label: 'Estado de filtros (aceite, aire y combustible)',
                },
                { id: 11055, label: 'Ruidos o vibraciones anormales' },
                {
                    id: 11056,
                    label: 'Presiones de succión y descarga correctas',
                },
                { id: 11057, label: 'Sistema eléctrico' },
                { id: 11058, label: 'Estado de batería, cables y conexiones' },
                { id: 11059, label: 'Funcionamiento del alternador' },
                { id: 11060, label: 'Tablero de control y alarmas' },
            ],
        },
        {
            category: 'Aspectos de refrigeración',
            items: [
                { id: 11061, label: 'Prueba de frío' },
                {
                    id: 11062,
                    label: 'Capacidad para alcanzar la temperatura programada',
                },
                { id: 11063, label: 'Tiempos de enfriamiento' },
                { id: 11064, label: 'Estabilidad térmica' },
                {
                    id: 11065,
                    label: 'Mantenimiento de la temperatura durante el viaje',
                },
                { id: 11066, label: 'Verificación de variaciones bruscas' },
                { id: 11067, label: 'Evaporador y condensador' },
                { id: 11068, label: 'Limpieza y estado de aletas' },
                { id: 11069, label: 'Funcionamiento de ventiladores' },
                { id: 11070, label: 'Sensores y termostatos' },
                { id: 11071, label: 'Calibración correcta' },
                {
                    id: 11072,
                    label: 'Coherencia entre temperatura real y la mostrada en el panel',
                },
            ],
        },
    ],
    vehicleTractor: [
        {
            category: 'PARTE DELANTERA',
            items: [
                { id: 12001, label: 'Estado de varillaje de dirección' },
                { id: 12002, label: 'Estado del cilindro de dirección' },
                { id: 12003, label: 'Estado de llantas' },
            ],
        },
        {
            category: 'PARTE IZQUIERDA',
            items: [
                { id: 12004, label: 'Estado de tornamesa' },
                { id: 12005, label: 'Estado de mando de círculo de giro' },
                { id: 12006, label: 'Hoja topadora' },
                {
                    id: 12007,
                    label: 'Estado del cilindro de desplazamiento de la cuchilla',
                },
            ],
        },
        {
            category: 'PARTE IZQUIERDA INFERIOR',
            items: [
                { id: 12008, label: 'Estado del cilindro de articulación' },
                { id: 12009, label: 'Estado de mangueras' },
            ],
        },
        {
            category: 'PARTE IZQUIERDA POSTERIOR',
            items: [
                { id: 12010, label: 'Compresor' },
                { id: 12011, label: 'Base y filtro de aceite' },
                { id: 12012, label: 'Nivel de aceite de motor' },
                { id: 12013, label: 'Estado de llantas' },
            ],
        },
        {
            category: 'PARTE POSTERIOR',
            items: [
                { id: 12014, label: 'Estado de cilindros de levante' },
                {
                    id: 12015,
                    label: 'Estado de uñas del ripper o decalificador',
                },
                { id: 12016, label: 'Estado de radiador' },
            ],
        },
        {
            category: 'PARTE DERECHA POSTERIOR',
            items: [
                { id: 12017, label: 'Estado de base y filtros' },
                { id: 12018, label: 'Estado de llantas' },
            ],
        },
        {
            category: 'PARTE DERECHA INFERIOR',
            items: [
                { id: 12019, label: 'Estado del cilindro de dirección' },
                { id: 12020, label: 'Estado de mangueras' },
            ],
        },
        {
            category: 'CABINA',
            items: [
                { id: 12021, label: 'Estado de palancas' },
                { id: 12022, label: 'Estado de freno de parqueo' },
                { id: 12023, label: 'Estado de claxon' },
                { id: 12024, label: 'Estado de parabrisas' },
                { id: 12025, label: 'Estado de escaleras' },
            ],
        },
        {
            category: 'INSPECCIONES VARIAS',
            items: [
                { id: 12026, label: 'Estado de circulina' },
                { id: 12027, label: 'Estado de luces' },
                { id: 12028, label: 'Estado de alarma de retroceso' },
                { id: 12029, label: 'Estado de extintor' },
                { id: 12030, label: 'Estado de luces' },
            ],
        },
    ],
    vehicleUtilitarian: [
        {
            category: 'VERIFICACIONES',
            items: [
                { id: 13001, label: 'Verificar cualquier daño al equipo' },
                {
                    id: 13002,
                    label: 'Verificar que los pernos, tuercas, tornillos estén firmemente ajustados',
                },
                {
                    id: 13003,
                    label: 'Chequeo de pines, pasadores, bocinas, rajaduras, fisuras',
                },
            ],
        },
        {
            category: 'NIVELES',
            items: [
                { id: 13004, label: 'Nivel de aceite de motor' },
                { id: 13005, label: 'Nivel de combustible' },
                { id: 13006, label: 'Nivel de refrigerante' },
                { id: 13007, label: 'Nivel de aceite del tanque hidráulico' },
                { id: 13008, label: 'Nivel de aceite depósito de freno' },
            ],
        },
        {
            category: 'FILTROS Y COMPONENTES',
            items: [
                { id: 13009, label: 'Filtros de admisión de aire' },
                { id: 13010, label: 'Fajas de ventilador alternador' },
                {
                    id: 13011,
                    label: 'Manómetro de succión de la bomba de carga de transmisión',
                },
            ],
        },
        {
            category: 'FUGAS Y COMPONENTES MECÁNICOS',
            items: [
                { id: 13012, label: 'Fuga por diferenciales y planetarios' },
                { id: 13013, label: 'Fugas de aceite' },
            ],
        },
        {
            category: 'FRENO Y SISTEMAS HIDRÁULICOS',
            items: [
                { id: 13014, label: 'Pistón de freno de parqueo' },
                { id: 13015, label: 'Freno de servicio' },
                { id: 13016, label: 'Engrasador automático y graseras' },
                { id: 13017, label: 'Engrasadora manual' },
                {
                    id: 13018,
                    label: 'Engrase de martillo, superficie de deslizamiento telescópico, articulación central y tornamesa',
                },
            ],
        },
        {
            category: 'ALARMA Y SONIDOS',
            items: [
                { id: 13019, label: 'Alarma de retroceso' },
                { id: 13020, label: 'Claxon' },
                { id: 13021, label: 'Faros' },
            ],
        },
        {
            category: 'ACCESORIOS Y COMPONENTES ADICIONALES',
            items: [
                { id: 13022, label: 'Circulina' },
                { id: 13023, label: 'Instrumentos de tableros' },
                { id: 13024, label: 'Batería y terminales' },
                { id: 13025, label: 'Cinturón de seguridad' },
                { id: 13026, label: 'Extintor' },
            ],
        },
    ],
    vehicleForklift: [
        {
            category: 'EXTERIOR',
            items: [
                { id: 14001, label: 'Espejos laterales' },
                { id: 14002, label: 'Luces traseras' },
                { id: 14003, label: 'Alarma de reversa' },
                { id: 14004, label: 'Extintor de incendio' },
                { id: 14005, label: 'Llantas' },
                { id: 14006, label: 'Placa de montacargas' },
                { id: 14007, label: 'Cilindros de elevación e inclinación' },
                { id: 14008, label: 'Montura de los cilindros' },
                { id: 14009, label: 'Indicadores luces frontales altas' },
                { id: 14010, label: 'Indicadores luces direccionales' },
                { id: 14011, label: 'Lámparas luces delanteras' },
                { id: 14012, label: 'Indicador luces de parqueo' },
                { id: 14013, label: 'Cuchillas de levante' },
                { id: 14014, label: 'Tanque de combustible' },
            ],
        },
        {
            category: 'COMPARTIMIENTO DEL MOTOR',
            items: [
                { id: 14015, label: 'Fuente de energía' },
                { id: 14016, label: 'Conexiones eléctricas' },
                { id: 14017, label: 'Nivel agua refrigeración / mangueras' },
                { id: 14018, label: 'Estado de las líneas hidráulicas' },
                { id: 14019, label: 'Niveles de aceite motor / hidráulico' },
                { id: 14020, label: 'Cableado eléctrico' },
                { id: 14021, label: 'Botella de dirección / Nivel aceite' },
            ],
        },
        {
            category: 'INTERIOR DE LA CABINA',
            items: [
                { id: 14022, label: 'Espejos retrovisor interior' },
                { id: 14023, label: 'Vidrio parabrisas / vidrios ventanas' },
                {
                    id: 14024,
                    label: 'Plumillas limpiavidrios / motor lavaparabrisas',
                },
                { id: 14025, label: 'Estado de la cabina del operador' },
                { id: 14026, label: 'Indicador de combustible' },
                { id: 14027, label: 'Indicador presión de aceite motor' },
                { id: 14028, label: 'Sillas / Apoyo para la cabeza' },
                { id: 14029, label: 'Pedales freno / clutch / acelerador' },
                { id: 14030, label: 'Alarma de retroceso' },
                { id: 14031, label: 'Equipo de carretera' },
                { id: 14032, label: 'Cinturones de seguridad' },
                { id: 14033, label: 'Pito' },
                { id: 14034, label: 'Timón o volante' },
                { id: 14035, label: 'Frenos' },
                { id: 14036, label: 'Horómetro' },
            ],
        },
    ],
};

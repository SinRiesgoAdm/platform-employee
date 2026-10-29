import type { QuestionProgram } from '@/shared/components/questions/constants/questions.ts';

export const PREVENTIVE_ANSWER_OPTIONS = ['Si', 'No', 'A veces', 'Casi Nunca'];

export const ALCOHOL_TOLERANCE_QUESTIONS: QuestionProgram[] = [
    {
        id: 1,
        idQuestionShow: 1,
        session: 1,
        question: '¿Consume alcohol al momento de conducir?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 2,
        idQuestionShow: 2,
        session: 1,
        question: '¿Cree usted que el alcohol ayuda a hacer amigos?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 3,
        idQuestionShow: 3,
        session: 1,
        question:
            '¿Está de acuerdo con quien dice que en la vida hay que probar de todo, incluyendo las drogas?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 4,
        idQuestionShow: 4,
        session: 1,
        question:
            '¿Considera el tabaco como una droga tan peligrosa como cualquier otra?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 5,
        idQuestionShow: 5,
        session: 1,
        question: '¿Cree usted que beber alcohol es algo normal en la gente?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 6,
        idQuestionShow: 6,
        session: 1,
        question:
            '¿Está de acuerdo con que fumar tabaco y consumir alcohol ayuda a parecer más maduro?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 7,
        idQuestionShow: 7,
        session: 1,
        question: '¿Considera que quien prueba las drogas acaba lamentándolo?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 8,
        idQuestionShow: 8,
        session: 1,
        question: '¿Le parece que consumir drogas es divertido?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 9,
        idQuestionShow: 9,
        session: 1,
        question: '¿Probar drogas es perder el control de su vida?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 10,
        idQuestionShow: 10,
        session: 1,
        question: '¿Cree usted que el alcohol ayuda a superar los problemas?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 11,
        idQuestionShow: 11,
        session: 1,
        question: '¿Considera que los adolescentes deberían probar las drogas?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 12,
        idQuestionShow: 12,
        session: 1,
        question: '¿Cree usted que beber mucho alcohol es signo de fortaleza?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 13,
        idQuestionShow: 13,
        session: 1,
        question:
            '¿Piensa usted que para llevar una vida sana es esencial no fumar cigarrillos?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 14,
        idQuestionShow: 14,
        session: 1,
        question:
            '¿Está de acuerdo con que beber alcohol solo los fines de semana también es perjudicial para la salud?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 15,
        idQuestionShow: 15,
        session: 1,
        question:
            '¿Considera peligroso para su salud probar las drogas alucinógenas?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
    {
        id: 16,
        idQuestionShow: 16,
        session: 1,
        question: '¿Consume bebidas con alcohol si va a conducir?',
        options: PREVENTIVE_ANSWER_OPTIONS,
    },
];

interface QuestionSeed {
    id: number;
    question: string;
}

const toQuestionPrograms = (
    seeds: QuestionSeed[],
    session = 1,
    showOffset = 0,
): QuestionProgram[] =>
    seeds.map((seed, index) => ({
        ...seed,
        idQuestionShow: showOffset + index + 1,
        session,
        options: PREVENTIVE_ANSWER_OPTIONS,
    }));

const PREVENTION_SESSION_1: QuestionSeed[] = [
    {
        id: 51,
        question:
            '¿Usted hace uso del cinturón de seguridad al operar un vehículo motorizado?',
    },
    {
        id: 52,
        question:
            '¿Observa y toma precauciones de las condiciones adversas del clima antes y durante la conducción?',
    },
    {
        id: 53,
        question: '¿Aplica normas de seguridad en la conducción del vehículo?',
    },
    {
        id: 54,
        question:
            '¿Toma precauciones en las condiciones e irregularidades de las carreteras?',
    },
    {
        id: 55,
        question:
            '¿Identifica la política el uso del cinturón de seguridad mientras se conduce un vehículo motorizado?',
    },
    {
        id: 56,
        question:
            '¿Identifica el compromiso en uso de aparatos electrónicos para hacer llamadas, enviar mensajes de texto, mientras se conduce un vehículo motorizado?',
    },
];

const PREVENTION_SESSION_2: QuestionSeed[] = [
    { id: 57, question: 'Fumar' },
    { id: 58, question: 'Leer' },
    { id: 59, question: 'Aplicarse Maquillaje' },
    { id: 60, question: 'Aseo Personal' },
    { id: 61, question: 'Alcanzar Objetos' },
    { id: 62, question: 'Hablar por Teléfono' },
    { id: 63, question: 'Chatear' },
    { id: 64, question: 'Revisar Redes Sociales' },
    { id: 65, question: 'Enfocarse en un Pasajero' },
    { id: 66, question: 'Comer' },
    { id: 67, question: 'Sintonizar la Radio' },
    {
        id: 68,
        question: 'Ver Peliculas o Videos en cualquier tipo de pantalla',
    },
];

export const PREVENTION_QUESTIONS_SESSION_1 = toQuestionPrograms(
    PREVENTION_SESSION_1,
    1,
);

export const PREVENTION_QUESTIONS_SESSION_2 = toQuestionPrograms(
    PREVENTION_SESSION_2,
    2,
    PREVENTION_SESSION_1.length,
);

export const PROTECTION_ACTOR_QUESTIONS = toQuestionPrograms([
    {
        id: 17,
        question:
            '¿Siempre realiza inspeción del vehículo antes de iniciar la marcha?',
    },
    {
        id: 18,
        question:
            '¿En caso de detectar fallas en el vehiculo detiene operación y avisa a la empresa?',
    },
    { id: 19, question: '¿Acomoda los espejos antes de inciar recorrido?' },
    {
        id: 20,
        question:
            '¿Se coloca siempre el cinturón al iniciar y durante todo el recorrido?',
    },
    {
        id: 21,
        question:
            '¿Mira por los espejos retrovisor o laterales para asegurarse antes de hacer maniobras adelantamiento, cruce y paradas?',
    },
    {
        id: 22,
        question:
            '¿Usa luces medias en el recorrido para hacerse visible en la via?',
    },
    {
        id: 23,
        question:
            '¿Siempres cierra puerta antes de iniciar y durante el recorrido?',
    },
    {
        id: 24,
        question:
            '¿Al arrancar o detener la marcha del vehiculo lo realiza con suavidad?',
    },
    { id: 25, question: '¿Mantiene las dos manos en el volante al conducir?' },
    {
        id: 26,
        question:
            '¿Toma el volante derecho con las dos manos? (posición de 10 para las 2 en el reloj)',
    },
    {
        id: 27,
        question:
            '¿Conoce las diferentes señales de trànsito y su clasificacion?',
    },
    {
        id: 28,
        question:
            '¿Respeta los lìmitesde velocidad? ( carretera autopista 80 km/h , en vías urbanas 60 km/h y en zonas escolares y residenciales es de 30 kms /h. )',
    },
    {
        id: 29,
        question:
            '¿Sin obstaculos en la via, circula siempre por el carril derecho?',
    },
    {
        id: 30,
        question:
            '¿Recoge y deja los pasajeros siempre en los paraderos y en los andenes?',
    },
    {
        id: 31,
        question:
            '¿Utiliza siempre luces direccionales para salir o entrar a la vía, al arrancar o cambiar de carril?',
    },
    {
        id: 32,
        question:
            '¿Coloca luces direccionales con anticipación al giro , entrada o salida de la vía mìnimo 60 metros antes?',
    },
    {
        id: 33,
        question:
            '¿Coloca luces estacionarias con anticipación a la parada mínimo 60 metros antes?',
    },
    {
        id: 34,
        question:
            '¿Adelanta en sitios permitido y teniendo en cuenta la linea amarilla?',
    },
    { id: 35, question: '¿Estaciona solo en sitios permitidos?' },
    { id: 36, question: '¿Se detiene cuando el semaforo esta en amarillo?' },
    {
        id: 37,
        question:
            '¿Siempre cruza cuando el semaforo en verde para reiniciar la marcha?',
    },
    {
        id: 38,
        question:
            '¿Disminuye la velocidad y mira ambos lados antes de ingresar a la intersección?',
    },
    {
        id: 39,
        question:
            '¿Detiene completamente el vehiculo ante una señal de pare o al llegar a una intersección?',
    },
    {
        id: 40,
        question:
            '¿El conductor mantiene la distancia de seguridad con el vehìculo? (regla de 3 segundos)',
    },
    {
        id: 41,
        question: '¿Respeta las cebras , los pasos peatonales y al peatón?',
    },
    {
        id: 42,
        question:
            '¿Espera pacientemente ante obstáculos en la vìa o trancones?',
    },
    {
        id: 43,
        question:
            '¿Cede el paso en una intersección teniendo en cuenta el concepto de prelación?',
    },
    {
        id: 44,
        question:
            '¿Respeta a otros conductoresy demuestra comportamientos de cortesía y solidaridad?',
    },
    {
        id: 45,
        question: '¿Mantiene conversación con personas mientras conduce?',
    },
    {
        id: 46,
        question:
            '¿Para responder o hablar por el celular o radio teléfono se estaciona?',
    },
    {
        id: 47,
        question:
            '¿Como conductor siempre mantiene la visión y atención en la vía?',
    },
    {
        id: 48,
        question:
            'Ante situaciones de lluvia fuerte,granizada, niebla , tormentas elèctrica, ¿desciende la velocidad y en caso de baja visibildiad, se detiene en un lugar seguro?',
    },
    {
        id: 49,
        question:
            '¿Toma actitud positiva y de cambio ante observaciones o comportamientos negativos?',
    },
    {
        id: 50,
        question:
            '¿Mantiene los elementos de protección? ( guantes, chaleco reflectivo , impermeable)',
    },
]);

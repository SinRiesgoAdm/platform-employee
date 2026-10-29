export const API_ERROR_MESSAGES: Record<string, string> = {
    EMPLOYEE_NOT_FOUND: 'El empleado solicitado no existe en el sistema.',
    EMPLOYEE_WITHOUT_EPS: 'El empleado no tiene una EPS asignada.',
    DATABASE_ERROR: 'Ocurrió un error al procesar los datos.',
    INTERNAL_SERVER_ERROR: 'Error interno en el servidor. Intente más tarde.',
    TOKEN_EXPIRED: 'Su sesión ha expirado. Por favor, ingrese de nuevo.',
    TOKEN_INVALID: 'Sesión no válida.',
    UNAUTHORIZED: 'No tiene permisos para realizar esta acción.',
    STORAGE_ERROR: 'Error al procesar o almacenar el archivo.',
    INVALID_FILE: 'El archivo proporcionado no es válido.',
    INVALID_DEVICE:
        'No se pudo registrar este dispositivo para notificaciones.',
    PUSH_DISABLED:
        'Las notificaciones aún no están habilitadas en el servidor.',
};

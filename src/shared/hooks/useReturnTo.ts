// Ruta a la que volver después del login. ProtectedRoute la guarda en
// el state de /login: así un acceso rápido del ícono (/trainnings) o el
// clic en una notificación no terminan en el dashboard si la sesión
// había vencido.

import { useLocation, type Location } from 'react-router';

export const useReturnTo = () => {
    const location = useLocation();
    const from = (location.state as { from?: Location } | null)?.from;

    return from ? from.pathname + from.search : '/';
};

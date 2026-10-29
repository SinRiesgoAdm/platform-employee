// Primero: captura `beforeinstallprompt` aunque llegue antes que React
import '@/shared/pwa/install-prompt.ts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/geist';
import '@fontsource-variable/geist-mono';
import './index.css';
import EmployeeApp from '@/EmployeeApp.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <EmployeeApp />
    </StrictMode>,
);

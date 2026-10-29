# React Project Guidelines

## Rol

Actúa como un **Senior React Engineer**.

Todo el código que escribas debe estar orientado a:

* Producción.
* Mantenibilidad.
* Escalabilidad.
* Buen rendimiento.
* Tipado seguro.
* Simplicidad.
* Separación clara de responsabilidades.

No te limites a ejecutar literalmente una propuesta si consideras que existe una solución técnicamente mejor. **Evalúa el enfoque, explica brevemente el problema y propón la alternativa correcta.**

Evita soluciones innecesariamente complejas. La optimización debe estar justificada por el caso de uso y no por micro-optimizaciones prematuras.

---

# Stack principal

El proyecto utiliza principalmente:

* React
* TypeScript
* shadcn/ui
* Tailwind CSS
* TanStack Query
* React Hook Form
* React Router
* Axios

Debes respetar las tecnologías y patrones existentes del proyecto antes de introducir nuevas dependencias.

**No agregues librerías nuevas si el problema puede resolverse correctamente con las herramientas existentes.**

---

# Arquitectura

La aplicación utiliza una arquitectura basada en **features/modules**.

La estructura principal es:

```text
/
├── router/
├── features/
└── shared/
```

---

## Router

La carpeta:

```text
/router
```

contiene **todas las rutas de la aplicación**.

Las rutas deben permanecer centralizadas aquí.

Las páginas y componentes de los módulos no deben registrar rutas directamente salvo que exista una razón arquitectónica explícita.

---

# Features

La carpeta:

```text
/features
```

contiene todos los módulos funcionales de la aplicación.

Cada feature debe encapsular su propia lógica y evitar dependencias innecesarias con otros módulos.

Una estructura típica es:

```text
features/
└── users/
    ├── actions/
    ├── pages/
    ├── components/
    ├── constants/
    ├── hooks/
    └── types/
```

No es obligatorio crear todas las carpetas en todos los módulos.

**Solo crea una carpeta cuando realmente sea necesaria.**

---

## actions

La carpeta:

```text
actions/
```

contiene las comunicaciones HTTP con el backend.

Se utiliza:

```text
Axios
```

para realizar las peticiones.

Ejemplo:

```text
features/users/actions/
├── get-users.ts
├── create-user.ts
└── update-user.ts
```

Las acciones deben encargarse de la comunicación con la API y no de la lógica de presentación.

Evita colocar llamadas HTTP directamente dentro de componentes o páginas.

---

## pages

La carpeta:

```text
pages/
```

contiene las páginas que serán renderizadas por React Router.

Las páginas deben encargarse principalmente de **componer la interfaz y coordinar los componentes y hooks del módulo**.

Evita convertir una página en un componente monolítico.

Si una página comienza a acumular demasiada lógica o UI, divide responsabilidades en componentes, hooks o utilidades apropiadas.

cualquier page que se haga si requiere una llamada a la api se debe utilizar el componente QueryState

---

## components

La carpeta:

```text
components/
```

contiene componentes reutilizables **dentro del módulo**.

Ejemplo:

```text
features/users/components/
├── user-form.tsx
├── user-table.tsx
└── user-filters.tsx
```

Un componente debe permanecer dentro del feature mientras su reutilización esté limitada a ese dominio.

Si un componente realmente comienza a ser utilizado por diferentes features y es suficientemente genérico, evalúa moverlo a:

```text
/shared
```

No muevas componentes a `shared` prematuramente.

---

## constants

La carpeta:

```text
constants/
```

contiene constantes específicas del módulo.

Ejemplos:

* Estados.
* Configuraciones.
* Opciones de formularios.
* Valores estáticos.
* Configuraciones propias del dominio.

No utilices `constants` como un lugar genérico para guardar cualquier valor.

---

## hooks

La carpeta:

```text
hooks/
```

contiene hooks específicos del módulo.

Especialmente:

* TanStack Query.
* Lógica reutilizable del módulo.
* Estado derivado.
* Integraciones entre acciones y UI.

Las operaciones de fetching/mutations utilizando TanStack Query deben abstraerse mediante hooks cuando esto mejore la separación de responsabilidades.

Ejemplo:

```text
features/users/hooks/
├── use-users.ts
├── use-create-user.ts
└── use-update-user.ts
```

La comunicación debe seguir una separación similar a:

```text
Component
    ↓
Hook
    ↓
Action
    ↓
Axios
    ↓
API
```

El componente no debería conocer los detalles de Axios ni de la implementación HTTP.

---

## types

La carpeta:

```text
types/
```

contiene los tipos TypeScript específicos del módulo.

Aquí deben ubicarse los tipos relacionados con:

* Request.
* Response.
* Entidades del módulo.
* Props complejas.
* DTOs.
* Estados específicos del dominio.

Prioriza tipos explícitos y seguros.

Evita:

```ts
any
```

salvo que exista una razón técnica realmente justificada.

Cuando sea posible, utiliza tipos compartidos para evitar duplicación entre requests, responses y componentes.

---

# Shared

La carpeta:

```text
/shared
```

contiene componentes y utilidades que realmente son reutilizables **en diferentes partes de toda la aplicación**.

Ejemplos:

* Buttons.
* Inputs.
* Modals.
* Dialogs.
* Tables genéricas.
* Componentes de UI.
* Layouts.
* Utilidades globales.

Ejemplo:

```text
shared/
├── components/
├── hooks/
├── utils/
└── types/
```

No coloques algo en `shared` simplemente porque "podría reutilizarse algún día".

La regla es:

> **Primero pertenece al feature. Se mueve a shared cuando existe una necesidad real de reutilización transversal.**

---

# React

Escribe React siguiendo buenas prácticas modernas.

Prioridades:

1. Componentes pequeños y enfocados.
2. Separación de responsabilidades.
3. Composición sobre componentes gigantes.
4. Props claras y tipadas.
5. Evitar lógica duplicada.
6. Evitar estado innecesario.
7. Evitar efectos secundarios innecesarios.
8. Mantener la lógica de negocio fuera de la UI cuando corresponda.

No utilices `useEffect` para solucionar problemas que puedan resolverse mediante:

* Renderizado derivado.
* Event handlers.
* TanStack Query.
* Estado local.
* Memoización cuando realmente sea necesaria.

No utilices `useMemo` o `useCallback` indiscriminadamente.

La optimización debe hacerse cuando existe una razón real.

---

# TanStack Query

TanStack Query debe utilizarse para manejar el **server state**.

Evita almacenar manualmente en `useState` datos que pertenecen al servidor cuando TanStack Query pueda gestionarlos correctamente.

Utiliza adecuadamente:

* Queries.
* Mutations.
* Query keys.
* Invalidación de queries.
* Cache.
* Loading states.
* Error states.

Las query keys deben ser consistentes y predecibles.

Evita duplicar la misma información del servidor en múltiples estados locales sin una razón clara.

---

# React Hook Form

Para formularios utiliza:

```text
React Hook Form
```

Evita controlar manualmente formularios complejos mediante múltiples `useState`.

Cuando sea necesario validar formularios, utiliza el mecanismo de validación ya establecido por el proyecto.

Los formularios deben manejar correctamente:

* Validación.
* Errores.
* Loading/submission state.
* Reset.
* Valores iniciales.

---

# React Router

Las rutas deben mantenerse en:

```text
/router
```

Los módulos no deben duplicar la configuración de routing.

Las páginas deben estar preparadas para ser utilizadas por React Router sin acoplar innecesariamente la lógica de negocio al sistema de navegación.

---

# shadcn/ui

Cuando exista un componente equivalente disponible en shadcn/ui, **prioriza su utilización antes de crear un componente desde cero**.

Personaliza los componentes mediante las capacidades existentes de:

* shadcn/ui.
* Tailwind CSS.
* composición de componentes.

Evita duplicar componentes de UI que ya existen en el proyecto.

---

# Tailwind CSS

Utiliza Tailwind CSS para los estilos.

Prioriza:

* Clases claras.
* Consistencia con el diseño existente.
* Reutilización mediante componentes.
* Responsive design.

Evita introducir CSS personalizado cuando Tailwind pueda resolver correctamente el problema.

No abuses de clases extremadamente largas y difíciles de mantener. Si una composición de UI se repite, considera crear un componente apropiado.

---

# Axios

Axios debe estar encapsulado en la capa de `actions`.

Evita realizar directamente:

```ts
axios.get(...)
axios.post(...)
```

desde componentes, páginas o hooks de UI.

La responsabilidad debe estar separada:

```text
UI
 ↓
Hook
 ↓
Action
 ↓
Axios
 ↓
Backend
```

---

# Performance

Todo código nuevo debe considerar el rendimiento, pero evitando micro-optimizaciones prematuras.

Prioriza:

* Evitar renders innecesarios.
* Evitar requests duplicados.
* Aprovechar correctamente el cache de TanStack Query.
* Evitar estados redundantes.
* Lazy loading cuando aporte un beneficio real.
* Componentes correctamente divididos.
* Evitar cálculos costosos durante el render.

No agregues `memo`, `useMemo` o `useCallback` simplemente por costumbre.

Cada optimización debe tener una razón técnica.

---

# TypeScript

El código debe ser fuertemente tipado.

Evita:

```ts
any
```

y evita utilizar casts innecesarios:

```ts
as SomeType
```

No ocultes errores de tipado mediante casts.

Prefiere modelar correctamente los tipos.

Los tipos deben representar correctamente los datos reales enviados y recibidos por la API.

---

# Manejo de errores

Las operaciones que puedan fallar deben contemplar correctamente:

* Loading.
* Success.
* Error.
* Empty states.

No ocultes errores silenciosamente.

Los errores del backend deben transformarse en una experiencia útil para el usuario cuando corresponda.

---

# Seguridad

Nunca:

* Expongas secretos en el frontend.
* Hardcodees API keys privadas.
* Confíes en validaciones exclusivamente del frontend.
* Guardes información sensible innecesariamente.
* Asumas que los datos provenientes del cliente son confiables.

El frontend valida para mejorar la experiencia; **la seguridad y validación real deben existir en el backend**.

---

# Código de producción

Todo código generado debe estar preparado para producción.

Antes de entregar código verifica mentalmente:

* ¿Está correctamente tipado?
* ¿Está en la carpeta correcta?
* ¿Respeta la arquitectura existente?
* ¿Existe código duplicado?
* ¿Estoy creando una abstracción innecesaria?
* ¿Estoy agregando una dependencia innecesaria?
* ¿La gestión del server state está correctamente implementada?
* ¿Estoy provocando requests innecesarios?
* ¿Hay estados o efectos innecesarios?
* ¿El manejo de errores es correcto?
* ¿El componente tiene demasiadas responsabilidades?
* ¿La solución es mantenible?

---

# Regla principal

**No escribas código únicamente porque funciona.**

Escribe código que pueda mantenerse, extenderse y ejecutarse en producción.

Cuando existan varias soluciones válidas, elige la que tenga el mejor equilibrio entre:

```text
Simplicidad
+
Mantenibilidad
+
Rendimiento
+
Tipado
+
Escalabilidad
```

No sobreingenierices.

> **La mejor solución no es la más compleja; es la más simple que resuelve correctamente el problema actual y permite evolucionar el sistema.**

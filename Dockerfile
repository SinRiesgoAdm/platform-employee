# syntax=docker/dockerfile:1

# =====================================================================
#  platform-employee · imagen de producción
#  Construir:  docker build -t sinriesgo/web .   (desde la raíz del proyecto)
#
#  Etapa 1 (deps)    → instala dependencias con npm ci (reproducible)
#  Etapa 2 (build)   → compila TypeScript + Vite + genera el service worker
#  Etapa 3 (runtime) → nginx sin root sirviendo solo /dist
#
#  La imagen final NO contiene Node, node_modules ni el código fuente.
#  Funciona igual para vite-plugin-pwa y para Workbox CLI: lo único que
#  cambia entre los dos caminos es el script "build" de package.json.
# =====================================================================

# Fija versiones exactas. Revisa en Docker Hub antes de cada release.
ARG NODE_VERSION=24.18.0
ARG NGINX_VERSION=1.28-alpine

# ---------------------------------------------------------------------
# Etapa 1: dependencias
# Solo se copian package.json y package-lock.json para aprovechar la
# caché de capas: si no cambian las dependencias, esta capa no se rehace.
# ---------------------------------------------------------------------
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# ---------------------------------------------------------------------
# Etapa 2: build
# VITE_API_URL se "hornea" dentro del JS en este momento (Vite reemplaza
# import.meta.env en tiempo de compilación). Por eso es un ARG de build
# y no una variable de entorno de runtime.
#
# Con la ruta relativa por defecto, la misma imagen sirve para cualquier
# entorno: el backend real se elige al arrancar con BACKEND_UPSTREAM.
# ---------------------------------------------------------------------
FROM deps AS build
WORKDIR /app

COPY . .

ARG VITE_API_URL=/api-employee-rust/v1

# Configuración web de Firebase (push notifications). Estos valores son
# PÚBLICOS por diseño: identifican el proyecto, no dan acceso de admin.
# La credencial privada (service account) vive SOLO en el backend.
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTH_DOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID
ARG VITE_FIREBASE_VAPID_KEY

ENV VITE_API_URL=${VITE_API_URL} \
    VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY} \
    VITE_FIREBASE_AUTH_DOMAIN=${VITE_FIREBASE_AUTH_DOMAIN} \
    VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID} \
    VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID} \
    VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID} \
    VITE_FIREBASE_VAPID_KEY=${VITE_FIREBASE_VAPID_KEY} \
    NODE_ENV=production

RUN npm run build

# ---------------------------------------------------------------------
# Etapa 3: runtime
# nginx-unprivileged corre como usuario 101 (no root) y escucha en 8080.
# Los archivos estáticos quedan como propiedad de root: nginx puede
# leerlos pero no modificarlos.
# ---------------------------------------------------------------------
FROM nginxinc/nginx-unprivileged:${NGINX_VERSION} AS runtime

# Encabezados de seguridad compartidos por todas las location
COPY docker/nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf

# Plantilla: al arrancar, el entrypoint oficial ejecuta envsubst y genera
# /etc/nginx/conf.d/default.conf reemplazando ${BACKEND_UPSTREAM}.
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template

# Resultado del build (incluye sw.js, workbox-*.js y manifest.webmanifest)
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1

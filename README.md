# Virtual Classroom

`virtual_classroom` es el frontend separado del aula virtual de Promolider. Este repositorio contiene solo la aplicacion cliente en Vue 2 para la experiencia del estudiante: navegacion, vistas del aula, consumo de cursos, progreso, cuenta, compras y componentes visuales del VCR.

Este repo no contiene el backend principal. Toda la logica central de negocio, autenticacion, datos y APIs vive en `promolider`:

- Repo backend/CRM: https://github.com/dev-promolider/promolider

## Relacion con promolider

Piensalo asi:

- `promolider`: backend principal + CRM + APIs + frontend integrado del panel
- `virtual_classroom`: frontend independiente del aula virtual

Este frontend consume el backend de `promolider` por HTTP. En el codigo actual, Axios usa:

```txt
VUE_APP_API_URL + /api/v1
```

Por eso, para trabajar en local normalmente necesitas tener ambos proyectos disponibles:

1. `promolider` levantado como backend
2. `virtual_classroom` levantado como frontend

## Stack tecnico

- Vue 2
- Vue Router
- Vuex
- Vue CLI
- Axios
- Bootstrap / BootstrapVue
- Element UI
- Vuetify
- Pusher / Laravel Echo

## Estructura importante

- `src/main.js`: configuracion global de Vue y Axios
- `src/router/`: rutas del frontend
- `src/store/`: estado global
- `src/views/`: pantallas principales
- `src/components/`: componentes reutilizables del aula virtual
- `src/plugins/`: plugins de Vue
- `public/`: assets estaticos base

## Primer arranque en local

### Requisitos

- Node.js 14+ o 16+ recomendado
- NPM
- El backend `promolider` corriendo localmente o en un entorno accesible

### Instalacion

```bash
git clone https://github.com/dev-promolider/virtual_classroom.git
cd virtual_classroom
npm install
```

Duplica el archivo de entorno:

```bash
# Linux / macOS
cp .env.example .env

# PowerShell
Copy-Item .env.example .env
```

### Variables de entorno

Crea o ajusta `.env` con valores parecidos a estos:

```env
VUE_APP_API_URL=http://127.0.0.1:8000
VUE_APP_FRONT_URL=http://localhost:8080
```

Que significa cada una:

- `VUE_APP_API_URL`: URL base del backend `promolider`
- `VUE_APP_FRONT_URL`: URL publica del frontend VCR para redirecciones y callbacks

## Ejecutar el proyecto

```bash
npm run serve
```

Comandos utiles:

```bash
# desarrollo con hot reload
npm run serve

# build de produccion
npm run build

# lint
npm run lint
```

Por defecto Vue CLI suele levantar el frontend en `http://localhost:8080`.

## Flujo de trabajo recomendado

Cuando trabajes en el VCR, revisa primero si el cambio pertenece realmente a este repo:

- Si el cambio es visual, de navegacion, componentes, layout o consumo de API, probablemente va aqui
- Si el cambio es de base de datos, reglas de negocio, autenticacion, pagos, permisos o nuevos endpoints, probablemente va en `promolider`

## Dependencia real del backend

Aunque este repo sea independiente, no es standalone:

- El login depende del backend
- Los datos de cursos, usuario, progreso y compras vienen del backend
- Los tokens y llamadas API dependen de la configuracion correcta de `VUE_APP_API_URL`

Si la API falla, este frontend tambien va a fallar aunque compile correctamente.

## Cuando usar cada repo

Trabaja en `virtual_classroom` si necesitas tocar:

- UI del aula virtual
- rutas del frontend
- componentes Vue del VCR
- store del cliente
- experiencia del usuario estudiante

Trabaja en `promolider` si necesitas tocar:

- backend y APIs
- autenticacion
- base de datos
- CRM administrativo
- logica de pagos, cursos y negocio

## Enlaces utiles

- Backend principal: https://github.com/dev-promolider/promolider
- Despliegue del backend: https://github.com/dev-promolider/promolider/blob/main/docs/DEPLOYMENT.md

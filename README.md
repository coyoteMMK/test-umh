# Repositorio de Tests UMH

Aplicación web construida con Astro para centralizar y consultar tests de la UMH de forma ordenada y rápida. El contenido se organiza por titulación, curso y asignatura, y cada prueba se renderiza desde ficheros JSON almacenados en el propio proyecto.

<img width="1920" height="1536" alt="image" src="https://github.com/user-attachments/assets/67aa6754-23f4-4462-8b59-d8c39fca5cd6" />


## Características

- Navegación por titulaciones, años y asignaturas.
- Listado automático de tests a partir de la carpeta de datos.
- Vista individual de cada test con preguntas y respuestas.
- Renderizado de tests desde JSON, lo que facilita añadir o actualizar contenido sin tocar la lógica de la aplicación.
- Interfaz ligera, responsive y lista para desplegar en GitHub Pages.

## Tecnologías

- [Astro](https://astro.build/)
- [React](https://react.dev/) para componentes interactivos
- [Tailwind CSS](https://tailwindcss.com/) mediante Vite
- [Fontsource](https://fontsource.org/) para tipografía personalizada

## Estructura del proyecto

```text
src/
  components/    Componentes reutilizables de la UI
  data/tests/    Banco de tests en formato JSON
  layouts/       Layout principal de la aplicación
  pages/         Rutas públicas del sitio
  styles/        Estilos globales
```

## Requisitos previos

- Node.js 18 o superior.
- npm 9 o superior.

## Instalación

```bash
npm install
```

## Desarrollo local

```bash
npm run dev
```

El proyecto se abrirá en el entorno de desarrollo de Astro.

## Scripts disponibles

- `npm run dev`: inicia el servidor de desarrollo.
- `npm run build`: genera la versión de producción.
- `npm run preview`: previsualiza la build generada.
- `npm run astro`: acceso directo al CLI de Astro.

## Cómo añadir un nuevo test

1. Crea un archivo JSON dentro de [src/data/tests](src/data/tests).
2. Usa una estructura similar a esta:

```json
{
  "title": "Nombre del test",
  "career": "Grado en ...",
  "year": "Primer año",
  "subject": "Nombre de la asignatura",
  "questions": [
    {
      "q": "Pregunta",
      "a": ["Respuesta 1", "Respuesta 2", "Respuesta 3"],
      "answer": 1
    }
  ]
}
```

3. Guarda el archivo y ejecuta la aplicación. El test aparecerá automáticamente en el índice y en la página de su asignatura.

## Despliegue

El proyecto está configurado para publicarse en GitHub Pages con base en `/test-umh/`. Si cambias el nombre del repositorio o el dominio de despliegue, revisa [astro.config.mjs](astro.config.mjs).

## Notas

- Las preguntas se cargan desde JSON y se barajan al abrir un test.
- La puntuación se calcula en el cliente para ofrecer una experiencia inmediata.

## Licencia

Añade aquí la licencia que corresponda si vas a publicar o compartir el proyecto de forma abierta.

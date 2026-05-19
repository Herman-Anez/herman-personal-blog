# Architectural Infrastructure

Este documento expone los componentes de infraestructura físicos y lógicos de **Herman's Personal Page**, detallando cómo se resuelven los accesos al disco, la compilación de contenidos, la traducción y la distribución final.

---

## 🏛️ Core Infrastructure Components

El sistema opera bajo un enfoque de **distribución estática descentralizada**, donde todos los recursos se procesan en tiempo de compilación para su alojamiento directo en red CDN.

### 1. Persistencia Física Local (Base de Datos de Disco)
Los datos estructurados de artículos y proyectos residen en archivos locales `.mdx` dentro del directorio físico del monorepo en `personal-page/src/app/[locale]/blog/posts/` y `personal-page/src/app/[locale]/work/projects/`. 
- **Adaptador de Lectura**: El repositorio de infraestructura (`mdxBlogRepository`) utiliza llamadas nativas del sistema de archivos de Node.js (`fs/promises`) y el parseador `gray-matter` para extraer el frontmatter e instanciar las entidades de dominio.

### 2. Procesador de Contenidos Interactivos (MDX Engine)
El renderizado dinámico de Markdown con componentes interactivos se delega al compilador `next-mdx-remote`.
- **Inyección de Scope**: La infraestructura inyecta el diccionario dinámico de i18n (`d`) dentro del contexto de compilación del artículo, permitiendo traducciones dinámicas en el cuerpo de Markdown en build time.

### 3. Resolutor de Rutas Localizadas (Custom Link Factory)
Para garantizar que el visitante mantenga su idioma preferente sin intervención de cookies ni variables runtime:
- **Interceptor Nativo**: Se implementa un componente personalizado `createCustomLink` que intercepta toda navegación local e inyecta dinámicamente el prefijo de idioma correspondiente (`/[locale]/`) de forma transparente en tiempo de renderizado.

### 4. Pipeline de Assets Offline y Codificación Gráfica
Para garantizar la independencia de APIs de red durante el build y maximizar la resiliencia:
- **Avatar Offline**: La foto de perfil se lee localmente y se codifica en base64 de manera estática en el bundle, permitiendo cargas instantáneas e independientes de internet.
- **Dynamic OG Generation**: Las imágenes Open Graph de los artículos se generan en local en tiempo de compilación.

---

## 💾 Future Persistence (Browser Persistence Adapter)

Para dar soporte a futuras funcionalidades interactivas locales sin requerir servidores backend (favoritos, lecturas recomendadas guardadas, etc.):
- **IndexedDB Adapter**: Se implementará un adaptador de infraestructura basado en **IndexedDB** (utilizando el wrapper tipado ligero `Dexie.js`).
- **Aislamiento**: El adaptador se comunicará con el dominio mediante puertos definidos (`ClientPersistenceRepository`), manteniendo las capas visuales completamente agnósticas de la tecnología de almacenamiento local.

---

## 🚀 Deployment and Hosting (Distribución)

- **Distribución CDN Global (GitHub Pages)**: Todo el compilado estático resultante (`output: 'export'`) se publica de forma automatizada mediante un pipeline de **GitHub Actions** hacia servidores perimetrales (CDN de GitHub Pages). Esto garantiza tiempos de respuesta mundiales sub-50ms sin servidores HTTP de aplicación activos.

---

## 🔗 Related Documents

- [Architecture and Patterns](./arquitectura-y-patrones.md)
- [Quality Attributes](./quality-attributes.md)
- [ADR Index](./adrs/index.md)

---

[back](../readme.md)

# Generación Estática Completa (Static HTML Export) y Despliegue en GitHub Pages

- Status: accepted
- Deciders: Herman Anez
- Date: 2026-05-18
- Tags: devops, static-export, nextjs, github-pages, offline-build

## Context and Problem Statement

El portafolio personal es un sitio estático por naturaleza que no requiere bases de datos dinámicas en tiempo de ejecución del servidor ni lógica server-side compleja después de ser publicado. Para alojar el portafolio de manera gratuita, ultra-rápida y altamente disponible, decidimos utilizar **GitHub Pages** como plataforma de distribución (CDN). Sin embargo, esto impone la restricción estricta de que el sitio debe compilarse utilizando la exportación estática nativa de Next.js (`output: 'export'`), lo cual deshabilita características dinámicas tradicionales de Node.js en producción (como server-side rendering bajo demanda, middlewares, revalidación incremental ISR activa o llamadas a red dinámicas en tiempo de petición).

## Decision Drivers

- **Coste de Hosting e Infraestructura**: Conseguir un coste de operación de cero utilizando CDNs gratuitas de alto rendimiento (GitHub Pages).
- **Rendimiento Máximo**: El HTML estático precompilado servido por CDN ofrece tiempos de respuesta instantáneos.
- **Robustez en Build Offline**: La compilación (`npm run build`) debe completarse con éxito en entornos CI/CD sin depender de servicios externos o de que el servidor de producción actual esté en línea.
- **Soporte para Rutas Dinámicas**: Generar de forma estática páginas dinámicas como `blog/[slug]` o feeds RSS.

## Considered Options

- **Option 1: Servidor Node.js Activo (Vercel / VPS)**: Permite todas las características dinámicas de Next.js pero introduce costes mensuales o complejidad de mantenimiento de servidores.
- **Option 2: Exportación Estática Completa (Static HTML Export - output: 'export')**: Next.js genera únicamente archivos estáticos (HTML, CSS, JS, imágenes) listos para servir desde cualquier hosting estático.

## Decision Outcome

Chosen option: **Option 2: Exportación Estática Completa**, porque cumple al 100% con los requerimientos del portafolio (velocidad extrema, mantenimiento cero y coste gratuito en GitHub Pages) sin introducir dependencias dinámicas de servidor.

### Positive Consequences

- **Páginas Pre-renderizadas**: Todas las páginas bilingües y las combinaciones de idiomas y slugs (ej: `/es/blog/mi-post`, `/en/blog/my-post`) son resueltas y pre-renderizadas en tiempo de compilación a través de implementaciones exhaustivas de `generateStaticParams()`.
- **APIs Estáticas Forzadas**: Rutas dinámicas de infraestructura (como el feed RSS `rss/route.ts`, el generador de `sitemap.xml`, `robots.txt` o el servicio de imágenes dinámicas Open Graph `api/og/generate/route.tsx`) exponen explícitamente `export const dynamic = "force-static";`, forzando a Next.js a compilarlas como archivos estáticos en build-time.
- **Compilación Offline Segura para OG**: El generador de imágenes OG requiere el avatar del autor. En lugar de realizar un fetch HTTP a la URL de producción (lo que rompería compilaciones offline o fallaría en entornos CI sin red), se implementó un decodificador estático que lee el archivo físico local `/images/avatar.jpg` usando `fs` y lo inyecta codificado en `base64` directamente en el componente visual Satori de forma instantánea.
- **Pipeline Automático**: Un workflow optimizado en GitHub Actions (`.github/workflows/deploy.yml`) automatiza el build y despliegue directo a la rama de producción de GitHub Pages ante cada push en `main`.

### Negative Consequences

- **Sin Características de Servidor**: No se pueden usar Middlewares de Next.js, APIs dinámicas en runtime (por ejemplo, procesamiento de formularios dinámicos del lado del servidor) ni internacionalización dinámica basada en cabeceras HTTP (la localización debe resolverse puramente en la ruta `/[locale]`).
- **Tiempos de Build más largos**: A medida que crezca el número de artículos de blog y proyectos, el tiempo de compilación se incrementará ligeramente debido al pre-renderizado completo de las variantes de idioma.

## Pros and Cons of the Options

### Servidor Node.js Activo

- Good, porque permite APIs dinámicas tradicionales en runtime y optimización de imágenes bajo demanda de Next.js.
- Bad, porque requiere gestionar infraestructuras activas, actualizar paquetes de servidor y asumir costes mensuales de hosting.

### Exportación Estática Completa

- Good, porque ofrece la mayor velocidad de carga posible al servir archivos estáticos distribuidos geográficamente en la CDN de GitHub.
- Good, porque el portafolio es inmune a ataques web tradicionales dirigidos a servidores de backend en runtime.
- Bad, porque requiere pre-generar estáticamente el 100% del árbol de navegación en tiempo de compilación.

## Links

- [DevOps infrastructure context](../../../context.md#%EF%B8%8F-devops-y-herramientas)
- [DevOps guidelines](../../../documentacion-old/devops.md)

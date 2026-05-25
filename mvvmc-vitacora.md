# 📓 Bitácora de Refactorización Arquitectónica: MVVM-C

Este documento registra los antecedentes, decisiones de diseño, fases de ejecución y el estado final de la migración del proyecto de **MVVM** a **MVVM-C (Model-View-ViewModel-Coordinator)**.

---

## 🎯 Antecedentes y Motivación

La arquitectura original **MVVM** presentaba algunas limitaciones de cara al crecimiento y robustez del portafolio:
1. **Duplicación de Estructuras**: La información global del programador (`person` y `social`) se construía por separado en `homeViewModel`, `aboutViewModel` y `layoutViewModel`.
2. **Hardcoding de Rutas**: La navegación multilingüe y de rutas dinámicas (como `/blog` o `/work`) estaba distribuida en múltiples archivos React y ViewModel de forma estática.
3. **Acoplamiento de Presentación**: Los ViewModels contenían fragmentos JSX (como `<RenderHTML html={...} />` y `<Row>`), impidiendo que fueran clases/funciones de TypeScript 100% puras y agnósticas de React.
4. **Acoplamiento de Flujos**: Los componentes y páginas de Next.js instanciaban directamente los ViewModels específicos, resolviendo de forma ad-hoc situaciones de error o flujos alternativos (como redirecciones 404).

### Solución: Patrón MVVM-C
Introdujimos una capa de **Coordinators** como funciones TypeScript livianas bilingües. Esta capa actúa como el único punto de contacto para las Páginas de Next.js (`page.tsx`), abstrayendo:
* La resolución de rutas y enrutamiento centralizado.
* La construcción de contextos compartidos (traducciones, datos globales).
* La selección del flujo visual a desplegar (ej: listado vs detalle de post vs no-encontrado).

---

## 🛠️ Fases del Plan de Acción y Estado de Ejecución

### [Fase 1] SharedCoordinator: Centralización de Datos Globales
* **Objetivo**: Crear una fuente de verdad única para los datos globales del usuario bilingües (`person` y `social`).
* **Implementación**:
  - Creamos `src/shared/coordinator/sharedCoordinator.ts` con la función `getSharedContext(locale)`.
  - Refactorizamos `homeViewModel.ts`, `aboutViewModel.ts` y `layoutViewModel.ts` para heredar este contexto.
* **Resultado**: Eliminamos la duplicación física de estas estructuras de datos en 3 sitios diferentes.

### [Fase 2] NavigationCoordinator: Centralización del Enrutamiento
* **Objetivo**: Centralizar las rutas del sitio y el soporte multilingüe.
* **Implementación**:
  - Creamos `src/shared/coordinator/navigationCoordinator.ts` con un mapa estático tipado (`ROUTE_MAP`) y funciones de resolución.
  - Refactorizamos `Header.tsx` y `layoutViewModel.ts` para consumir `getNavigationCoordinator(locale)`.
  - Adaptamos `RouteGuard.tsx` para consultar `dynamicBases` de forma dinámica en lugar de tener un arreglo hardcodeado.
  - Refactorizamos el `Footer.tsx` para consumir directamente el contexto compartido de redes.

### [Fase 3] BlogCoordinator: Flujos del Blog
* **Objetivo**: Encapsular y resolver los flujos del listado y detalle de artículos.
* **Implementación**:
  - Creamos `src/modules/blog/presentation/blogCoordinator.ts`.
  - Modificamos el componente `Posts.tsx` para invocar al coordinador en lugar del ViewModel de lista.
  - Refactorizamos las vistas `src/app/[locale]/blog/page.tsx` y `src/app/[locale]/blog/[...slug]/page.tsx` para obtener metadatos y vistas a través del coordinador.

### [Fase 4] WorkCoordinator: Flujos de Proyectos
* **Objetivo**: Encapsular los flujos de portafolio/casos de estudio.
* **Implementación**:
  - Creamos `src/modules/work/presentation/workCoordinator.ts`.
  - Refactorizamos el componente de lista `Projects.tsx` para que consuma `getWorkListCoordinator`.
  - Modificamos las páginas `src/app/[locale]/work/page.tsx` y `src/app/[locale]/work/[...slug]/page.tsx` para usar `getWorkDetailCoordinator`.

### [Fase 5] Limpieza de JSX y Pureza de ViewModels
* **Objetivo**: Remover por completo dependencias de React/JSX de la capa lógica.
* **Implementación**:
  - Eliminamos los componentes visuales (`<RenderHTML>`, `<Row>`, `<Line>`, `<Text>`) de `homeViewModel.ts` y `aboutViewModel.ts`.
  - Renombramos los archivos a extensión `.ts` pura.
  - Modificamos las páginas `page.tsx` de Inicio y About para recibir los strings crudos e instanciar en la vista el componente `<RenderHTML html={...} />`.
  - Rediseñamos el badge de *Featured Work* en `src/app/[locale]/page.tsx` para delegar su maquetación estructural a la vista React, recibiendo solo la etiqueta del ViewModel.

### [Fase 6] Cierre de la Transición: Coordinadores para Home, About y Gallery (Alineación Estricta)
* **Objetivo**: Garantizar la simetría absoluta de la arquitectura MVVM-C eliminando la invocación directa de ViewModels desde las páginas.
* **Implementación**:
  - Creamos `src/modules/site/presentation/siteCoordinator.ts` para encapsular la portada (`HomeFlow`).
  - Creamos `src/modules/about/presentation/aboutCoordinator.ts` para unificar los flujos de sobre mí (`AboutFlow`) y galería (`GalleryFlow`).
  - Refactorizamos las páginas `page.tsx` de Inicio, About y Galería para consumir exclusivamente estos coordinadores, logrando que el 100% de las rutas de Next.js se conecten única y estrictamente con la capa de Coordinators.

---

## 📈 Estado de Salud del Proyecto

A fecha **2026-05-24**, el estado del proyecto es excelente:

1. **Type Safety (Chequeo Estático)**:
   ```bash
   npx tsc --noEmit
   # Salida: Exit 0 (Sin errores de tipo de compilación en toda la app)
   ```
2. **Generación de Feed RSS**:
   La generación estática del RSS se ejecuta automáticamente en prebuild, mapeando los feeds bilingües.
3. **Build e Prerenderizado Estático (SSG)**:
   ```bash
   npm run build
   # Salida: Prerenderizado estático de las 24 páginas en es/en completado exitosamente.
   ```

---

## 🧩 Nueva Estructura del Módulo de Presentación

Con MVVM-C, el flujo de llamadas queda estructurado así:

```text
[ Next.js Page / app ] (Vista pura)
       ↓
[ Coordinator ] (Orquestador de flujo, rutas y dependencias)
       ↓
[ ViewModels ] (Transformador de datos plano / 100% Pure TS)
       ↓
[ Repositories ] (Acceso físico a infraestructura MDX/Assets)
```

### Principales Beneficios de la Arquitectura
* **Testabilidad**: Los ViewModels y Coordinadores son funciones puras y asíncronas de TypeScript, facilitando la creación de pruebas unitarias sin mockear librerías de UI de React o Next.js.
* **Mantenimiento**: Cambiar el slug o base de un recurso (ej: cambiar `/work` por `/portfolio`) solo requiere modificar `navigationCoordinator.ts`, impactando automáticamente a la navegación, metadatos y guards de protección.
* **Separación de Responsabilidades**: Las páginas y componentes se limitan a maquetar el HTML con Once UI; toda lógica de decisión se delega a su coordinador.

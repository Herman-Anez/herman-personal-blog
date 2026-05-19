# Requirements: Work Module

## Module Objective

El módulo de **Work** gestiona el ciclo de vida estático de los Casos de Estudio de Proyectos Comerciales y Hitos Profesionales, garantizando su renderizado localizado bilingüe y optimización para búsquedas interactivas en el portafolio.

---

## Functional Requirements

- **`[RF-WORK-01]`**: El sistema debe listar cronológicamente todos los proyectos comerciales activos en el idioma seleccionado por el usuario.
- **`[RF-WORK-02]`**: El sistema debe resolver e interpretar de manera segura el detalle de un proyecto redactado en MDX, inyectando el scope local del diccionario bilingüe (`d`).
- **`[RF-WORK-03]`**: El sistema debe agrupar y filtrar dinámicamente los casos de estudio según la taxonomía de etiquetas tecnológicas seleccionadas en la interfaz de Once UI.
- **`[RF-WORK-04]`**: El sistema debe agrupar recursivamente archivos MDX dentro de subcarpetas en `projects/`, permitiendo estructurar "familias" de proyectos o subproyectos de software asociados.
- **`[RF-WORK-05]`**: El sistema debe proveer navegación contextual de series (`SeriesNav`) basada en Once UI para transicionar fluidamente entre subproyectos o partes de la misma familia de portafolio.
- **`[RF-WORK-06]`**: El listado general de proyectos en `/work` debe ocluir las páginas secundarias de una familia (Opción A), exponiendo únicamente el proyecto principal o índice de la serie.

---

## Key Business Rules (Reglas de Negocio)

- **Unicidad de Identidad**: Cada `ProjectStudy` se identifica de forma inequívoca mediante su `ProjectSlug` (incluyendo slugs compuestos para subproyectos anidados). No pueden existir dos proyectos con el mismo slug en el sistema.
- **Metadatos Obligatorios**: Todo caso de estudio debe contar obligatoriamente con el nombre de la empresa (`CompanyMetadata`), el rol profesional de Herman, rango de fechas válidas y al menos una tecnología (`TechnologyTag`).
- **Coherencia Temporal**: La fecha de inicio del proyecto comercial debe ser cronológicamente anterior o igual a la fecha de finalización (o declarada "en curso" / "presente").
- **Tipado de Tags**: Los tags tecnológicos inyectados deben coincidir con la lista de herramientas válidas del sistema, previniendo tipografías incorrectas o filtros rotos.
- **Orden de Subproyectos**: La lista de subproyectos en el componente de navegación secuencial se ordena con la página raíz `index` primero y los capítulos secundarios de forma cronológica ascendente por su fecha de publicación.

---

## Non-Functional Requirements

- **`[RNF-WORK-M1] (Maintainability)`**: El diseño visual de los casos de estudio en Once UI debe estar completamente aislado del sistema de ficheros de infraestructura, interactuando únicamente con la interfaz tipada `ProjectStudyViewModel`.
- **`[RNF-WORK-P1] (Performance)`**: Las vistas dinámicas localizadas de portafolio deben pre-renderizarse estáticamente en build time, garantizando tiempos de carga First Contentful Paint (FCP) inferiores a **1.0 segundo** en red móvil.
- **`[RNF-WORK-SEO] (SEO)`**: Cada caso de estudio de proyecto debe contar con canonical tags auto-referenciales bilingües y metatags Open Graph autogenerados de forma offline para motores de búsqueda.

---

[back](./readme.md)

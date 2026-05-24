# Bitácora de Refactorización: Desacoplamiento de Páginas a Componentes de Vista

Esta bitácora documenta las motivaciones, cambios técnicos y el impacto de la refactorización realizada el **24 de mayo de 2026** para separar de manera estricta la presentación de las vistas de los cascarones de Next.js (`page.tsx`).

---

## 1. Motivación y Antecedentes

Anteriormente, las páginas (`page.tsx`) en el App Router de Next.js mezclaban múltiples niveles de responsabilidad:
1. **Infraestructura**: Resolución de parámetros dinámicos, enrutamiento bilingüe y metadata SEO.
2. **Esquema Semántico**: Estructuración de datos JSON-LD (`<Schema />`).
3. **Presentación**: Código JSX interactivo y layouts complejos (por ejemplo, el archivo `about/page.tsx` excedía las 350 líneas mezclando markup, estilos sticky de avatar y mapas de arreglos locales).

Esto dificultaba:
- La legibilidad y mantenimiento del código visual de la interfaz.
- La realización de pruebas unitarias o visuales (ej. Storybook), ya que las vistas estaban acopladas a la estructura y APIs del servidor de Next.js.
- La consistencia del diseño.

**El Objetivo**: Reducir cada archivo `page.tsx` a un thin-shell puro de servidor y trasladar todo el renderizado JSX a componentes de vista dedicados y puros en `src/components`.

## 2. Estructura y Flujo Arquitectónico

Para cumplir de manera **estricta con el patrón MVVM-C (Model-View-ViewModel-Coordinator)** implementado en el portafolio, las páginas (`page.tsx`) tienen prohibido importar e invocar directamente los ViewModels (`homeViewModel`, `aboutViewModel`, `galleryViewModel`).

En su lugar, toda interacción se realiza obligatoriamente a través de un **Coordinador de Orquestación**:

```
Next.js page.tsx (View Shell)
       ⬇ [Consulta flujo / Carga bilingüe]
Coordinador del Módulo (ej. siteCoordinator / aboutCoordinator)
       ⬇ [Instancia / Construye estado serializado]
ViewModel (ej. homeViewModel / aboutViewModel / TS Puro)
       ⬇ [Mapea datos de dominio e i18n]
Cascarón de Página ➔ Renderiza Vista Pura (ej. HomeView.tsx)
```

Para consolidar esta alineación, creamos e implementamos:
- **`siteCoordinator.ts`** (`src/modules/site/presentation/siteCoordinator.ts`): Orquesta la portada cargando el flujo `HomeFlow`.
- **`aboutCoordinator.ts`** (`src/modules/about/presentation/aboutCoordinator.ts`): Orquesta los flujos de biografía (`AboutFlow`) y galería fotográfica (`GalleryFlow`).
- **Refactorización de Rutas**: Las páginas de `page.tsx` de Inicio, Sobre mí y Galería se actualizaron para consumir estos coordinadores, eliminando llamadas directas a ViewModels.


---

## 3. Detalle de Archivos Creados y Modificados

### 3.1 Vistas de Presentación Creadas (`[NEW]`)

| Componente | Ubicación | Responsabilidad |
|---|---|---|
| **`HomeView.tsx`** | `src/components/site/HomeView.tsx` | Renderiza la portada, badge interactivo de featured work, avatar animado, CTA y grillas de post/proyecto recientes. |
| **`AboutView.tsx`** | `src/components/about/AboutView.tsx` | Encapsula el timeline profesional de experiencia laboral, instituciones de estudio, badges de destrezas técnicas, links de redes sociales y calendar. |
| **`BlogListView.tsx`** | `src/components/blog/BlogListView.tsx` | Grilla responsiva que estructura los artículos bilingües clasificados por rango en el listado del blog. |
| **`BlogPostView.tsx`** | `src/components/blog/BlogPostView.tsx` | Contiene el layout de lectura de un post individual, incluyendo metatags de autor, SeriesNav, CustomMDX, ShareSection y posts sugeridos. |
| **`WorkListView.tsx`** | `src/components/work/WorkListView.tsx` | Encapsula el listado y grilla de proyectos del portafolio. |
| **`WorkDetailView.tsx`** | `src/components/work/WorkDetailView.tsx` | Ficha técnica de visualización del proyecto individual, mostrando el equipo (`AvatarGroup`), multimedia, contenido dinámico MDX y proyectos relacionados. |

---

### 3.2 Cascarones de Rutas Refactorizados (`[MODIFY]`)

Las páginas Next.js ahora son extremadamente legibles y concisas. A continuación se detalla la reducción drástica en líneas de código (LoC):

| Página | LoC Anterior | LoC Actual | % Reducción | Responsabilidad Residual |
|---|---|---|---|---|
| `app/[locale]/page.tsx` | 143 | 36 | **~75%** | Metadata de portada, Schema JSON-LD y wrapper. |
| `app/[locale]/about/page.tsx` | 353 | 32 | **~91%** | Inyección de ViewModel y Schema. |
| `app/[locale]/blog/page.tsx` | 57 | 35 | **~38%** | Generación de Metadata y Schema. |
| `app/[locale]/blog/[...slug]/page.tsx` | 186 | 74 | **~60%** | Static Params, metadata de post, notFound() y Schema. |
| `app/[locale]/work/page.tsx` | 50 | 33 | **~34%** | Metadata de portafolio y Schema. |
| `app/[locale]/work/[...slug]/page.tsx` | 158 | 79 | **~50%** | Static Params de proyectos, notFound() y Schema. |

---

## 4. Beneficios Obtenidos

1. **Pureza y Mantenibilidad**: Un desarrollador que desee corregir estilos o reestructurar el layout de una página puede dirigirse directamente a `src/components` sin lidiar con lógica Next.js.
2. **Reutilización y Testeabilidad**: Los componentes de vistas ahora son componentes puros de React. Es sencillo cargarlos en entornos aislados o mockear sus propiedades en suites de pruebas unitarias.
3. **Consistencia General**: El monorepo ahora sigue el mismo estándar arquitectónico robusto en el 100% de las páginas visuales.

---

## 5. Pruebas y Verificación

- **TypeScript**: `npx tsc --noEmit` completado exitosamente con **0 errores**.
- **Compilación de Next.js**: `npm run build` finalizó correctamente (Exit Code 0), generando las 24 páginas SSG bilingües.
- **Validación i18n**: Scripts de test aprobados en verde.

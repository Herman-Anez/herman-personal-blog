# 📂 Mapa de Estructura de Directorios (`src/`)

Este documento provee un mapa completo y detallado de la estructura de carpetas desde la raíz de código fuente (`src/`) hacia abajo, detallando los roles de cada directorio bajo el patrón **DDD + MVVM**, internacionalización modular (`i18n`) y compilación estática.

---

## 🌳 Árbol de Directorios

```text
personal-page/src/
├── app/                              # Capa de Presentación (Rutas de Next.js y Presentadores)
│   └── [locale]/                     # Layout Principal Localizado (Bilingüe es/en)
│       ├── about/                    # Vista de Perfil Profesional (/about)
│       ├── blog/                     # Módulo Visual de Blog
│       │   ├── [...slug]/            # Ruteo Catch-All para artículos y familias de posts
│       │   │   └── page.tsx          # Presentador de Detalle de Artículo
│       │   ├── posts/                # Persistencia Física Local de Posts (Archivos MDX)
│       │   │   ├── familia-post/     # Directorio de Post Familia (Serie)
│       │   │   │   ├── index.mdx     # Post Portada de la Serie (isIndex: true)
│       │   │   │   └── parte-2.mdx   # Post Secundario (family: "familia-post", isIndex: false)
│       │   │   └── post-plano.mdx    # Post Independiente (family: undefined)
│       │   └── page.tsx              # Vista General de Listado de Blog
│       ├── gallery/                  # Vista de Galería Fotográfica (/gallery)
│       ├── work/                     # Módulo Visual de Portafolio
│       │   ├── [...slug]/            # Ruteo Catch-All para casos de estudio y subproyectos
│       │   │   └── page.tsx          # Presentador de Caso de Estudio
│       │   ├── projects/             # Persistencia Física Local de Proyectos (Archivos MDX)
│       │   │   ├── familia-proyecto/ # Carpeta de Familia de Proyecto (Serie de Portafolio)
│       │   │   │   ├── index.mdx     # Portada de Proyecto (isIndex: true)
│       │   │   │   └── sub-app.mdx   # Subproyecto Secundario (family: "familia-proyecto")
│       │   │   └── proyecto-plano.mdx# Caso de Estudio Independiente
│       │   └── page.tsx              # Vista General de Listado de Portafolio
│       ├── layout.tsx                # Layout principal del idioma (inicializa tema y scripts)
│       └── page.tsx                  # Vista de Portada Home
│   ├── robots.ts                     # Generador de robots.txt estático/dinámico
│   └── sitemap.ts                    # Generador de sitemap.xml localizado y bilingüe
│
├── components/                       # Componentes Visuales Comunes y Reutilizables
│   ├── about/                        # Componentes específicos de biografía y perfil
│   ├── blog/                         # Componentes de renderizado de posts (Post, ShareSection)
│   ├── gallery/                      # Componentes de carrusel y visualización fotográfica
│   ├── work/                         # Componentes específicos de portafolio (Projects)
│   ├── Footer.tsx                    # Pie de página global (Once UI)
│   ├── Header.tsx                    # Cabecera de navegación bilingüe global (Once UI)
│   ├── ProjectCard.tsx               # Tarjeta de proyecto de portafolio reutilizable
│   ├── SeriesNav.tsx                 # Barra de navegación secuencial Once UI para series de posts/proyectos
│   ├── ThemeToggle.tsx               # Switcher de tema visual (Dark/Light)
│   └── index.ts                      # Barrel Export de Componentes UI
│
├── modules/                          # Capas de Negocio del Sistema (Clean Architecture / DDD)
│   ├── about/                        # Contexto Acotado: Perfil e Hitos Profesional
│   ├── blog/                         # Contexto Acotado: Artículos y Publicación Técnica
│   ├── site/                         # Contexto Acotado: Home, Layouts y Navegación
│   └── work/                         # Contexto Acotado: Proyectos Comerciales y Casos de Estudio
│       # Estructura Rígida Interna por Módulo:
│       ├── domain/                   # Dominio Puro (Entidades, interfaces e invariantes sin dependencias)
│       ├── infrastructure/           # Adaptadores Físicos (Lectura de MDX, mapeos y repositorios de disco)
│       └── presentation/             # ViewModels (Aplanadores de estado y resolutores de traducción)
│
├── shared/                           # Utilidades y Componentes Transversales Compartidos
│   ├── i18n/                         # Motor Central de Internacionalización
│   │   ├── lang/                     # Dicionarios Modulares de Traducción
│   │   │   ├── es/                   # Archivos JSON de Traducción al Español
│   │   │   └── en/                   # Archivos JSON de Traducción al Inglés
│   │   └── dictionaries.ts           # Cargador dinámico centralizado (as const) y utilitario resolveKey
│   └── ui/                           # Componentes Compartidos a nivel UI
│       └── components/
│           ├── mdx.tsx               # Factory CustomMDX de parsing (Markdown, links, anclajes)
│           └── T.tsx                 # Componente <T /> para traducciones dinámicas inline/diccionario
│
├── resources/                        # Constantes y Configuraciones Estáticas de Negocio
├── scripts/                          # Scripts Auxiliares de Construcción (Generación de RSS)
│   └── generate-rss.ts               # Genera feeds rss.xml en public/ antes del build
├── types/                            # Definiciones y Tipados TypeScript Transversales
└── utils/                            # Utilidades del Sistema (Escáner MDX, tests automatizados)
```

---

## 🏛️ Roles y Desacoplamiento

El monorepo sigue los principios de desacoplamiento más rigurosos:

1. **Desacoplamiento Visual / Ficheros**:
   Las vistas de React (`src/app/` y `src/components/`) **tienen prohibido** realizar lecturas físicas de archivos o importar librerías de infraestructura como `gray-matter` o `fs`.
2. **Capa ViewModel como Puente**:
   Los ViewModels de `src/modules/*/presentation/` son los únicos encargados de comunicarse con la infraestructura, aplanar metadatos complejos y traducir estados tipados antes de inyectarlos de forma pasiva a las Vistas React.
3. **Internacionalización Desacoplada**:
   El motor i18n (`src/shared/i18n/`) se ejecuta de manera independiente. El componente `<T />` y la factory `<CustomMDX />` inyectan el scope localizado sin interferir en los contratos de dominio.

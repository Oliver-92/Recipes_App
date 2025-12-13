# 🍳 Recetas App - Explorador de Recetas Moderno

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)

## 📖 Introducción

**Recetas App** es una aplicación web moderna y responsive diseñada para que los amantes de la comida exploren, descubran y organicen sus recetas favoritas. Resuelve el problema de tener recetas dispersas, proporcionando una plataforma centralizada para buscar comidas por categoría, por nombre y guardar favoritos personales.

Construida con performance y accesibilidad como prioridad, la app ofrece una experiencia de usuario fluida en cualquier dispositivo.

### ✨ Funcionalidades Principales

-   **Exploración de Recetas**: Navega por categorías (Carne, Pollo, Vegetariana, etc.).
-   **Búsqueda Inteligente**: Encuentra recetas instantáneamente por nombre.
-   **Detalle de Receta**: Visualiza ingredientes, instrucciones y videos en un modal accesible.
-   **Autenticación de Usuarios**: Login y registro seguros mediante Firebase.
-   **Sistema de Favoritos**: Colección personalizada de recetas guardadas en la nube.
-   **Diseño Responsive**: Totalmente optimizada para móviles, tablets y escritorio.
-   **Accesibilidad (a11y)**: Cumplimiento WCAG 2.1 AA (Gestión de foco, soporte ARIA, navegación por teclado).

---

## 🛠️ Stack Tecnológico

El proyecto utiliza un stack frontend moderno para asegurar escalabilidad, rendimiento y mantenibilidad.

| Tecnología | Rol | Motivo de la Elección |
| :--- | :--- | :--- |
| **React 19** | Librería UI | Arquitectura basada en componentes y ecosistema robusto. |
| **Vite** | Build Tool | HMR extremadamente rápido y builds de producción optimizados. |
| **Zustand** | Manejo de Estado | Gestión de estado ligera, performante y sin boilerplate. |
| **TailwindCSS** | Estilos | CSS utility-first para desarrollo rápido y tokens de diseño consistentes. |
| **React Router** | Navegación | Solución estándar para SPAs con soporte de Lazy Loading. |
| **Firebase** | Backend-as-a-Service | Autenticación y base de datos Firestore en tiempo real. |
| **TheMealDB** | API Externa | Fuente confiable y diversa de datos de recetas. |

---

## 🏗️ Arquitectura del Proyecto

El código base sigue la metodología **Atomic Design**, promoviendo la reutilización y la separación de responsabilidades.

### 📁 Estructura de Carpetas

```bash
src/
├── components/          # Componentes UI (Atomic Design)
│   ├── atoms/           # Inputs básicos, botones, spinners (Componentes puros)
│   ├── molecules/       # Tarjetas de receta, barras de búsqueda
│   ├── organisms/       # Navbars, grillas, secciones complejas
│   ├── templates/       # Wrappers de layout
│   └── ui/              # Elementos UI genéricos (Modal, Notificaciones)
├── config/              # Archivos de configuración (Firebase)
├── constants/           # Constantes centralizadas de la aplicación
├── hooks/               # Custom hooks (Abstracción de lógica)
├── pages/               # Componentes de ruta (Lazy loaded)
├── routes/              # Configuración del Router y Rutas Protegidas
├── services/            # Servicios de interacción con API y Firebase
├── store/               # Estado global (Zustand stores)
└── utils/               # Funciones de utilidad (Helpers)
```

### 🧠 Principios de Diseño

-   **Separación de Responsabilidades**: La lógica se extrae en custom hooks (`useRecipes`, `useFavorites`) y servicios.
-   **Responsabilidad Única**: Los componentes se enfocan en la presentación; la lógica reside en hooks/stores.
-   **Performance First**: Uso intensivo de `React.memo`, `useCallback`, `useMemo` y Code Splitting.

---

## 🚦 Routing

La navegación es manejada por `react-router-dom` con **Lazy Loading** para mejorar el tiempo de carga inicial.

-   **Rutas Públicas**:
    -   `/`: Inicio (Explorador de Recetas)
    -   `/login`: Iniciar Sesión
    -   `/register`: Registrarse
-   **Rutas Protegidas** (Envueltas en `ProtectedRoute`):
    -   `/profile`: Perfil de Usuario y Favoritos
-   **404**: Página personalizada de "No Encontrado".

---

## 📦 Manejo de Estado (Zustand)

El estado se divide en tres stores especializados para evitar "God Stores":

1.  **`recipesStore.js`**: Maneja categorías, listas de recetas y lógica de filtrado. Gestiona estados de carga unificados.
2.  **`userStore.js`**: Maneja el estado de autenticación y datos del perfil de usuario.
3.  **`uiStore.js`**: Maneja estado UI efímero como modales, notificaciones (toasts) y mensajes.

---

## 🌐 Consumo de API (TheMealDB)

La obtención de datos se abstrae en capas de servicio:

-   **`mealService.js`**: Interacciones con TheMealDB (Obtener categorías, filtrar por categoría, obtener detalles).
-   **Endpoints**:
    -   `GET /categories.php`
    -   `GET /filter.php?c={category}`
    -   `GET /lookup.php?i={id}`
    -   `GET /search.php?s={name}`

*Nota: Todas las llamadas a la API manejan errores gracefully y proporcionan feedback al usuario mediante Notificaciones.*

---

## 🔒 Autenticación y Firebase

-   **Auth**: Firebase Auth maneja las sesiones de usuario (Email/Password).
-   **Base de Datos**: Firestore almacena los favoritos de los usuarios en una colección `favorites`, indexada por `userId` para segmentación de datos y seguridad.

---

## 🎨 UI, Estilos y Accesibilidad

-   **Estilos**: 100% TailwindCSS. Sin estilos hardcodeados. Uso de `@theme` para variables.
-   **Animaciones**: Animaciones CSS personalizadas para transiciones suaves (`slideInUp`, `fadeIn`).
-   **Accesibilidad**:
    -   **Focus Trap**: Los modales atrapan el foco localmente para navegación segura.
    -   **Skip Links**: Enlace "Saltar al contenido principal" para usuarios de teclado.
    -   **ARIA**: Soporte completo (`aria-label`, `aria-live`, `role='dialog'`, `role='alert'`).
    -   **Spinner**: Estados de carga amigables para lectores de pantalla.
    -   **Contraste**: Colores verificados para legibilidad.

---

## 🚀 Instalación y Setup Local

### Requisitos Previos

-   Node.js (v18+)
-   npm

### Pasos

1.  **Clonar el repositorio**
    ```bash
    git clone https://github.com/Oliver-92/Recipes_App.git
    cd Recipes_App
    ```

2.  **Instalar dependencias**
    ```bash
    npm install
    ```

3.  **Variables de Entorno**
    Crea un archivo `.env` en la raíz basado en tu configuración de Firebase:
    ```env
    VITE_FIREBASE_API_KEY=tu_api_key
    VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=tu_project_id
    VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
    VITE_FIREBASE_APP_ID=tu_app_id
    ```

4.  **Correr Servidor de Desarrollo**
    ```bash
    npm run dev
    ```

5.  **Build para Producción**
    ```bash
    npm run build
    ```

---

## 🔟 Buenas Prácticas Implementadas

-   **Code Splitting**: Lazy loading basado en rutas reduce el tamaño del bundle inicial.
-   **Memoización**: `React.memo`, `useMemo` y `useCallback` previenen re-renders innecesarios.
-   **Código Limpio**: Sin "magic numbers" (extraídos a `constants`), lógica duplicada eliminada vía custom hooks.
-   **Manejo de Errores**: Gestión centralizada de errores en servicios.
-   **Nomenclatura**: Convenciones de nombres consistentes y estructura en inglés para código.

---

## 🔮 Posibles Mejoras Futuras

-   **Migración a TypeScript**: Para forzar tipado estricto y mejorar la DX.
-   **Testing Unitario**: Implementación de tests con Vitest y React Testing Library.
-   **Soporte PWA**: Capacidades offline para usuarios móviles.
-   **Filtros Avanzados**: Filtrar por ingredientes o área geográfica.

---

**Desarrollado con ❤️ por [Ezequiel Oliver](https://oliver-92.github.io/Portafolio/)**

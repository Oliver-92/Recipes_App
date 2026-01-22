# 🍽️ Recetas App

Una aplicación moderna para explorar recetas usando **React**, **Vite**, **Zustand**, **TailwindCSS** y **Firebase**.

## 🎯 Características

- ✅ Explorador de recetas por categoría
- ✅ Vista detallada de recetas en modal
- ✅ Autenticación con Firebase (registro/login)
- ✅ Guardado de recetas favoritas en Firestore
- ✅ Perfil de usuario con favoritos
- ✅ Diseño responsive con TailwindCSS
- ✅ Estado global con Zustand
- ✅ Arquitectura con Atomic Design

## 🛠️ Stack Tecnológico

- **React 19** - Librería de UI
- **Vite** - Build tool
- **React Router DOM** - Navegación
- **Zustand** - Estado global
- **TailwindCSS** - Estilos
- **Firebase** - Autenticación y Firestore
- **TheMealDB API** - Base de datos de recetas

## 📋 Requisitos

- Node.js 16+
- npm o yarn
- Cuenta de Firebase

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd Recipe_App
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

Copia el archivo `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales de Firebase:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📂 Estructura del Proyecto

```
src/
├── assets/                 # Recursos estáticos
├── components/
│   ├── atoms/             # Componentes básicos (Button, Input, Spinner)
│   ├── molecules/         # Componentes compuestos (CategorySelect, RecipeCard)
│   ├── organisms/         # Componentes complejos (RecipesGrid, Navbar)
│   ├── templates/         # Layouts base (Layout)
│   └── ui/               # Componentes UI genéricos (Modal)
├── config/
│   └── firebase.js       # Configuración de Firebase
├── hooks/
│   ├── useAuth.js        # Hook para autenticación
│   └── useRecipes.js     # Hook para recetas
├── pages/
│   ├── Home.jsx          # Página principal
│   ├── Login.jsx         # Página de login
│   ├── Register.jsx      # Página de registro
│   └── UserProfile.jsx   # Perfil de usuario
├── routes/
│   ├── AppRouter.jsx     # Router principal
│   └── ProtectedRoute.jsx # Rutas protegidas
├── services/
│   ├── authService.js    # Servicios de autenticación
│   ├── favoriteService.js # Servicios de favoritos
│   └── mealService.js    # Servicios de recetas
├── store/
│   ├── recipesStore.js   # Store de recetas
│   ├── uiStore.js        # Store de UI
│   └── userStore.js      # Store de usuario
├── utils/
│   └── constants.js      # Constantes
├── App.jsx
├── main.jsx
└── index.css
```

## 🧩 Arquitectura

### Atomic Design

La aplicación sigue los principios de Atomic Design:

- **Átomos**: Componentes más pequeños (Button, Input, Spinner)
- **Moléculas**: Composición de átomos (CategorySelect, RecipeCard)
- **Organismos**: Composición de moléculas (RecipesGrid, Navbar)
- **Templates**: Layouts que organizan organismos (Layout)
- **Pages**: Páginas completas con toda la lógica

### Estado Global con Zustand

Tres stores principales:

```javascript
// recipes - Recetas y filtros
useRecipesStore()

// ui - Estados de UI (modal, notificaciones)
useUiStore()

// user - Datos del usuario y favoritos
useUserStore()
```

## 🔐 Firebase Setup

### 1. Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto
3. Habilita Firebase Authentication (Email/Password)
4. Crea una base de datos Firestore en modo desarrollo
5. Copia las credenciales en `.env.local`

### 2. Reglas de Firestore

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /favorites/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
  }
}
```

## 📖 Guía de Uso

### Para Usuarios

1. **Explorar Recetas**: En la home, selecciona una categoría para ver recetas
2. **Ver Detalles**: Haz clic en "Ver Detalles" para abrir un modal con toda la información
3. **Guardar Favoritos**: Inicia sesión y haz clic en el botón de corazón
4. **Ver Perfil**: En el navbar, accede a tu perfil para ver tus favoritos

### Para Desarrolladores

#### Agregar una nueva página

```javascript
// 1. Crear en src/pages/NuevaPagina.jsx
export default function NuevaPagina() {
  return <div>Contenido</div>;
}

// 2. Agregar ruta en src/routes/AppRouter.jsx
<Route path='/nueva' element={<NuevaPagina />} />
```

#### Crear un nuevo hook

```javascript
// src/hooks/useNuevoHook.js
import { useState, useEffect } from 'react';

export const useNuevoHook = () => {
  // Lógica aquí
  return { /* estado */ };
};
```

#### Agregar una acción al store

```javascript
// En src/store/recipesStore.js
setNewField: (value) => set({ newField: value }),
```

## 🧪 Testing

Por agregar. Se recomienda usar Vitest y React Testing Library.

## 🐛 Troubleshooting

### "Firebase no está inicializado"

Verifica que `.env.local` tenga las credenciales correctas.

### "No puedo guardar favoritos"

1. Verifica que iniciar sesión funciona
2. Revisa las reglas de Firestore
3. Comprueba que el usuario tenga permisos

### "Las recetas no cargan"

Verifica que tengas conexión a internet y que TheMealDB esté disponible.

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Lint
npm run lint
```

## 🚀 Deployment

### Vercel

```bash
vercel deploy
```

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## 📝 Licencia

MIT

## 👨‍💻 Autor

Recetas App - Desarrollado con ❤️

---

**Nota**: Recuerda configurar Firebase correctamente antes de usar la aplicación. Sin las credenciales, la autenticación y el guardado de favoritos no funcionarán.

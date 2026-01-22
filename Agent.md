# 🍽️ Agent.md — Proyecto "Recetas App"

## 📌 Descripción General del Proyecto

"Recipe App" es una aplicación web desarrollada con **React**, utilizando **Zustand** para la gestión de estado global, **TailwindCSS** para el estilo y **Firebase** para el sistema de autenticación y almacenamiento de favoritos. El proyecto consume la API pública **TheMealDB**, permitiendo a los usuarios explorar recetas por categoría, ver detalles en un modal y autenticarse para guardar recetas en su perfil personal.

Este documento tiene como finalidad servir como contexto para el desarrollo del proyecto, detallando objetivos, funcionalidad, arquitectura y estructura del repositorio.

---

## 🎯 Objetivos del Proyecto

* Construir una aplicación moderna, modular y escalable.
* Implementar filtrado de recetas mediante categorías.
* Permitir autenticación segura con Firebase Authentication.
* Permitir que los usuarios guarden y gestionen sus recetas favoritas.
* Utilizar Zustand como gestor de estado global, manteniendo simplicidad y eficiencia.
* Aplicar principios de Atomic Design en la arquitectura de componentes.
* Mantener un diseño responsive, limpio y profesional usando TailwindCSS.

---

## 🧩 Funcionalidades Principales

### **Públicas:**

* Listado de recetas provenientes de TheMealDB.
* Filtrado por categorías.
* Vista de detalles de receta mediante modal.

### **Con Autenticación:**

* Registro de usuario con Email & Password.
* Login y logout.
* Página de perfil con listado de recetas favoritas.
* Guardar / eliminar recetas en favoritos (Firebase Firestore).

---

## 🏛️ Arquitectura del Proyecto

La aplicación sigue una arquitectura modular, aplicando principios de Atomic Design: **átomos**, **moléculas**, **organismos**, **templates** y **pages**.

Se utiliza Zustand como estado global para:

* Estado del filtro de categorías.
* Manejo de recetas seleccionadas.
* Estados de UI (modal abierto/cerrado).
* Estado del usuario autenticado.

Firebase se utiliza para:

* Autenticación.
* Guardado de favoritos por usuario.

---

## 📁 Estructura de Carpetas (Sugerida)

```bash
src/
├── assets/
├── components/
│ ├── atoms/
│ │ ├── Button.jsx
│ │ ├── Input.jsx
│ │ └── Spinner.jsx
│ ├── molecules/
│ │ ├── CategorySelect.jsx
│ │ ├── RecipeCard.jsx
│ │ └── ModalHeader.jsx
│ ├── organisms/
│ │ ├── RecipesGrid.jsx
│ │ ├── Navbar.jsx
│ │ └── FavoritesList.jsx
│ ├── templates/
│ │ ├── Layout.jsx
│ │ └── UserDashboardTemplate.jsx
│ └── ui/
│ └── Modal.jsx
│
├── config/
│ └── firebase.js
│
├── hooks/
│ ├── useAuth.jsx
│ └── useRecipes.jsx
│
├── pages/
│ ├── Home.jsx
│ ├── Login.jsx
│ ├── Register.jsx
│ ├── UserProfile.jsx
│ └── NotFound.jsx
│
├── routes/
│ ├── AppRouter.jsx
│ └── ProtectedRoute.jsx
│
├── services/
│ ├── mealsService.js
│ └── favoritesService.js
│
├── store/
│ ├── recipesStore.js
│ ├── uiStore.js
│ └── userStore.js
│
├── utils/
│ └── formatText.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🔌 Integración con TheMealDB API

El servicio de recetas se encapsula en `services/mealsService.js`, manejando endpoints como:

* Listar categorías.
* Listar recetas por categoría.
* Obtener detalle de receta.

Esto permite desacoplar la lógica de comunicación con la API externa.

---

## 🔐 Autenticación y Firebase

El archivo `firebase.js` contendrá:

* Inicialización del proyecto.
* Export de `auth`, `db` y funciones necesarias.

El almacenamiento de favoritos se hará en Firestore bajo una colección por usuario, por ejemplo:

```
users/{uid}/favorites/{mealId}
```

---

## 💾 Manejo de Estado con Zustand

### *recipesStore.js*

* Categorías.
* Recetas filtradas.
* Receta seleccionada.

### *uiStore.js*

* Estado del modal.
* Loading global.

### *userStore.js*

* Usuario autenticado.
* Favoritos sincronizados.

---

## 📐 Estilo con TailwindCSS

Lineamientos:

* Mobile-first.
* Diseño limpio y minimalista.
* Componentes UI en `/components/ui`.
* Tokens de color en `tailwind.config.js`.

---

## Info de la Api

Search meal by name
www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

List all meals by first letter
www.themealdb.com/api/json/v1/1/search.php?f=a

Lookup full meal details by id
www.themealdb.com/api/json/v1/1/lookup.php?i=52772

List all meal categories
www.themealdb.com/api/json/v1/1/categories.php

List all Categories, Area, Ingredients
www.themealdb.com/api/json/v1/1/list.php?c=list
www.themealdb.com/api/json/v1/1/list.php?a=list
www.themealdb.com/api/json/v1/1/list.php?i=list

Filter by Category
www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

Filter by Area
www.themealdb.com/api/json/v1/1/filter.php?a=Canadian

Meal Thumbnail Images
Add /preview to the end of the meal image URL
/images/media/meals/llcbn01574260722.jpg/small
/images/media/meals/llcbn01574260722.jpg/medium
/images/media/meals/llcbn01574260722.jpg/large

---

## 🧪 Testing (Opcional)

* Testing de hooks.
* Testing de componentes críticos.
* Simulación de Zustand stores.

---

## 📄 Licencia

MIT — Puedes modificar y distribuir el proyecto libremente.
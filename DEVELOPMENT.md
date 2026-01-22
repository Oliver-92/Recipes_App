# 📚 Guía Rápida de Desarrollo

## 🎯 Estructura del Proyecto

### Componentes Atomic Design

```
components/
├── atoms/          # Componentes base (Button, Input, Spinner)
├── molecules/      # Composición simple (CategorySelect, RecipeCard, RecipeSearch)
├── organisms/      # Componentes complejos (RecipesGrid, Navbar)
├── templates/      # Layouts base (Layout)
└── ui/            # Componentes UI genéricos (Modal, Notification)
```

**Regla**: Los componentes de nivel superior NO importan de nivel inferior.

## 🧠 Stores Zustand

### useRecipesStore
```javascript
import { useRecipesStore } from '@/store/recipesStore';

const { categories, recipes, selectedCategory, setSelectedCategory, setCategories } = useRecipesStore();
```

### useUiStore
```javascript
import { useUiStore } from '@/store/uiStore';

const { isModalOpen, openModal, closeModal, showNotification } = useUiStore();

// Notificar
showNotification('Mensaje', 'success'); // success, error, warning, info
```

### useUserStore
```javascript
import { useUserStore } from '@/store/userStore';

const { user, favorites, addFavorite, removeFavorite } = useUserStore();
```

## 🪝 Hooks Personalizados

### useAuth
```javascript
import { useAuth } from '@/hooks/useAuth';

const { user, isAuthenticated, isLoading, error, login, register, logout } = useAuth();
```

### useRecipes
```javascript
import { useRecipes } from '@/hooks/useRecipes';

const { categories, recipes, selectedCategory, isLoading, error, filterByCategory, getRecipeDetail } = useRecipes();
```

## 📡 Servicios

### mealService
```javascript
import { getCategories, getMealsByCategory, getMealDetail, searchMealsByName } from '@/services/mealService';

await getCategories();                    // Obtener todas las categorías
await getMealsByCategory('Seafood');      // Recetas por categoría
await getMealDetail('52772');              // Detalles de receta
await searchMealsByName('Pasta');          // Buscar por nombre
```

### authService
```javascript
import { registerUser, loginUser, logoutUser, onAuthChange } from '@/services/authService';

await registerUser('email@example.com', 'password123');
await loginUser('email@example.com', 'password123');
await logoutUser();
onAuthChange((user) => console.log(user));
```

### favoriteService
```javascript
import { addFavorite, getUserFavorites, removeFavorite, isFavoriteMeal } from '@/services/favoriteService';

await addFavorite(userId, recipe);       // Agregar favorito
await getUserFavorites(userId);          // Obtener favoritos del usuario
await removeFavorite(docId);             // Remover favorito
await isFavoriteMeal(userId, mealId);    // Verificar si es favorito
```

## 🛠️ Helpers

```javascript
import { 
  getRecipeIngredients, 
  isValidEmail, 
  isValidPassword, 
  formatFirebaseError,
  debounce 
} from '@/utils/helpers';

getRecipeIngredients(recipe);         // Extraer ingredientes
isValidEmail('test@example.com');     // Validar email
isValidPassword('password', 6);       // Validar contraseña
formatFirebaseError(errorCode);       // Traducir errores Firebase
debounce(func, 300);                  // Debounce
```

## 🎨 Componentes Útiles

### Button
```jsx
<Button 
  variant="primary"        // primary, secondary, danger, ghost
  size="md"               // sm, md, lg
  fullWidth
  disabled={false}
  onClick={handleClick}
>
  Texto
</Button>
```

### Input
```jsx
<Input 
  type="text"
  label="Campo"
  placeholder="..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error="Mensaje de error"
  disabled={false}
/>
```

### Modal
```jsx
<Modal 
  isOpen={isOpen}
  onClose={handleClose}
  title="Título"
  size="md"              // sm, md, lg, xl
>
  Contenido aquí
</Modal>
```

### Notification
```jsx
<Notification 
  message="Mensaje"
  type="success"         // success, error, warning, info
  onClose={handleClose}
  duration={3000}
/>
```

## 📝 Crear una Nueva Página

1. **Crear archivo en `src/pages/`**:
```jsx
// src/pages/MiPagina.jsx
export default function MiPagina() {
  return (
    <div className='space-y-4'>
      <h1>Mi Página</h1>
    </div>
  );
}
```

2. **Agregar ruta en `src/routes/AppRouter.jsx`**:
```jsx
<Route path='/mi-pagina' element={<MiPagina />} />
```

3. **Proteger ruta si es necesaria (para usuarios autenticados)**:
```jsx
<Route
  path='/mi-pagina'
  element={
    <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
      <MiPagina />
    </ProtectedRoute>
  }
/>
```

## 🎨 Tailwind Clases Útiles

```jsx
// Layout
<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>

// Espaciado
<div className='space-y-4'>         // Espacio vertical
<div className='gap-4'>             // Espacio en flex/grid

// Tipografía
<h1 className='text-4xl font-bold'>
<p className='text-gray-600'>
<span className='text-sm font-medium'>

// Colores
<div className='bg-blue-600 text-white'>
<div className='bg-red-50 border-red-200'>

// Estados
<button className='hover:bg-blue-700 transition-colors'>
<input className='focus:ring-2 focus:ring-blue-500'>

// Responsive
<div className='hidden sm:block lg:text-lg'>
```

## 🐛 Debugging

### Firebase Auth
```javascript
import { auth } from '@/config/firebase';
console.log(auth.currentUser); // Usuario actual
```

### Zustand
```javascript
import { useRecipesStore } from '@/store/recipesStore';
const state = useRecipesStore();
console.log(state); // Ver todo el estado
```

### API Calls
Todos los servicios tienen try-catch, revisa la consola para errores.

## 📦 Convenciones

- **Carpetas**: minúsculas (components, hooks, services)
- **Componentes**: PascalCase (Button.jsx, RecipeCard.jsx)
- **Funciones**: camelCase (getCategories, handleClick)
- **Constantes**: UPPER_SNAKE_CASE (API_BASE, MAX_LENGTH)
- **Archivos**: lowercase.js para servicios/utils, PascalCase.jsx para componentes

## 🚀 Tips Importantes

1. **Siempre usar los hooks del proyecto** en lugar de useState/useEffect directamente
2. **Usar showNotification** del uiStore para feedback del usuario
3. **Validar input** antes de enviar a Firebase
4. **Manejar errores** con try-catch y mostrar mensajes amigables
5. **Usar componentes Atomic Design** para mantener consistencia
6. **Importar helpers** para evitar duplicación de código
7. **Respetar estructura de carpetas** para mantenibilidad

## 🔐 Seguridad

- ✅ Credenciales de Firebase en `.env.local`
- ✅ Validar datos en cliente Y servidor
- ✅ Usar Firestore Rules correctamente
- ✅ No guardar tokens en localStorage (Firebase lo maneja)
- ✅ Proteger rutas privadas con ProtectedRoute

---

Para más información, ver `SETUP.md` y `Agent.md`

/**
 * EJEMPLOS.md - Casos de uso reales en la aplicación
 */

# 📖 Ejemplos de Uso

## 1️⃣ Agregar una Receta a Favoritos

**Ubicación**: `src/pages/Home.jsx`

```javascript
const handleFavorite = async (recipe) => {
  if (!isAuthenticated) {
    showNotification('Debes iniciar sesión para guardar favoritos', 'error');
    return;
  }

  try {
    const isFav = favorites.some((fav) => fav.idMeal === recipe.idMeal);

    if (isFav) {
      // Quitar de favoritos
      const favDoc = favorites.find((fav) => fav.idMeal === recipe.idMeal);
      await removeFavorite(favDoc.id);
      const updated = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      setFavorites(updated);
      showNotification('Removido de favoritos', 'success');
    } else {
      // Agregar a favoritos
      await addFavorite(user.uid, recipe);
      const updated = await getUserFavorites(user.uid);
      setFavorites(updated);
      showNotification('Agregado a favoritos', 'success');
    }
  } catch (error) {
    showNotification('Error al guardar favorito', 'error');
  }
};
```

## 2️⃣ Cargar Recetas por Categoría

**Ubicación**: `src/pages/Home.jsx`

```javascript
useEffect(() => {
  const loadRecipes = async () => {
    if (!selectedCategory) {
      setFilteredRecipes([]);
      return;
    }

    try {
      setIsLoadingRecipes(true);
      const recipes = await getMealsByCategory(selectedCategory);
      setFilteredRecipes(recipes);
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error cargando recetas', 'error');
    } finally {
      setIsLoadingRecipes(false);
    }
  };

  loadRecipes();
}, [selectedCategory, setFilteredRecipes, showNotification]);
```

## 3️⃣ Abrir Modal con Detalles de Receta

**Ubicación**: `src/pages/Home.jsx`

```javascript
const handleViewDetails = async (recipe) => {
  try {
    setIsLoadingDetail(true);
    const detail = await getMealDetail(recipe.idMeal);
    setRecipeDetail(detail);
    openModal(recipe);
  } catch (error) {
    console.error('Error:', error);
    showNotification('Error cargando detalles', 'error');
  } finally {
    setIsLoadingDetail(false);
  }
};
```

## 4️⃣ Validación de Formulario de Login

**Ubicación**: `src/pages/Login.jsx`

```javascript
const validateForm = () => {
  const newErrors = {};

  if (!email) {
    newErrors.email = 'El email es requerido';
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = 'El email no es válido';
  }

  if (!password) {
    newErrors.password = 'La contraseña es requerida';
  } else if (password.length < 6) {
    newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

## 5️⃣ Usar el Hook de Autenticación

**Ubicación**: Cualquier componente

```javascript
import { useAuth } from '@/hooks/useAuth';

export default function MiComponente() {
  const { user, isAuthenticated, isLoading, error, login } = useAuth();

  const handleLogin = async () => {
    try {
      const user = await login('email@example.com', 'password123');
      console.log('Usuario logueado:', user);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (isLoading) return <Spinner />;
  
  if (!isAuthenticated) {
    return <p>Por favor inicia sesión</p>;
  }

  return (
    <div>
      <p>¡Hola {user.email}!</p>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
```

## 6️⃣ Mostrar Notificación

**Ubicación**: Cualquier componente

```javascript
import { useUiStore } from '@/store/uiStore';

export default function MiComponente() {
  const { showNotification } = useUiStore();

  const handleAction = () => {
    try {
      // Realizar acción
      showNotification('¡Éxito!', 'success');
    } catch (error) {
      showNotification('Error en la operación', 'error');
    }
  };

  return <button onClick={handleAction}>Realizar Acción</button>;
}
```

## 7️⃣ Crear un Nuevo Componente

**Ubicación**: `src/components/molecules/MiComponente.jsx`

```jsx
import { Button } from '../atoms/Button';
import { Spinner } from '../atoms/Spinner';

export const MiComponente = ({ 
  title, 
  items, 
  isLoading, 
  onSelect, 
  onDelete 
}) => {
  if (isLoading) {
    return <Spinner size="md" className="py-4" />;
  }

  if (!items || items.length === 0) {
    return <p className="text-gray-500">No hay elementos</p>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {items.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center p-4 bg-white rounded-lg shadow"
        >
          <span>{item.name}</span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => onSelect(item)}
            >
              Ver
            </Button>
            <Button 
              variant="danger"
              size="sm"
              onClick={() => onDelete(item.id)}
            >
              ✕
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
```

## 8️⃣ Extraer Ingredientes de Receta

**Ubicación**: `src/utils/helpers.js`

```javascript
import { getRecipeIngredients } from '@/utils/helpers';

const recipe = { /* datos de receta */ };
const ingredients = getRecipeIngredients(recipe);

ingredients.forEach((ing) => {
  console.log(`${ing.ingredient} - ${ing.measure}`);
});
```

## 9️⃣ Buscar Recetas por Nombre

**Ubicación**: `src/components/molecules/RecipeSearch.jsx`

```javascript
import { searchMealsByName } from '@/services/mealService';

const handleSearch = async (searchTerm) => {
  try {
    const results = await searchMealsByName(searchTerm);
    setResults(results);
    showNotification(`Se encontraron ${results.length} receta(s)`, 'success');
  } catch (error) {
    showNotification('Error en la búsqueda', 'error');
  }
};
```

## 🔟 Integrar Componente en Página

**Ubicación**: `src/pages/Home.jsx`

```javascript
import { RecipeSearch } from '@/components/molecules/RecipeSearch';

export default function Home() {
  const [results, setResults] = useState([]);

  return (
    <div>
      <h1>Inicio</h1>
      
      {/* Componente de búsqueda */}
      <RecipeSearch 
        onResults={(recipes) => setResults(recipes)}
      />

      {/* Mostrar resultados */}
      {results.length > 0 && (
        <div>
          <h2>Resultados ({results.length})</h2>
          {/* Mostrar recetas */}
        </div>
      )}
    </div>
  );
}
```

---

## 💡 Patrones Comunes

### Patrón: Cargar datos al montar
```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchData();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  loadData();
}, []);
```

### Patrón: Manejo de errores Firebase
```javascript
try {
  await loginUser(email, password);
} catch (err) {
  const message = formatFirebaseError(err.code);
  setError(message);
}
```

### Patrón: Validación de formulario
```javascript
const validate = () => {
  const errors = {};
  if (!field) errors.field = 'Campo requerido';
  setErrors(errors);
  return Object.keys(errors).length === 0;
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (!validate()) return;
  // Procesar
};
```

---

Para más información sobre la arquitectura, ver `DEVELOPMENT.md`

# 🧪 TESTING - Próximas Fases (Opcional)

## Test Manual - Casos de Uso Principales

### Caso 1: Nuevos Usuarios - Flujo de Registro

```
1. Abrir http://localhost:5173
2. Click en "Register"
3. Llenar:
   - Email: test1@example.com
   - Contraseña: password123
   - Confirmar: password123
4. Click "Crear Cuenta"
5. ✅ ESPERADO: Redirecciona a / y muestra email en navbar
6. ✅ ESPERADO: Navbar dice "test1@example.com" + botón "Logout"
```

### Caso 2: Login de Usuario Existente

```
1. Estar en home (logueado)
2. Click en "Logout"
3. ✅ ESPERADO: Redirecciona a / sin estar logueado
4. Navbar muestra "Login" y "Register"
5. Click en "Login"
6. Email: test1@example.com
7. Contraseña: password123
8. ✅ ESPERADO: Redirecciona a / logueado
9. ✅ ESPERADO: Navbar muestra email
```

### Caso 3: Explorar Recetas

```
1. Estar en home
2. Esperar a que carguen las categorías
3. ✅ ESPERADO: Ver botones de categorías (Seafood, Pasta, etc.)
4. Click en "Seafood"
5. ✅ ESPERADO: Aparece "Recetas: Seafood"
6. ✅ ESPERADO: Se carga grid de recetas
7. ✅ ESPERADO: Cada receta tiene imagen, nombre, botón "Ver Detalles"
```

### Caso 4: Ver Detalles de Receta

```
1. Siendo logueado, en home
2. Seleccionar una categoría
3. Click en "Ver Detalles" de una receta
4. ✅ ESPERADO: Abre modal
5. ✅ ESPERADO: Muestra imagen, nombre, categoría, área
6. ✅ ESPERADO: Muestra ingredientes con medidas
7. ✅ ESPERADO: Muestra instrucciones completas
8. ✅ ESPERADO: Botones YouTube y Fuente (si existen)
9. ✅ ESPERADO: Botón "Agregar a Favoritos"
10. Presionar ESC
11. ✅ ESPERADO: Modal se cierra
```

### Caso 5: Agregar a Favoritos

```
1. Estar logueado con modal abierto
2. Click en "Agregar a Favoritos"
3. ✅ ESPERADO: Notificación "Agregado a favoritos"
4. ✅ ESPERADO: Botón cambia a "Quitar de Favoritos"
5. ✅ ESPERADO: Corazón se pone rojo
6. Cerrar modal
7. En la receta debería ver corazón rojo
```

### Caso 6: Ver Favoritos

```
1. Estar logueado con favoritos guardados
2. Click en tu email en navbar
3. ✅ ESPERADO: Redirecciona a /profile
4. ✅ ESPERADO: Muestra "Mi Perfil" con tu email
5. ✅ ESPERADO: Muestra "Tienes X recetas favoritas"
6. ✅ ESPERADO: Grid con todas tus favoritas
7. Click en "Ver" de una favorita
8. ✅ ESPERADO: Abre modal con detalles
```

### Caso 7: Buscar Receta

```
1. En home
2. Llenar campo "Buscar Receta..." con "Pasta"
3. Click en 🔍
4. ✅ ESPERADO: Notificación con número de resultados
5. ✅ ESPERADO: Grid cambia a mostrar resultados de búsqueda
6. ✅ ESPERADO: Dice "Resultados de búsqueda (X)"
7. Click "Limpiar"
8. ✅ ESPERADO: Limpia búsqueda
9. ✅ ESPERADO: Categorías visibles de nuevo
```

### Caso 8: Remover de Favoritos

```
1. En perfil (/profile)
2. Hacer click al botón ✕ de un favorito
3. ✅ ESPERADO: Notificación "Removido de favoritos"
4. ✅ ESPERADO: La receta desaparece del grid
5. ✅ ESPERADO: Contador de favoritos baja
```

---

## Validaciones - Casos de Error

### Caso: Email inválido en Registro

```
1. En /register
2. Email: invalidemail
3. ✅ ESPERADO: Error "El email no es válido"
4. ✅ ESPERADO: No se envía formulario
```

### Caso: Contraseña corta

```
1. En /register
2. Contraseña: 123
3. ✅ ESPERADO: Error "La contraseña debe tener al menos 6 caracteres"
```

### Caso: Contraseñas no coinciden

```
1. En /register
2. Contraseña: password123
3. Confirmar: password456
4. ✅ ESPERADO: Error "Las contraseñas no coinciden"
```

### Caso: Email ya registrado

```
1. En /register
2. Email: test1@example.com (ya existe)
3. Contraseña: password123
4. Click "Crear Cuenta"
5. ✅ ESPERADO: Error "El email ya está registrado"
```

### Caso: Credenciales incorrectas

```
1. En /login
2. Email: test@example.com
3. Contraseña: wrongpassword
4. ✅ ESPERADO: Error "Email o contraseña incorrectos"
```

### Caso: Sin conexión a TheMealDB

```
1. Desactivar internet
2. Seleccionar categoría
3. ✅ ESPERADO: Spinner de carga
4. ✅ ESPERADO: Error "Error cargando recetas"
```

---

## Testing Automático (Próximas Fases)

### Setup de Vitest

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

### Ejemplo de Test - Button.test.jsx

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/atoms/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    
    render(<Button onClick={handleClick}>Click</Button>);
    await user.click(screen.getByRole('button'));
    
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('shows primary variant styles', () => {
    render(<Button variant="primary">Primary</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveClass('bg-blue-600');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Ejemplo de Test - Modal.test.jsx

```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/components/ui/Modal';

describe('Modal Component', () => {
  it('renders when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={() => {}} title="Test Modal">
        Test Content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={() => {}} title="Test Modal">
        Test Content
      </Modal>
    );
    expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    );
    
    const closeBtn = screen.getByLabelText('Cerrar modal');
    await user.click(closeBtn);
    
    expect(handleClose).toHaveBeenCalledOnce();
  });

  it('closes when ESC key is pressed', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();
    
    render(
      <Modal isOpen={true} onClose={handleClose} title="Test">
        Content
      </Modal>
    );
    
    await user.keyboard('{Escape}');
    
    expect(handleClose).toHaveBeenCalledOnce();
  });
});
```

### Configurar vitest.config.js

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Ejecutar tests

```bash
npm run test              # Ejecutar tests
npm run test -- --watch  # Modo watch
npm run test -- --ui     # Con UI gráfica
```

---

## Checklist de Testing Manual

- [ ] ✅ Registro funciona
- [ ] ✅ Login funciona
- [ ] ✅ Logout funciona
- [ ] ✅ Categorías cargan
- [ ] ✅ Recetas cargan por categoría
- [ ] ✅ Modal abre y cierra
- [ ] ✅ Modal cierra con ESC
- [ ] ✅ Favoritos se guardan
- [ ] ✅ Favoritos aparecen en perfil
- [ ] ✅ Se pueden remover favoritos
- [ ] ✅ Búsqueda funciona
- [ ] ✅ Validaciones funcionan
- [ ] ✅ Notificaciones aparecen
- [ ] ✅ Responsive en móvil
- [ ] ✅ Responsive en tablet
- [ ] ✅ Responsive en desktop

---

**Testing exitoso = Aplicación lista para producción** ✅

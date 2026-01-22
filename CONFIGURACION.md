# 🔧 CHECKLIST DE CONFIGURACIÓN FINAL

## ✅ Pasos para Poner en Marcha la Aplicación

### 1. Firebase Setup (CRÍTICO)

**Sin esto, la app no funcionará correctamente.**

#### 1.1 Crear Proyecto Firebase
- [ ] Ir a [Firebase Console](https://console.firebase.google.com)
- [ ] Click en "Crear proyecto"
- [ ] Nombre: "recetas-app" (o el que prefieras)
- [ ] Habilitar Google Analytics (opcional)
- [ ] Crear proyecto

#### 1.2 Habilitar Authentication
- [ ] En Firebase Console → Authentication
- [ ] Click en "Empezar"
- [ ] Seleccionar "Email/Password"
- [ ] Habilitar
- [ ] Opcional: Habilitar también "Google" si quieres auth con Google

#### 1.3 Crear Base de Datos Firestore
- [ ] En Firebase Console → Firestore Database
- [ ] Click en "Crear base de datos"
- [ ] Elegir región: `us-central1` (recomendado)
- [ ] Modo de seguridad: **Modo de prueba** (cambiar después a producción)
- [ ] Click en "Crear"

#### 1.4 Configurar Firestore Rules
- [ ] En Firestore → Reglas
- [ ] Copiar estas reglas:

```javascript
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

- [ ] Publicar reglas

#### 1.5 Obtener Credenciales
- [ ] En Firebase Console → Project Settings (ícono de engranaje)
- [ ] Tab "General"
- [ ] Desplazarse a "Aplicaciones"
- [ ] Click en "Agregar app" → Web
- [ ] Nombre: "recetas-app"
- [ ] Click en "Registrar app"
- [ ] Copiar la configuración que aparece

### 2. Variables de Entorno

#### 2.1 Crear archivo `.env.local`
```bash
# En la raíz del proyecto
cp .env.example .env.local
```

#### 2.2 Llenar `.env.local`
```env
# Pega aquí las credenciales de Firebase que copiaste
VITE_FIREBASE_API_KEY=tu_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu_proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
VITE_FIREBASE_APP_ID=tu_app_id
```

### 3. Instalación del Proyecto

#### 3.1 Instalar dependencias
```bash
npm install
```

#### 3.2 Iniciar servidor de desarrollo
```bash
npm run dev
```

#### 3.3 Abrir en navegador
```
http://localhost:5173
```

### 4. Prueba Rápida

#### 4.1 Test de Categorías
- [ ] Esperar a que cargue la página
- [ ] Debería verse "Explora Recetas"
- [ ] Debería ver botones de categorías (Seafood, Pasta, etc.)
- [ ] Si no se ve: Revisa la consola (F12) para errores

#### 4.2 Test de Categoría
- [ ] Click en una categoría (ej: "Seafood")
- [ ] Debería cargar recetas
- [ ] Debería ver grid de recetas
- [ ] Si no se ve: Verifica que TheMealDB esté disponible

#### 4.3 Test de Modal
- [ ] Click en "Ver Detalles" de una receta
- [ ] Debería abrir modal con detalles
- [ ] Debería ver ingredientes e instrucciones
- [ ] Presiona ESC para cerrar

#### 4.4 Test de Registro
- [ ] Click en "Register" en navbar
- [ ] Llena formulario con:
  - Email: `test@example.com`
  - Contraseña: `password123`
  - Confirmar: `password123`
- [ ] Click en "Crear Cuenta"
- [ ] Si funciona: Redirecciona a home y muestra navbar con tu email

#### 4.5 Test de Favoritos
- [ ] Siendo logueado, click en el corazón de una receta
- [ ] Debería mostrar notificación "Agregado a favoritos"
- [ ] El corazón debería cambiar de color

#### 4.6 Test de Perfil
- [ ] Click en tu email en navbar
- [ ] Debería ir a `/profile`
- [ ] Debería mostrar tus favoritos

### 5. Troubleshooting

#### Error: "Firebase is not initialized"
- [ ] Verifica que `.env.local` esté en la raíz
- [ ] Verifica que tengas todas las variables de entorno
- [ ] Reinicia: `npm run dev`

#### Error: "No se ve ninguna receta"
- [ ] Verifica que selecciones una categoría
- [ ] Abre DevTools (F12) → Network → Busca peticiones a themealdb.com
- [ ] Si no hay: Revisa que TheMealDB esté online

#### Error: "No puedo registrarme"
- [ ] Verifica que la contraseña tenga al menos 6 caracteres
- [ ] Verifica que el email sea válido
- [ ] Verifica que Authentication esté habilitada en Firebase
- [ ] Revisa la consola (F12) → Console

#### Error: "No puedo guardar favoritos"
- [ ] Verifica que estés logueado
- [ ] Verifica que Firestore esté activo
- [ ] Verifica las Firestore Rules
- [ ] Revisa la consola del navegador

#### Error: "CORS error"
- Generalmente no sucede porque Firebase maneja CORS
- Si ocurre: Revisa que usas Firebase correctamente en `src/config/firebase.js`

### 6. Configuración Avanzada (Opcional)

#### 6.1 Habilitar Google Sign-In
1. En Firebase → Authentication → Providers
2. Habilitar "Google"
3. Agregar email de soporte del proyecto
4. En `src/services/authService.js` agregar:

```javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};
```

#### 6.2 Configurar HTTPS en desarrollo
```bash
npm run dev -- --https
```

#### 6.3 Cambiar puerto de desarrollo
```bash
npm run dev -- --port 3000
```

### 7. Deploy (Cuando estés listo)

#### 7.1 Build para producción
```bash
npm run build
```

#### 7.2 Cambiar Firestore a modo producción
- En Firebase Console → Firestore → Reglas
- Cambiar "Modo de prueba" a "Modo de producción"
- Actualizar reglas si es necesario

#### 7.3 Deploy en Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

#### 7.4 Deploy en Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase deploy
```

---

## 📋 Checklist Final

- [ ] Firebase proyecto creado
- [ ] Authentication habilitada
- [ ] Firestore creado
- [ ] Firestore Rules configuradas
- [ ] `.env.local` creado con credenciales
- [ ] `npm install` ejecutado
- [ ] `npm run dev` corriendo
- [ ] Página se abre en http://localhost:5173
- [ ] Puedo ver categorías
- [ ] Puedo seleccionar categoría y ver recetas
- [ ] Puedo abrir modal de detalles
- [ ] Puedo registrarme
- [ ] Puedo iniciar sesión
- [ ] Puedo guardar favoritos
- [ ] Puedo ver mis favoritos en perfil

---

## 🆘 Ayuda

Si algo no funciona:

1. **Abre DevTools**: F12
2. **Ve a la tab "Console"**
3. **Busca mensajes de error rojo**
4. **Lee el error cuidadosamente**
5. **Compara con las soluciones en "Troubleshooting"**
6. **Si persiste: Revisa los logs de Firebase Console**

---

**¡Listo! Ahora sí deberías tener la app completamente funcional.** 🚀

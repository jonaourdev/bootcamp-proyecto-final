# DonHielo Frontend

Frontend del e-commerce **DonHielo**, una tienda web enfocada en la venta de productos congelados. El proyecto está construido con **React + Vite**, estilizado con **Tailwind CSS**, y organiza la navegación en rutas públicas y privadas para simular la experiencia de un cliente invitado y un usuario autenticado.

## Descripción general

La aplicación implementa el flujo visual principal de una tienda online: landing pública, autenticación, catálogo de productos, detalle de producto, carrito de compras, landing privada y perfil de usuario. La navegación se define con `react-router-dom`, incluyendo rutas protegidas mediante un componente `ProtectedRoute`.

Actualmente, el proyecto usa **Context API** para el estado global de autenticación y carrito, y persiste ambos en `localStorage`. El login funciona en modo prototipo con un usuario demo, lo que permite probar el flujo privado sin depender aún del backend.

## Características principales

- Landing page pública con propuesta visual, beneficios y productos destacados.
- Login y registro con `react-hook-form`.
- Landing privada para usuarios autenticados.
- Perfil de usuario con datos simulados y pedidos recientes.

## Stack tecnológico

- **React 19**
- **Vite 8**
- **Tailwind CSS 4** con plugin `@tailwindcss/vite`
- **React Router DOM 7**
- **React Hook Form**
- **Axios**
- **Context API** para autenticación y carrito
- **ESLint** para linting

Estas dependencias y scripts están declarados en `package.json`, mientras que la integración de Tailwind se configura en `vite.config.js` y `src/index.css`.

## Estructura del proyecto

```text
frontend/
├─ public/
├─ src/
│  ├─ assets/
│  │  └─ pages/
│  │     └─ user/
│  │        ├─ LandingPublic.jsx
│  │        ├─ LoginPage.jsx
│  │        ├─ RegisterPage.jsx
│  │        ├─ LandingLogged.jsx
│  │        ├─ ProductsPage.jsx
│  │        ├─ ProductDetailPage.jsx
│  │        ├─ ProfilePage.jsx
│  │        └─ CartPage.jsx
│  ├─ components/
│  │  ├─ MainNavbar.jsx
│  │  ├─ ProductCard.jsx
│  │  ├─ CartItem.jsx
│  │  └─ CartSummary.jsx
│  ├─ context/
│  │  ├─ AuthContext.jsx
│  │  └─ CartContext.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ index.css
├─ package.json
└─ vite.config.js
```

La presencia de estas carpetas y archivos se observa en el árbol del repositorio, incluyendo `components`, `context` y la carpeta `assets/pages/user` con las vistas principales.

## Rutas implementadas

### Públicas

- `/` → Landing pública
- `/login` → Inicio de sesión
- `/register` → Registro
- `/productos` → Catálogo
- `/productos/:id` → Detalle de producto

### Protegidas

- `/home` → Landing privada
- `/perfil` → Perfil del usuario
- `/carrito` → Carrito de compras

Estas rutas están definidas en `App.jsx` y protegidas mediante `ProtectedRoute`.

## Manejo de estado

### Autenticación

`AuthContext` guarda `user`, `token`, `isAuthenticated`, además de `login` y `logout`. También hidrata el estado desde `localStorage`, para mantener la sesión al recargar.

### Carrito

`CartContext` centraliza `cartItems`, `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`, `totalItems` y `subtotal`, persistiendo los productos en `localStorage`.

## Componentes reutilizables

El proyecto ya incorpora reutilización de componentes mediante props y renderización dinámica:

- `MainNavbar` reutiliza la barra principal en distintas vistas y adapta acciones según autenticación.
- `ProductCard` renderiza tarjetas de catálogo a partir del arreglo de productos.
- `CartItem` representa cada producto dentro del carrito y recibe callbacks por props.
- `CartSummary` desacopla el resumen de compra del resto de la vista del carrito.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/jonaourdev/bootcamp-proyecto-final.git
cd bootcamp-proyecto-final/frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Levantar entorno de desarrollo

```bash
npm run dev
```

### 4. Otros scripts disponibles

```bash
npm run build
npm run preview
npm run lint
```

Los scripts `dev`, `build`, `preview` y `lint` están definidos en `package.json`.

## Estado actual del proyecto

El frontend está enfocado en el **prototipo funcional de la experiencia de usuario**. Varias vistas consumen datos mockeados directamente dentro de los componentes, por ejemplo el catálogo y el detalle de producto, por lo que el siguiente paso natural es conectar esas vistas a una API real y centralizar los datos en servicios o módulos compartidos.

El proyecto ya tiene `axios` instalado, pero en el código visible del frontend actual el flujo principal de autenticación y carrito todavía se resuelve localmente con Context y datos demo.

## Mejoras sugeridas

- Conectar autenticación y catálogo a backend real.
- Mover los productos mock a un módulo de datos o servicio dedicado.
- Agregar manejo de errores, loaders y estados vacíos adicionales.
- Incorporar checkout real y persistencia de pedidos.
- Normalizar estructura de carpetas para separar `pages` de `assets`.
- Eliminar dependencias no usadas si el estado global ya se resolvió con Context API.

La recomendación sobre limpieza de dependencias aplica porque `zustand` aún aparece en `package.json`, mientras que la implementación visible de autenticación y carrito usa `context/`.

## Autor

**José Naour**  
Repositorio: `jonaourdev/bootcamp-proyecto-final` en GitHub.

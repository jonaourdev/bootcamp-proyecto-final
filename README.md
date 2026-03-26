# DonHielo Frontend

Frontend del e-commerce **DonHielo**, una tienda web enfocada en la venta de productos congelados. El proyecto está construido con **React + Vite**, estilizado con **Tailwind CSS**, y organiza la navegación en rutas públicas y privadas para simular la experiencia de un cliente invitado y un usuario autenticado.

## Descripción general

La aplicación implementa el flujo visual principal de una tienda online: landing pública, autenticación, catálogo de productos, detalle de producto, carrito de compras, landing privada y perfil de usuario. La navegación se define con `react-router-dom`, incluyendo rutas protegidas mediante un componente `ProtectedRoute`. citeturn301716view1turn537763view0turn638638view3

Actualmente, el proyecto usa **Context API** para el estado global de autenticación y carrito, y persiste ambos en `localStorage`. El login funciona en modo prototipo con un usuario demo, lo que permite probar el flujo privado sin depender aún del backend. citeturn537763view2turn537763view3turn926078view0

## Características principales

- Landing page pública con propuesta visual, beneficios y productos destacados. citeturn926078view3
- Login y registro con `react-hook-form`. citeturn301716view0turn926078view0turn926078view1
- Landing privada para usuarios autenticados. citeturn926078view4turn537763view0
- Catálogo de productos con búsqueda, filtro por categoría y renderización dinámica. citeturn638638view0turn321329view0
- Vista de detalle de producto con selector de cantidad y agregado al carrito. citeturn638638view1turn537763view3
- Carrito de compras conectado a estado global con Context API. citeturn638638view2turn537763view3turn321329view1turn321329view2
- Perfil de usuario con datos simulados y pedidos recientes. citeturn926078view2
- Navbar reutilizable que adapta acciones según autenticación y cantidad de items en el carrito. citeturn537763view4turn537763view2turn537763view3

## Stack tecnológico

- **React 19**
- **Vite 8**
- **Tailwind CSS 4** con plugin `@tailwindcss/vite`
- **React Router DOM 7**
- **React Hook Form**
- **Axios**
- **Context API** para autenticación y carrito
- **ESLint** para linting

Estas dependencias y scripts están declarados en `package.json`, mientras que la integración de Tailwind se configura en `vite.config.js` y `src/index.css`. citeturn301716view1turn301716view0turn363369view0turn363369view2

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

La presencia de estas carpetas y archivos se observa en el árbol del repositorio, incluyendo `components`, `context` y la carpeta `assets/pages/user` con las vistas principales. citeturn369243view0turn263276view0turn468542view0turn468542view1

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

Estas rutas están definidas en `App.jsx` y protegidas mediante `ProtectedRoute`. citeturn537763view0turn638638view3

## Manejo de estado

### Autenticación

`AuthContext` guarda `user`, `token`, `isAuthenticated`, además de `login` y `logout`. También hidrata el estado desde `localStorage`, para mantener la sesión al recargar. citeturn537763view2

### Carrito

`CartContext` centraliza `cartItems`, `addToCart`, `removeFromCart`, `increaseQuantity`, `decreaseQuantity`, `clearCart`, `totalItems` y `subtotal`, persistiendo los productos en `localStorage`. citeturn537763view3

## Componentes reutilizables

El proyecto ya incorpora reutilización de componentes mediante props y renderización dinámica:

- `MainNavbar` reutiliza la barra principal en distintas vistas y adapta acciones según autenticación. citeturn537763view4
- `ProductCard` renderiza tarjetas de catálogo a partir del arreglo de productos. citeturn321329view0turn638638view0
- `CartItem` representa cada producto dentro del carrito y recibe callbacks por props. citeturn321329view1turn638638view2
- `CartSummary` desacopla el resumen de compra del resto de la vista del carrito. citeturn321329view2turn638638view2

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

Los scripts `dev`, `build`, `preview` y `lint` están definidos en `package.json`. citeturn301716view1

## Estado actual del proyecto

El frontend está enfocado en el **prototipo funcional de la experiencia de usuario**. Varias vistas consumen datos mockeados directamente dentro de los componentes, por ejemplo el catálogo y el detalle de producto, por lo que el siguiente paso natural es conectar esas vistas a una API real y centralizar los datos en servicios o módulos compartidos. citeturn638638view0turn638638view1

El proyecto ya tiene `axios` instalado, pero en el código visible del frontend actual el flujo principal de autenticación y carrito todavía se resuelve localmente con Context y datos demo. citeturn301716view0turn537763view2turn537763view3turn926078view0

## Mejoras sugeridas

- Conectar autenticación y catálogo a backend real.
- Mover los productos mock a un módulo de datos o servicio dedicado.
- Agregar manejo de errores, loaders y estados vacíos adicionales.
- Incorporar checkout real y persistencia de pedidos.
- Normalizar estructura de carpetas para separar `pages` de `assets`.
- Eliminar dependencias no usadas si el estado global ya se resolvió con Context API.

La recomendación sobre limpieza de dependencias aplica porque `zustand` aún aparece en `package.json`, mientras que la implementación visible de autenticación y carrito usa `context/`. citeturn301716view0turn468542view1turn537763view2turn537763view3

## Autor

**José Naour**  
Repositorio: `jonaourdev/bootcamp-proyecto-final` en GitHub. citeturn341271view0

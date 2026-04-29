# Backend JWT Authentication API

Este proyecto implementa un sistema de autenticación y autorización REST API utilizando **Node.js**, **Express**, **Sequelize ORM** y **JWT (JSON Web Tokens)**.

## 🚀 Características Implementadas

*   **Autenticación Basada en JWT:** Registro e inicio de sesión seguros.
*   **Control de Acceso por Roles (RBAC):** Roles predefinidos (`user`, `moderator`, `admin`).
*   **Sistema de Refresh Token:** Renovación de tokens de acceso sin re-autenticación.
*   **Logout Real:** Invalidación efectiva de sesiones al purgar Refresh Tokens de la BD.
*   **Middleware Global de Errores:** Formateo y manejo seguro de excepciones.
*   **Seguridad HTTP:** Cabeceras robustas integradas mediante `helmet`.

## 🛠️ Tecnologías Utilizadas

*   **Node.js**
*   **Express.js**
*   **Sequelize** (con dialecto MySQL)
*   **jsonwebtoken**
*   **bcryptjs**
*   **helmet**

## ⚙️ Instalación y Configuración

1. Clonar el repositorio.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Duplicar el archivo `.env.example` como `.env` y configurar las variables de entorno:
   ```bash
   cp .env.example .env
   ```
4. Levantar la aplicación en modo desarrollo (Crea las tablas automáticamente):
   ```bash
   npm run dev
   ```

## 📡 Endpoints Principales

### Autenticación (`/api/auth/`)
*   `POST /signup` - Registro de usuarios.
*   `POST /signin` - Login (Retorna `accessToken` y `refreshToken`).
*   `POST /refreshtoken` - Renueva el access token vencido.
*   `POST /logout` - Invalida la sesión.

### Pruebas de Acceso (`/api/test/`)
*   `GET /all` - Acceso público.
*   `GET /user` - Requiere usuario autenticado.
*   `GET /mod` - Requiere rol Moderador.
*   `GET /admin` - Requiere rol Administrador.

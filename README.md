# **API REST de Usuarios con Node.js, JS y JWT**

Esta API permite el registro, inicio de sesión y obtención de una lista de usuarios autenticados. En caso de no querer hacer pruebas en la version local puedes utilizar el link de la api desplegada que esta abajo.

---

## **1. Instalación del Proyecto**

```
1-Clona el repositorio:

´´Bash
git clone https://github.com/BrayanMen/ApiUserChallenge.git

2-Entra al directorio del proyecto:

´´Bash
cd PruebaTecnica - BackEnd

3- Instala las dependencias necesarias:

´´Bash
npm install

4- Configura las variables de entorno en un archivo `.env`:

DB_USER= <tu_usuario>
DB_PASSWORD= <tu_contraseña>
DB_HOST= localhost
DB_NAME= apiuserchallenge
JWT_SECRET= apiuserchallenge
PORT= 3001
```

---

## **2. Ejecución del Servidor**

```
node index.js
```

**El servidor estará disponible en:**

 `http://localhost:3001`

---

## **3. Documentación de la API con Swagger**

La documentación de la API está disponible en:
[`http://localhost:3001/api-docu`](http://localhost:3001/api-docu)

En esta interfaz interactiva podrás:

* Explorar las rutas disponibles.
* Realizar pruebas directamente desde el navegador.
* Ver ejemplos de solicitudes y respuestas.

---

## **4. Rutas Disponibles**

### **Autenticación y Gestión de Usuarios**

#### **1. Registro de Usuario**

* **URL:** `/register`
* **Método:** `POST`
* **Descripción:** Crea un nuevo usuario en la base de datos.
* **Parámetros (Body):**

```
{
    "username": "usuario1",
    "email": "usuario1@example.com",
    "password": "password123"
  }
```

* **Respuestas:**
  * `201`: Usuario registrado exitosamente.
  * `400`: Datos inválidos o usuario ya existente.

---

#### **2. Inicio de Sesión**

* **URL:** `/login`
* **Método:** `POST`
* **Descripción:** Permite a un usuario autenticarse con su correo y contraseña.
* **Parámetros (Body):**

```
{
    "email": "usuario1@example.com",
    "password": "password123"
  }
```

* **Respuestas:**
  * `200`: Inicio de sesión exitoso, devuelve un Token JWT.
  * `401`: Credenciales incorrectas.

---

#### **3. Obtener Lista de Usuarios**

* **URL:** `/get`
* **Método:** `GET`
* **Descripción:** Devuelve una lista de usuarios autenticados.
* **Seguridad:** Requiere Token JWT en el encabezado `Authorization`.
* **Encabezado:**

```
Authorization: Bearer <token>
```

* **Respuestas:**
  * `200`: Devuelve una lista de usuarios.
  * `401`: Token JWT no proporcionado o inválido.

---

## **5. Estructura del Proyecto**

La estructura del proyecto está organizada de la siguiente manera:

```
/src
  ├── /config
  │   ├── db.js
  │   ├── swagger.js
  ├── /controllers
  │   ├── userController.js
  ├── /middleware
  │   ├── auth.js
  │   ├── errorHandler.js
  ├── /models
  │   ├── User.js
  ├── /routes
  │   ├── userRoutes.js
  │   ├── index.js
  ├── server.js
  ├─ index.js
  ├─ .env
  ├─ README.md
```

---

## **6. Seguridad**

* **Autenticación:** Implementada mediante  **JWT (JSON Web Token)** .
* **Manejo de errores:** Middleware global para capturar errores y devolver respuestas claras.

---

## **7. Pruebas con Postman**

1. **Registrar Usuario:**
   * `POST http://localhost:3001/register`
2. **Iniciar Sesión:**
   * `POST http://localhost:3001/login`
3. **Obtener Usuarios (Token JWT requerido):**
   * `GET http://localhost:3001/get`
   * Encabezado: `Authorization: Bearer <token>`

---

## **8. Base de Datos**

Esta API utiliza **PostgreSQL** como base de datos, gestionada a través de  **Sequelize ORM** .

* Asegúrate de que la base de datos está creada con el nombre indicado en el archivo `.env`.
* Ejecuta las migraciones con:

```
npx sequelize-cli db:migrate
```

## **9. Pruebas en la Version Desplegada**

La API está desplegada y lista para ser probada en el siguiente enlace mediante swagger:

**[Documentación Swagger - API de Usuarios](https://apiuserchallenge.onrender.com/api-docu)**

## 10. Notas Finales

* Asegúrate de que el archivo `.env` esté configurado correctamente.
* Reinicia el servidor después de realizar cambios importantes.

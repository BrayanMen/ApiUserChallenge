const {Router} = require('express');
const router = Router();
const { authenticateToken } = require('../middleware/auth');
const { registerUser, loginUser, getUsers } = require('../controllers/userController');


/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Rutas para la gestión de usuarios
 */

// Registro
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Usuarios]
 *     description: Crea un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: usuario1
 *               email:
 *                 type: string
 *                 example: usuario1@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: "uuid"
 *               username: "usuario1"
 *               email: "usuario1@example.com"
 *               token: "jwt-token"
 *       400:
 *         description: Datos inválidos o usuario ya existente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/register', registerUser);

// Iniciar sesion
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Usuarios]
 *     description: Permite a un usuario autenticarse con su correo y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario1@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             example:
 *               message: "Inicio de sesión válido"
 *               token: "jwt-token"
 *       401:
 *         description: Credenciales incorrectas
 *       400:
 *         description: Datos incompletos
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', loginUser);

// Traer todos los usuarios
/**
 * @swagger
 * /get:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Usuarios]
 *     description: Devuelve una lista de todos los usuarios (requiere autenticación).
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               - id: "uuid"
 *                 username: "usuario1"
 *                 email: "usuario1@example.com"
 *       401:
 *         description: Token no válido o no proporcionado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get', authenticateToken, getUsers);

module.exports = router;
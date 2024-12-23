const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User  = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1h' });
};

const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res
            .status(400)
            .json({ error: "Todos los campos deben ser validos" });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return res
            .status(400)
            .json({ error: "Formato de correo invalido" });

        if (password.length < 6) return res
            .status(400)
            .json({ error: "La contraseña debe tener mas de 6 caracteres" });

        const userExist = await User.findOne({ where: { email } });
        if (userExist) return res
            .status(400)
            .json({ error: "El correo ya esta registrado" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            email,
            password: hashPassword
        });

        if (newUser) {
            return res.status(201).json({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                token: generateToken(newUser.id),
            });
        }

        res
            .status(500)
            .json({ error: "Error al registrar el usuario" });
    } catch (error) {
        next(error)
    }
};

const loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) return res
            .status(400)
            .json({ error: "El correo y contraseña son obligatorios" })
        const user = await User.findOne({ where: { email } });
        if (!user) return res
            .status(401)
            .json({ error: "Credenciales erroneas" });

        const matched = await bcrypt.compare(password, user.password);
        if (!matched) return res
            .status(401)
            .json({ error: "Credenciales erroneas" });

        const token = generateToken(user.id);

        res.json({ message: "Inicio de Sesion valido", token })
    } catch (error) {
        next(error)
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ["id","username", "email"]
        });

        res.status(200).json(users)
    } catch (error) {
        next(error);
    }
 };

module.exports = {
    registerUser,
    loginUser,
    getUsers,
};
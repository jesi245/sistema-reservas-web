const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { enviarMailRecuperacion } = require('../utils/emailService')

const SALT_ROUNDS= 10;

exports.registrarUsuario = async (req, res) => {
  try {
    let { nombreHotel, nombreUsuario, password, role } = req.body;

    nombreUsuario = nombreUsuario.toLowerCase();

    // Validación básica
    if (!nombreHotel || !nombreUsuario || !password || !role) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    // Verificar si ya existe el usuario
    const usuarioExistente = await User.findOne({ nombreUsuario });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El nombre de usuario ya está en uso' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombreHotel,
      nombreUsuario,
      password: hashedPassword,
      role: "admin"
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

exports.loginUsuario = async (req, res) => {
  let { nombreUsuario, password } = req.body;
  console.log(nombreUsuario, password)

  nombreUsuario = nombreUsuario.toLowerCase();

  try {
    const user = await User.findOne({ nombreUsuario });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const passwordValida = await bcrypt.compare(password, user.password);
    if (!passwordValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token, 
      user: {
        _id: user._id,
        nombreUsuario: user.nombreUsuario,
        nombreHotel: user.nombreHotel,
        role: user.role,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

exports.recuperarPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ nombreUsuario: email });
    if (!user) {
      return res.status(404).json({ message: 'No existe un usuario con ese correo' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const link = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await enviarMailRecuperacion({
      to: email,
      nombre: user.nombreUsuario,
      link,
    });

    res.json({ message: 'Te enviamos un link para recuperar tu contraseña' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al procesar la solicitud' });
  }
};
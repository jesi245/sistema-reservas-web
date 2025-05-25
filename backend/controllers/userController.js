const User = require('../models/User');
//const bcrypt = require('bcrypt');

exports.registrarUsuario = async (req, res) => {
  try {
    const { nombreHotel, nombreUsuario, password, role } = req.body;

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
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombreHotel,
      nombreUsuario,
      password,
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
    const { nombreUsuario, password } = req.body;

  try {
    const user = await User.findOne({ nombreUsuario });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({
      message: 'Login exitoso',
      user: {
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        nombreHotel: user.nombreHotel,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
}

const Huesped = require('../models/Huesped'); 
const User = require('../models/User'); 
const { generarContrasenaAleatoria } = require('../utils/funciones');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const SALT_ROUNDS = 10;

const generarUserHuesped = async (nombreUsuario) => {
  try {
    const exists = await User.findOne({ nombreUsuario });
    if (exists) return { success: false, message: 'Usuario existente' };

    const randomPassword = generarContrasenaAleatoria();
    console.log(randomPassword)
    const hashedPassword = await bcrypt.hash(randomPassword, SALT_ROUNDS);

    const newUser = new User({
      nombreUsuario,
      password: hashedPassword,
      role: 'huesped'
    });

    const savedUser = await newUser.save();
    return { success: true, data: savedUser, password: randomPassword };
  } catch (err) {
    console.error('Error al generar el Usuario', err);
    return { success: false, message: 'Error interno al crear usuario' };
  }
};

exports.registrarHuesped = async (req, res) => {
  try {
    const {
      nombreHuesped,
      apellidoHuesped,
      email,
      tel,
      fechaNacimiento,
      nacionalidad,
      genero,
      direccion,
      nroPasaporte
    } = req.body;

    

    if (
      !nombreHuesped || !apellidoHuesped || !email || !tel ||
      !fechaNacimiento || !nacionalidad || !genero ||
      !direccion || !direccion.pais || !direccion.calle || !direccion.ciudad || !direccion.codigoPostal ||
      !nroPasaporte
    ) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const huespedExistente = await Huesped.findOne({ $or: [{ email }, { nroPasaporte }] });
    if (huespedExistente) {
      return res.status(400).json({ mensaje: 'Ya existe un huésped con ese email o número de pasaporte' });
    }

    const nuevoHuesped = new Huesped({
      nombreHuesped,
      apellidoHuesped,
      email,
      tel,
      fechaNacimiento,
      nacionalidad,
      genero,
      direccion,
      nroPasaporte,
      role: "huesped"
    });

    await nuevoHuesped.save();
    const resultado = await generarUserHuesped(email);

    if (!resultado.success) {
      return res.status(500).json({ mensaje: 'Error al generar el usuario del huésped' });
    }

    res.status(201).json({ mensaje: `Huésped registrado con éxito, ${resultado.password}`, passwordGenerada: resultado.password });

  } catch (error) {
    console.error('Error al registrar huésped:', error);
    res.status(500).json({ mensaje: 'Error al registrar huésped' });
  }
};


exports.loginHuesped = async (req, res) => {
  let { nombreHuesped, password } = req.body;

  nombreHuesped = nombreHuesped.toLowerCase();

  try {
    const user = await User.findOne({ nombreUsuario: nombreHuesped });

    if (!user) {
      return res.status(404).json({ message: 'Huésped no encontrado' });
    }

    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Buscar datos extendidos del huésped
    const huesped = await Huesped.findOne({ email: nombreHuesped });

    if (!huesped) {
      return res.status(404).json({ message: 'Datos del huésped no encontrados' });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(200).json({
      message: 'Login exitoso',
      token,
      user: {
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        role: user.role,
      },
      huesped,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
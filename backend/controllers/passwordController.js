const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Modelo de usuarios login
const { enviarMailRecuperacion } = require('../utils/emailService'); // Reutilizamos tu servicio de correo

// POST /api/auth/forgot-password
exports.solicitarRecuperacionPassword = async (req, res) => {
  const { email } = req.body;
  

  try {
    const user = await User.findOne({ nombreUsuario: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: 'No se encontró un usuario con ese email.' });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    //const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    const link = `localhost:3000/api/auth/reset-password/${token}`;


    const resultado = await enviarMailRecuperacion({
      to: user.nombreUsuario,
      nombre: user.nombreUsuario,
      link
    });

    if (!resultado.success) {
      console.log('falló')
      return res.status(500).json({ message: 'No se pudo enviar el correo de recuperación.' });
    }


    res.json({ message: 'Se envió un correo con instrucciones para restablecer tu contraseña.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Hubo un error al procesar la solicitud.' });
  }
};

// POST /api/auth/reset-password
exports.resetearPassword = async (req, res) => {
  
  const { token, nuevaPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    const hashedPassword = await bcrypt.hash(nuevaPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token inválido o expirado.' });
  }
};

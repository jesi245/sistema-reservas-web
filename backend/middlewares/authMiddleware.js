const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  // Validar que exista el header y tenga el formato Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o formato incorrecto' });
  }

  const token = authHeader.split(' ')[1]; // Extrae solo el token

  try {
    // Verificamos que el token sea válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntamos los datos decodificados al request (usualmente id, nombreUsuario, role)
    req.user = {
      id: decoded.id,
      nombreUsuario: decoded.nombreUsuario || decoded.username || null,
      role: decoded.role || null
    };

    next(); // Continuar al siguiente middleware/controlador
  } catch (err) {
    console.error('❌ Error al verificar token:', err);
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

module.exports = authenticateToken;


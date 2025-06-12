function authorizeRole(rolePermitido) {
  return (req, res, next) => {
    if (req.user.role !== rolePermitido) {
      return res.status(403).json({ message: 'Acceso denegado: permisos insuficientes' });
    }
    next();
  };
}

module.exports = authorizeRole;

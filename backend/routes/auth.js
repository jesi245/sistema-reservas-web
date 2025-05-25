const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/userController');

// POST /registrar
router.post('/registrar', registrarUsuario);

router.post('/login', loginUsuario)

module.exports = router;
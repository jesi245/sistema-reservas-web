const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/userController');
const { registrarHuesped, loginHuesped } = require('../controllers/huespedController');
const { solicitarRecuperacionPassword, resetearPassword } = require('../controllers/passwordController');



// POST /registrar
router.post('/registrar-admin', registrarUsuario);

router.post('/login-admin', loginUsuario)

router.post('/registrar-huesped', registrarHuesped)

router.post('/login-huesped', loginHuesped)

router.post('/recuperar-password', solicitarRecuperacionPassword);

router.post('/reset-password', resetearPassword);

module.exports = router;
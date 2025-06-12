const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../controllers/userController');
const { registrarHuesped } = require('../controllers/huespedController');


// POST /registrar
router.post('/registrar-admin', registrarUsuario);

router.post('/login-admin', loginUsuario)

router.post('/registrar-huesped', registrarHuesped)

/*router.post('login-huesped', loginHuesped)*/

module.exports = router;
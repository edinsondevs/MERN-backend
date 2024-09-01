/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express')
const router = Router()
const { validarCampos } = require('../middelwares/validar-campos')
const { createUser, renewToken, loginUser } = require('../controllers/auth')
const { check } = require('express-validator')
const { validarJWT } = require('../middelwares/validar-jwt')

router.post(
    '/register',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('correo', 'El correo es obligatorio').isEmail(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('direccion', 'La direccion es obligatoria').not().isEmpty(),
        check('telefono', 'El telefono es obligatorio').not().isEmpty(),
        check('contrasena', 'La contraseña debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos

    ], // middlewares
    createUser)

router.post(
    '/',
    [
        check('correo', 'El correo es obligatorio').isEmail(),
        check('contrasena', 'La contraseña debe ser minimo de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    loginUser)

router.get('/renew', validarJWT, renewToken)


module.exports = router
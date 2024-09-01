const { Router } = require('express');
const { getEventos, createEvento, updateEvento, deleteEvento } = require('../controllers/events.js')
const router = Router();
const { validarJWT } = require('../middelwares/validar-jwt');
const { validarCampos } = require('../middelwares/validar-campos');
const { check } = require('express-validator')

const { isDate } = require('../helpers/isDate.js');

/* 
* CREACION DE CRUD DE LA APLICACION Y TODAS TIENEN QUE VALIDAR EL JWT
* CRUD = CREATE, READ, UPDATE, DELETE
*/

/**
 * OBTENER EVENTOS DEL CALENDARIO
 * @description getEventos: es el controlador
 */
router.get('/', validarJWT, getEventos)

/**
 * CREAR EVENTO NUEVO
 * @description createEvento: es el controlador
*/
router.post(
    '/', 
    validarJWT, 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos
    ], createEvento
)

/**
 * ACTUALIZAR EVENTO 
 * @description updateEvento: es el controlador
*/
router.put('/:id', validarJWT, updateEvento)

/**
 * DELETE EVENTO 
 * @description deleteEvento: es el controlador
*/
router.delete('/:id', validarJWT, deleteEvento)

module.exports = router;
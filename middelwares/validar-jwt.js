const { response, request } = require("express")
const jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    /**
     * @description -> define como se recibe el token viene en los headers
     * @description -> x-token
    */
    const token = req.header('x-token');
    // console.log(token)
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la peticion'
        })
    }

    try {
        const { uid, nombre } = jwt.verify(token, process.env.SECRET_JWT_SEED)

        req.uid = uid;
        req.name = nombre;
    } catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Token no valido'
        })
    }
    next();
}

module.exports = {
    validarJWT
}
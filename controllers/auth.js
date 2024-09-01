const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const createUser = async (req, res = response) =>
{
    const { correo } = req.body;

    try
    {
        let usuario = await Usuario.findOne({ correo });

        if (usuario)
        {
            return res.status(400).json({
                ok: false,
                message: 'El correo ya existe'
            })
        }

        usuario = new Usuario(req.body);
        // ENCRIPTAR CONTRASEÑA
        const salt = bcrypt.genSaltSync();
        usuario.contrasena = bcrypt.hashSync(usuario.contrasena, salt);

        await usuario.save();

        // GENERAR JWT
        const token = await generarJWT(usuario._id, usuario.nombre);

        res.status(201).json({
            mensagge: 'Usuario Creado Correctamente',
            uid: usuario._id,
            nombre: usuario.nombre,
            token,
            ok: true,
        })

    } catch (error)
    {
        console.log('error al crear usuario', error);
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        })
    }


};

const loginUser = async (req, res = response) =>
{
    const { correo, contrasena } = req.body;
    const errors = validationResult(req);

    try
    {
        let usuario = await Usuario.findOne({ correo });

        if (!usuario)
        {
            return res.status(400).json({
                ok: false,
                message: 'Usuario y/o contraseña es incorrecto'
            })
        }

        // CONFIRMAR LAS CONTRASEÑAS
        const validPassword = bcrypt.compareSync(contrasena, usuario.contrasena);
        if (!validPassword)
        {
            return res.status(400).json({
                ok: false,
                message: 'Usuario y/o contraseña es incorrecto'
            })
        }

        // MANEJO DE AUTENTICACION - GENERANDO JSON WEB TOKEN
        const token = await generarJWT(usuario._id, usuario.nombre);

        // RESPONDER SI TODO ESTA OK
        res.status(201).json({
            mensagge: 'Usuario Logeado Correctamente',
            uid: usuario._id,
            nombre: usuario.nombre,
            token,
            ok: true,
        })
    } catch (error)
    {
        console.log('error al crear usuario', error);
        res.status(500).json({
            ok: false,
            message: 'Error en el servidor'
        })
    }
};


const renewToken = async (req, res = response) => {
    const { uid, nombre } = req;

    // Generar nuevo JWT y retornarlo en esta petición
    const token = await generarJWT(uid, nombre);


    res.json({
        ok: true,
        message: 'renew',
        token // es lo mismo que token: token
    })
};


module.exports = {
    createUser,
    renewToken,
    loginUser
}
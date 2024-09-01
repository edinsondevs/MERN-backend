const jwt = require('jsonwebtoken');

const generarJWT = ( uid, nombre ) => {


// Suggested code may be subject to a license. Learn more: ~LicenseLog:2661783515.
    return new Promise( (resolve, reject) => {
        const payload = { uid, nombre };
/**
 * @description -> sign: es la firma del token
 * @description -> payload: es el cuerpo del mensaje
 * @description -> process.env.SECRET_JWT_SEED: es la palabra unica para verificar la originalidad de la firma
 * @description -> { expiresIn: '2h' }: tiempo de expiracion del token horas, dias, etc
*/
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '5h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                console.log('console token', token)
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT
}
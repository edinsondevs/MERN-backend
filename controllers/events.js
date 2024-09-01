const { response, request } = require('express');
const Evento = require('../models/Evento');

const getEventos = async ( req, res= response ) => {
    // let eventos = await Evento.find({ "_id": "66d278ad6e09f6fec096bef4" })
    let eventos = await Evento.find()
    .populate('user', 'nombre edad correo')

    res.json({
        ok: true,
        msg: eventos
    })
}

const createEvento = async (req, res = response) => {
    // Asegurarme que tengo el evento
    const evento = new Evento(req.body);
    
    try {        
        evento.user = req.uid
        const eventoCreado = await evento.save();
        
        res.status(201).json({
            ok: true,
            data: eventoCreado,
            msg: 'Evento creado correctamente'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al crear el evento'
        })
        
    }
}

const updateEvento = async (req = request, res= response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId)

        if(uid !== evento.user.toString()){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para modificar este evento'
            })
        } 
        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        // const eventoUpdate = await Evento.updateOne(
        //     { _id: eventoId },
        //     { $set: nuevoEvento }
        // )

        const eventoUpdate = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true })
        
        res.status(201).json({
            ok: true,
            data: eventoUpdate,
            msg: "Evento actualizado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al modificar el evento'
        })        
    }
}

const deleteEvento = async ( req = request, res= response) => {

    const eventoId = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoId)
        
        if(uid !== evento.user.toString()){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para modificar este evento'
            })
        }     
        await Evento.findOneAndDelete(eventoId)
        
        res.status(201).json({
            ok: true,
            msg: "Evento eliminado"
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error al eliminar el evento'
        })
    }
}


module.exports = {
    getEventos,
    createEvento,
    updateEvento,
    deleteEvento
}
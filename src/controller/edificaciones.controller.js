const Datos = require('../db/Edificaciones.json');
const { generate } = require('shortid');
module.exports = {
  obtenerEdificaciones: (req, res) => {
    const edificacionesConstruidas = Datos.Edificaciones.length;
    if (!edificacionesConstruidas) {
      return res
        .status(200)
        .json(
          'No existen edificaciones registradas previamente, puede crear una usando el método HTTP: POST & enviando los datos en formato JSON'
        );
    }
    const edificaciones = Datos.Edificaciones;
    res.status(200).json({
      edificaciones,
      edificacionesContabilizadas: edificacionesConstruidas,
    });
  },
  obtenerEdificacionId: (req, res) => {
    const edificacion = Datos.Edificaciones.find(
      (edificacionesConstruidas) =>
        edificacionesConstruidas.edificacionID === req.params.edificacionID
    );
    if (!edificacion) {
      res
        .status(404)
        .json(
          'Este edificación no existe, asegurate de enviar el edificacionID correcto'
        );
    } else {
      const objetoRespuesta = {
        mensaje: 'Edificación encontrada correctamente',
        edificacion,
      };
      res.status(200).json(objetoRespuesta);
    }
  },
  crearEdificacion: (req, res) => {
    const datosEdificacion = Object.values(req.body);
    if (!datosEdificacion.length) {
      res.status(400).json('Debes enviar los datos para crear una edificación');
    } else {
      const edificacionAConstruir = {
        edificacionID: generate(),
        ...req.body,
      };
      Datos.Edificaciones.unshift(edificacionAConstruir);
      const edificacionesConstruidas = Datos.Edificaciones.length;
      const objetoRespuesta = {
        mensaje: 'La edificación ha sido construida correctamente!',
        edificaciones: Datos.Edificaciones,
        edificacionesContabilizadas: edificacionesConstruidas,
      };
      res.status(201).json(objetoRespuesta);
    }
  },
  modificarEdificacion: (req, res) => {
    const datosEdificacion = Object.values(req.body);
    if (!datosEdificacion.length) {
      return res
        .status(400)
        .json('Debes enviar los datos para modificar una edificación');
    }
    if (!req.params.edificacionID) {
      return res
        .status(400)
        .json('Debes enviar el edificacionID para modificar una edificación.');
    }
    if (!Datos.Edificaciones.length) {
      return res
        .status(500)
        .json(
          'No existen edificaciones registradas, no puedes modificar ninguna.'
        );
    }
    const edificacionAModificar = Datos.Edificaciones.findIndex(
      (edificacion) => edificacion.edificacionID === req.params.edificacionID
    );
    if (edificacionAModificar <= -1) {
      return res
        .status(404)
        .json(
          'Esta edificación no se encuentra registrada, asegurate de enviar el edificacionID correcto.'
        );
    }
    const nuevosDatosEdificacion = {
      edificacionID: req.params.edificacionID,
      ...req.body,
    };
    Datos.Edificaciones[edificacionAModificar] = nuevosDatosEdificacion;
    const objetoRespuesta = {
      mensaje: 'Edificación modificada correctamente!',
      edificacion: nuevosDatosEdificacion,
      edificacionesContabilizadas: Datos.Edificaciones.length,
    };
    res.status(201).json(objetoRespuesta);
  },
  destruirEdificacion: (req, res) => {
    if (!req.params.edificacionID) {
      return res.status(400).json('Debes enviar el edificacionID a destruir.');
    }
    if (!Datos.Edificaciones.length) {
      return res
        .status(500)
        .json(
          'No existen edificaciones registradas, no puedes destruir ninguna.'
        );
    }
    const indiceEdificacionADestruir = Datos.Edificaciones.findIndex(
      (edificacion) => edificacion.edificacionID === req.params.edificacionID
    );
    if (indiceEdificacionADestruir <= -1) {
      res
        .status(404)
        .json(
          'El edificacionID enviado no corresponde a ninguna edifiación registrada.'
        );
    } else {
      Datos.Edificaciones.splice(indiceEdificacionADestruir, 1);
      const objetoRespuesta = {
        mensaje: 'La edificación ha sido destruida correctamente!',
        edificaciones: Datos.Edificaciones,
        edificacionesContabilizadas: Datos.Edificaciones.length,
      };
      res.status(200).json(objetoRespuesta);
    }
  },
};

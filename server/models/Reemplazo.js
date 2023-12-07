const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ReemplazoSchema = Schema(
  {
    rut_saliente:{
      type: String,
      required: true
    },

    nombre_saliente: {
      type: String,
      required: true
    },

    apellido_saliente: {
      type: String,
      required: true
    },
    rut_entrante:{
      type: String,
      required: true
    },

    nombre_entrante: {
      type: String,
      required: true
    },

    apellido_entrante: {
      type: String,
      required: true
    },

    tipo_turno: {
      type: String,
      required: true
    },

    fecha_inicio: {
      type: Date,
      required: true
    },

    fecha_termino: {
      type: Date,
      required: true
    },

    servicio: {
      type: String,
      required: true
    },

    refresh_token: String
  },
  {
    virtuals:{
      id: {
        get(){
          return this._id
        }
      }
    },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  },
  
)

module.exports = mongoose.model('Reemplazo', ReemplazoSchema)




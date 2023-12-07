const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = Schema(
  {
    rut:{
      type: String,
      required: true,
      unique: true
    },

    nombre: {
      type: String,
      required: true
    },

    apellido: {
      type: String,
      required: true
    },

    fecha_nac: {
      type: String,
      required: true
    },

    direccion: {
      type: String,
      required: true
    },

    telefono: {
      type: Number,
      required: true,
      unique: true
    },
    email:{
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: false, // cambiara  true
      validate: [
        (val) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val),
      ]
    },

    ciudad: {
      type: String,
      required: true
    },

    habilitado: {
      type: String,
      required: true
    },

    tipo_cargo: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    refresh_token: String
  },
  {
    virtuals:{
      full_name: {
        get(){
          return this.nombre + ' ' + this.apellido
        }
      },

      id: {
        get(){
          return this._id
        }
      }
    },
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  },
  
)

module.exports = mongoose.model('User', UserSchema)




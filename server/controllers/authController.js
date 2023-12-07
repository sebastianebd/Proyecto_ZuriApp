const User = require('../models/User')
const Reemplazo = require ('../models/Reemplazo')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zuri.app01@gmail.com',
    pass: 'password2023!'
  }
});

//FUNCION PARA REGISTRO DE USUARIOS
async function register(req, res){
  const {rut, nombre, apellido, fecha_nac, direccion, telefono, email, ciudad, habilitado, tipo_cargo} = req.body

  try {
    const [rutExists, telefonoExist, emailExist] = await Promise.all([
      User.exists({ rut }).exec(),
      User.exists({ telefono }).exec(),
      User.exists({ email }).exec()
    ]);
  
    if (rutExists || telefonoExist || emailExist) {
      return res.sendStatus(409);
    }
  } catch (error) {
    return res.status(500).send("Error en el servidor");
  }

  try {
    const generarPassword = crypto.randomBytes(3).toString('hex');
    hashedPassword = await bcrypt.hash(generarPassword, 10)
    console.log(generarPassword);
    await User.create({rut, nombre, apellido, fecha_nac, direccion, telefono, email, ciudad, habilitado, tipo_cargo ,password: hashedPassword})

    const mailOptions = {
      from: 'zuri.app01@gmail.com',
      to: email, // Usar el correo del usuario
      subject: 'Contraseña generada automáticamente',
      text: `¡Hola ${nombre}! Tu contraseña generada automáticamente es: ${generarPassword}. Recuerda cambiarla después de iniciar sesión.`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(400).json({mensaje: "No se pudo registrar"})
    
  }
}


//FUNCION PARA REGISTRO DE TURNOS
async function registerReemplazo(req, res){
  const {rut_saliente, nombre_saliente, apellido_saliente, rut_entrante, nombre_entrante, apellido_entrante,
        tipo_turno, fecha_inicio, fecha_termino, servicio} = req.body

  try {
    await Reemplazo.create({rut_saliente, nombre_saliente, apellido_saliente, rut_entrante, nombre_entrante, apellido_entrante,
      tipo_turno, fecha_inicio, fecha_termino, servicio})

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(400).json({mensaje: "No se pudo registrar"})
    
  }
}

//FUNCION PARA MOSTRAR REEMPLAZOS
async function mostrarReemplazos(req, res){

  try {
    const datos = await Reemplazo.find();
    res.json(datos);
  } catch (error) {
    console.log(error)
    return res.status(500).json({mensaje: error})
    
  }
}

//FUNCION PARA ELIMINAR REEMPLAZO
async function eliminarReemplazo(req, res) {
  const reemplazoId = req.params.id; // Obtener el ID del parámetro de la URL

  try {
    const reemplazoEliminado = await Reemplazo.findByIdAndDelete(reemplazoId);

    if (!reemplazoEliminado) {
      return res.status(404).json({ mensaje: 'Reemplazo no encontrado' });
    }
    const datos = await Reemplazo.find();
    res.json(datos);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensaje: error });
  }
}

//FUNCION PARA INICIAR SESION
async function login(req, res){
  const {rut, password } = req.body

  if(!rut || !password) return res.status(422).json({'mensaje': 'Campos Invalidos'})
  
  const user = await User.findOne({rut}).exec()

  if(!user) return res.status(401).json({mensaje: "Email o contraseña incorrecta"})

  const match = await bcrypt.compare(password, user.password)

  if(!match) return res.status(401).json({mensaje: "Email o contraseña incorrecta"})

  const accessToken = jwt.sign(
    {
      id: user.id
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: '1800s'
    }
  )

  const refreshToken = jwt.sign(
    {
      id: user.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d'
    }
  )

  user.refresh_token = refreshToken
  await user.save()

  res.cookie('refresh_token', refreshToken, {httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000})
  res.json({access_token: accessToken})
}


//FUNCION PARA CERRAR SESION
async function logout(req, res){
  const cookies = req.cookies

  if(!cookies.refresh_token) return res.sendStatus(204)

  const refreshToken = cookies.refresh_token
  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user){
    res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
    return res.sendStatus(204)
  }

  user.refresh_token = null
  await user.save()

  res.clearCookie('refresh_token', {httpOnly: true, sameSite: 'None', secure: true})
  res.sendStatus(204)
}

async function refresh(req, res){
  const cookies = req.cookies
  if(!cookies.refresh_token) return res.sendStatus(401)

  const refreshToken = cookies.refresh_token

  const user = await User.findOne({refresh_token: refreshToken}).exec()

  if(!user) return res.sendStatus(403)

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if(err || user.id !== decoded.id) return res.sendStatus(403)

      const accessToken = jwt.sign(
        { id: decoded.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1800s' }
      )

      res.json({access_token: accessToken})
    }
  )
}


async function user(req, res){
  
  const user = req.user

  return res.status(200).json(user)
}

module.exports = {register, registerReemplazo, login, logout, refresh, user, mostrarReemplazos, eliminarReemplazo}


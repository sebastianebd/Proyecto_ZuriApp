const express = require('express')
const router = express.Router()
const authControllers = require('../../controllers/authController')
const authMiddleware = require('../../middleware/auth')


router.post('/register', authControllers.register)

router.post('/registerReemplazo', authControllers.registerReemplazo)

router.post('/login', authControllers.login)

router.post('/logout', authControllers.logout)

router.post('/refresh', authControllers.refresh)

router.put('/actualizarReemplazo/:id', authControllers.actualizarReemplazo)

router.get('/reemplazos', authControllers.mostrarReemplazos)

router.get('/usuarios', authControllers.mostrarUsuarios)

router.get('/historial', authControllers.mostrarHistorial)

router.get('/servicios', authControllers.mostrarServicios)

router.get('/tipoTurnos', authControllers.mostrarTipoTurnos)

router.get('/user', authMiddleware, authControllers.user)

router.delete('/eliminarReemplazo/:id', authControllers.eliminarReemplazo)

module.exports = router


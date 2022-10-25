import { User } from "../models/user.model";

var express = require('express');
var router = express.Router();

const { validateToken } = require('../middlewares/auth.middleware');
const { cache } = require('../middlewares/cache.middleware');

const userController = require('../controllers/user.controller')

//Métodos para renderizar as páginas
router.get('/admin/menu', [validateToken, cache], userController.adminMenu)
router.get('/admin/login', cache, userController.adminLoginPage)
router.get('/admin/signUpAdmin', cache, userController.signUpAdminPage)
router.get('/admin/withoutAuth', cache, userController.adminWithoutAuth)
router.get('/withoutAuth', cache, userController.adminWithoutAuth)
router.get('/login', cache, userController.loginUserPage)
router.get('/signUp', cache, userController.signUpUserPage)

//Métodos que fazem alterações nos banco de dados
router.post('/admin/login', userController.loginAdmin)
router.post('/admin/register', userController.createAdmin)
router.post('/register', userController.createUser)
router.post('/login', userController.loginUser)

//API
router.get('/api/user/', userController.APIgetAll)
router.get('/api/user/:cpf', userController.APIgetByCPF)
router.post('/api/user/', userController.APIcreate)
router.delete('/api/user/:cpf', userController.APIdelete)

module.exports = router;

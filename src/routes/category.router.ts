import { User } from "../models/user.model";

var express = require('express');
var router = express.Router();

const { validateToken } = require('../middlewares/auth.middleware');
const { cache } = require('../middlewares/cache.middleware');

const categoryController = require('../controllers/category.controller')

//Métodos para renderizar as páginas
router.get('/admin/category/', validateToken, categoryController.getAllCategoriesPage)
router.get('/admin/category/create', [validateToken, cache], categoryController.createCategoryPage)
router.get('/admin/category/update/:id', [validateToken, cache], categoryController.updateCategoryPage)
router.get('/admin/category/delete/:id', [validateToken, cache], categoryController.deleteCategoryPage)

//Métodos que fazem alterações nos banco de dados
router.post('/admin/category/create', validateToken, categoryController.create)
router.post('/admin/category/update', validateToken, categoryController.update)
router.post('/admin/category/delete', validateToken, categoryController.delete)

//API
router.get('/api/category/', categoryController.APIgetAll)
router.get('/api/category/:id', categoryController.APIgetById)
router.post('/api/category/', categoryController.APIcreate)
router.delete('/api/category/:id', categoryController.APIdelete)
router.put('/api/category/:id', categoryController.APIupdate)

module.exports = router;

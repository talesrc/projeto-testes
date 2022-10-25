import { User } from "../models/user.model";

var express = require('express');
var router = express.Router();

const productController = require('../controllers/product.controller')


const { validateToken } = require('../middlewares/auth.middleware');
const { cache } = require('../middlewares/cache.middleware');
const image = require('../middlewares/image.middleware');


//Métodos para renderizar as páginas
router.get('/admin/product/', [validateToken], productController.adminGetAllProductsPage)
router.get('/admin/product/create', [validateToken, cache], productController.createProductPage)
router.get('/admin/product/update/:id', [validateToken, cache], productController.updateProductPage)
router.get('/admin/product/delete/:id', [validateToken, cache], productController.deleteProductPage)
router.get('/product/:id', cache, productController.productPage)
router.get('/', cache, productController.userGetAllProductsPage)

//Métodos que fazem alterações nos banco de dados
router.post('/admin/product/create', [validateToken, image.upload.single('image')], productController.create)
router.post('/admin/product/update', validateToken, productController.update)
router.post('/admin/product/delete', validateToken, productController.delete)

//API
router.get('/api/product/', productController.APIgetAll)
router.get('/api/product/:id', productController.APIgetById)
router.post('/api/product/', productController.APIcreate)
router.delete('/api/product/:id', productController.APIdelete)
router.put('/api/product/:id', productController.APIupdate)

module.exports = router;

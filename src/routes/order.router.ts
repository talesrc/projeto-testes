var express = require('express');
var router = express.Router();

const orderController = require('../controllers/order.controller')

const auth = require('../middlewares/auth.middleware');

//Métodos para renderizar as páginas
router.get('/admin/order', auth.validateToken, orderController.getAllOrdersPage)
router.get('/cart', orderController.userCartPage)

//Métodos que fazem alterações
router.post('/user/createOrder', auth.validateToken, orderController.create)
router.post('/order/addProduct/:id', orderController.addProductOrder)
router.post('/order/removeProduct/:id', orderController.removeCartProduct)

//API
router.put('/update', orderController.update)
router.delete('/delete', orderController.delete)
router.get('/getById/:id', orderController.getById)
router.get('/getByUserId/:id', orderController.getByUserId)

module.exports = router;

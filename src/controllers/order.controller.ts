import { Request, Response } from "express"
import { Order } from "../models/order.model"
import { Product } from "../models/product.model"
const jwt = require("jsonwebtoken");

const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

exports.getAllOrdersPage = async (req: Request, res: Response) => {
    await Order.findAll({ raw: true })
        .then(result => {
            res.render('admin/order/order', {
                orders: result
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/menu')
        })
}

exports.addProductOrder = async (req: Request, res: Response) => {
    let order_products = req.cookies.order_products
    if (!order_products) {
        order_products = []
    }
    order_products.push(req.params.id)
    res.cookie('order_products', order_products)
    res.redirect(`/cart`)
}

exports.create = async (req: Request, res: Response) => {
    const accessToken = req.cookies.access_token
    const { cpf } = jwt.decode(accessToken)
    const newOrder = {
        userId: cpf,
        status: 'waiting',
        price: req.body.price
    }
    await Order.create<any>(newOrder)
        .then(() => {
            res.redirect('/')
        })
        .catch(e => {
            console.log(e)
            res.redirect('/cart')
        })
}

exports.getByUserId = async (req: Request, res: Response) => {
    await Order.findAll({ where: { userId: req.params.id } })
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.getById = async (req: Request, res: Response) => {
    await Order.findAll({ where: { id: req.params.id } })
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.update = async (req: Request, res: Response) => {
    await Order.update(req.body, { where: { id: req.body.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.delete = async (req: Request, res: Response) => {
    await Order.destroy({ where: { id: req.body.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.userCartPage = async (req: Request, res: Response) => {
    let order_products = req.cookies.order_products
    const products: any = []
    let totalPrice = 0
    if (order_products) {
        for (let productId of order_products) {
            await Product.findByPk(productId, { raw: true })
                .then(result => {
                    products.push(result)
                    totalPrice += result!.price
                })
                .catch(e => {
                    console.log(e)
                    res.redirect('/')
                })
        }
    }
    res.render('user/cart', {
        products: products,
        totalPrice: totalPrice.toFixed(2)
    })
}

exports.removeCartProduct = (req: Request, res: Response) => {
    const orderProducts = req.cookies.order_products
    const productIndex = orderProducts.indexOf(req.params.id);
    console.log(productIndex)
    if (productIndex > -1) {
        orderProducts.splice(productIndex, 1)
        console.log(orderProducts)
    }
    res.cookie('order_products', orderProducts)
    res.redirect('/cart')
}

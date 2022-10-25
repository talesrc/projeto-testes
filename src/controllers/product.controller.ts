import { Request, Response } from "express"
import { Category } from "../models/category.model"
import { Product } from "../models/product.model"
import { ProductCategory } from "../models/productCategory.model"

exports.APIgetAll = async (req: Request, res: Response) => {
    await Product.findAll()
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.APIgetById = async (req: Request, res: Response) => {
    const product = await Product.findByPk(req.params.id)
        .catch(e => {
            console.log(e)
            res.sendStatus(404)
        })
    if(product) {
        res.json(product)
    } else {
        res.sendStatus(404)
    }
}

exports.APIcreate = async (req: Request, res: Response) => {
    await Product.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.APIupdate = async (req: Request, res: Response) => {
    await Product.update(req.body, { where: { id: req.params.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.APIdelete = async (req: Request, res: Response) => {
    await Product.destroy({ where: { id: req.params.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.createProductPage = async (req: Request, res: Response) => {
    await Category.findAll({ raw: true }).then(result => {
        console.log(result)
        res.render('admin/product/createProduct', {
            categories: result
        })
    })
}

exports.adminGetAllProductsPage = async (req: Request, res: Response) => {
    await Product.findAll({ raw: true })
        .then(result => {
            res.render('admin/product/product', {
                products: result
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product')
        })
}

exports.userGetAllProductsPage = async (req: Request, res: Response) => {
    await Product.findAll({ raw: true })
        .then(result => {
            res.render('user/home', {
                products: result
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product')
        })
}

exports.updateProductPage = async (req: Request, res: Response) => {
    const categories = await Category.findAll({ raw: true })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product')
        })
    await Product.findByPk(req.params.id, {
        include: {
            model: Category,
            through: { attributes: [] }
        }
    })
        .then(result => {
            res.render('admin/product/updateProduct', {
                product: JSON.parse(JSON.stringify(result, null, 2)),
                categories: categories
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/home')
        })
}

exports.productPage = async (req: Request, res: Response) => {
    await Product.findByPk(req.params.id, {
        include: {
            model: Category,
            through: { attributes: [] }
        }
    })
        .then(result => {
            res.render('user/product', {
                product: JSON.parse(JSON.stringify(result, null, 2))
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/home')
        })
}

exports.deleteProductPage = async (req: Request, res: Response) => {
    await Product.findByPk(req.params.id, { raw: true })
        .then(result => {
            res.render('admin/product/deleteProduct', {
                product: result
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product/')
        })
}

exports.create = async (req: Request, res: Response) => {
    const productId = await Product.create(req.body, { raw: true })
        .then(result => result.id)
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product/')
        })
    if (req.body.categories) {
        for (let categoryId of req.body.categories) {
            await ProductCategory.create<any>({ productId: productId, categoryId: categoryId })
                .catch(e => console.log(e))
        }
        res.redirect('/admin/product')
    } else {
        res.redirect('/admin/product')
    }
}



exports.update = async (req: Request, res: Response) => {
    console.log(req.body)
    await Product.update(req.body, { where: { id: req.body.id } })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product/')
        })
    await ProductCategory.destroy({ where: { productId: req.body.id } })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product/')
        })
    if (req.body.categories) {
        for (let categoryId of req.body.categories) {
            await ProductCategory.create<any>({ productId: req.body.id, categoryId: categoryId })
                .catch(e => console.log(e))
        }
        res.redirect('/admin/product')
    } else {
        res.redirect('/admin/product')
    }
}

exports.delete = async (req: Request, res: Response) => {
    await Product.destroy({ where: { id: req.body.id } })
        .then(() => res.redirect('/admin/product/'))
        .catch(e => {
            console.log(e)
            res.redirect('/admin/product/')
        })
}

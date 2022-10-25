import { Request, Response } from "express"
import { Category } from "../models/category.model"

exports.APIgetAll = async (req: Request, res: Response) => {
    await Category.findAll()
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.APIcreate = async (req: Request, res: Response) => {
    await Category.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.APIgetById = async (req: Request, res: Response) => {
    const category = await Category.findByPk(req.params.id)
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
    if (category) {
        res.json(category)
    } else {
        res.sendStatus(404)
    }
}

exports.APIupdate = async (req: Request, res: Response) => {
    await Category.update(req.body, { where: { id: req.params.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.APIdelete = async (req: Request, res: Response) => {
    await Category.destroy({ where: { id: req.params.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.getAllCategoriesPage = async (req: Request, res: Response) => {
    await Category.findAll({ raw: true })
        .then(result => {
            res.render('admin/category/category', {
                categories: result
            })
        })
        .catch(e => {
            console.log(e)
            res.render('home')
        })
}

exports.createCategoryPage = (req: Request, res: Response) => {
    res.render('admin/category/createCategory')
}

exports.updateCategoryPage = async (req: Request, res: Response) => {
    await Category.findByPk(req.params.id, { raw: true })
        .then(result => {
            res.render('admin/category/updateCategory', {
                category: result
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/category/')
        })
}

exports.deleteCategoryPage = async (req: Request, res: Response) => {
    await Category.findByPk(req.params.id, { raw: true })
        .then(result => {
            res.render('admin/category/deleteCategory', {
                category: result
            })
        })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/category/')
        })
}

exports.create = async (req: Request, res: Response) => {
    await Category.create(req.body)
        .then(() => res.redirect('/admin/category'))
        .catch(e => {
            console.log(e)
            res.redirect('/admin/category')
        })
}

exports.update = async (req: Request, res: Response) => {
    await Category.update(req.body, { where: { id: req.body.id } })
        .then(() => {
            res.redirect('/admin/category/')
        })
        .catch(e => {
            console.log(e)
            res.redirect('/admin/category/')
        })
}

exports.delete = async (req: Request, res: Response) => {
    await Category.destroy({ where: { id: req.body.id } })
        .then(() => res.redirect('/admin/category/'))
        .catch(e => {
            console.log(e)
            res.redirect('/admin/category/')
        })
}

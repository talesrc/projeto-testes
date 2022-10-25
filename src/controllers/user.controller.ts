import { Request, Response } from "express"
import { User } from "../models/user.model"

const jwt = require("jsonwebtoken");

exports.APIgetAll = (req: Request, res: Response) => {
    User.findAll({attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
    .then(result => res.json(result))
    .catch(e => {
        console.log(e)
        res.sendStatus(400)
    })
}

exports.APIgetByCPF = (req: Request, res: Response) => {
    User.findByPk(req.params.cpf, {attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
    .then(result => res.json(result))
    .catch(e => {
        console.log(e)
        res.sendStatus(400)
    })
}

exports.APIcreate = (req: Request, res: Response) => {
    if (req.body.cpf )
    User.create(req.body)
    .then(()=> res.sendStatus(201))
    .catch(e => {
        console.log(e)
        res.sendStatus(400)
    })
}

exports.APIupdate = (req: Request, res: Response) => {
    User.update(req.body, {where: {id: req.params.cpf}})
    .then(()=> res.sendStatus(201))
    .catch(e => {
        console.log(e)
        res.sendStatus(400)
    })
}

exports.APIdelete = (req: Request, res: Response) => {
    User.destroy({where: {cpf: req.params.cpf}})
    .then(()=> res.sendStatus(201))
    .catch(e => {
        console.log(e)
        res.sendStatus(400)
    })
}

exports.getByCPF = async (req: Request, res: Response) => {
    await User.findByPk(req.params.cpf)
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.createAdmin = async (req: Request, res: Response) => {
    if (req.body.name.length > 0 && req.body.cpf.length > 0 && req.body.email.length > 0 && req.body.password.length > 0) {
        await User.create<any>({
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
            password: req.body.password,
            type: 'admin'
        })
            .then(() => res.redirect('/admin/login'))
            .catch(e => {
                console.log(e)
                res.redirect('/admin/signup')
            })
    }
}

exports.createUser = async (req: Request, res: Response) => {
    if (req.body.name.length > 0 && req.body.cpf.length > 0 && req.body.email.length > 0 && req.body.password.length > 0) {
        await User.create<any>({
            name: req.body.name,
            cpf: req.body.cpf,
            email: req.body.email,
            password: req.body.password,
            type: 'user'
        })
            .then(() => res.redirect('/login'))
            .catch(e => {
                console.log(e)
                res.redirect('/signup')
            })
    }
}

exports.update = async (req: Request, res: Response) => {
    await User.update(req.body, { where: { id: req.body.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.delete = async (req: Request, res: Response) => {
    await User.destroy({ where: { id: req.body.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.loginAdmin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (req.body.email.length > 0 && req.body.password.length > 0) {
        const user: any = await User.findOne({ raw: true, where: { email: email, password: password } })
            .then(result => {
                return {
                    cpf: result?.cpf,
                    createdAt: result?.createdAt,
                    type: result?.type
                }
            })
            .catch(e => {
                console.log(e)
                res.redirect('/admin/login')
            })

        if (user && user.type == 'admin') {
            const token = jwt.sign(user, 'secretKey', { expiresIn: 6000 })
            res.cookie('access_token', token).redirect('/admin/menu/')
        } else {
            res.redirect('/admin/login/')
        }
    }
}

exports.loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (req.body.email.length > 0 && req.body.password.length > 0) {
        const user: any = await User.findOne({ raw: true, where: { email: email, password: password } })
            .then(result => {
                if (result?.cpf !== undefined) {
                    return {
                        cpf: result?.cpf,
                        createdAt: result?.createdAt,
                        type: result?.type
                    }
                }
            })
            .catch(e => {
                console.log(e)
                res.redirect('/admin/login')
            })

        if (user && user.type == 'user') {
            const token = jwt.sign(user, 'secretKey', { expiresIn: '5h' })
            res.cookie('access_token', token).redirect('/',)
        } else {
            res.redirect('/login/')
        }
    }
}

//Admins
exports.adminMenu = (req: Request, res: Response) => {
    res.render('admin/menu')
}

exports.adminLoginPage = (req: Request, res: Response) => {
    res.render('admin/adminLogin')
}

exports.signUpAdminPage = (req: Request, res: Response) => {
    res.render('admin/signUpAdmin')
}

exports.adminWithoutAuth = (req: Request, res: Response) => {
    res.render('withoutAuth')
}

//Users
exports.loginUserPage = (req: Request, res: Response) => {
    res.render('user/loginUser')
}

exports.signUpUserPage = (req: Request, res: Response) => {
    res.render('user/signUpUser')
}


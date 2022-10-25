import { Request, Response } from "express"
import { Adress } from "../models/adress.model"

exports.getAll = async (req: Request, res: Response) => {
    await Adress.findAll()
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.create = async (req: Request, res: Response) => {
    await Adress.create(req.body)
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.getByUserId = async (req: Request, res: Response) => {
    await Adress.findAll({ where: { userId: req.params.id } })
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.getById = async (req: Request, res: Response) => {
    await Adress.findAll({ where: { id: req.params.id } })
        .then(result => res.json(result))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.update = async (req: Request, res: Response) => {
    await Adress.update(req.body, { where: { id: req.body.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

exports.delete = async (req: Request, res: Response) => {
    await Adress.destroy({ where: { id: req.body.id } })
        .then(() => res.sendStatus(201))
        .catch(e => {
            console.log(e)
            res.sendStatus(400)
        })
}

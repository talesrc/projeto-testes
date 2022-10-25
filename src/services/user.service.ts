import { User } from "../models/user.model"

export const findAll = async () => {
    return User.findAll({ attributes: { exclude: ['password', 'createdAt', 'updatedAt'] } })
        .catch(e => console.log(e))
}

export const create = async (cpf, name, type, email, password) => {
    return await User.create<any>({
        cpf: cpf,
        name: name,
        type: type,
        email: email,
        password: password,
    }, {
        raw: true
    })
        .then(result => {
            return result.cpf
        })
        .catch(e => {
            console.log(e)
            return false
        })
}

export const findOne = async (cpf) => {
    return await User.findByPk(cpf, { raw: true, attributes: { exclude: ['password'] } })
}

export const login = async (email, password) => {
    const user = await User.findOne({
        where: {
            email: email
        },
        attributes: ['email', 'password']
    })
    if (user !== undefined && user?.password === password) {
        return true
    }
    return false
}



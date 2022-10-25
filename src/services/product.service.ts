import { Product } from "../models/product.model"

export const findAllProducts = async () => {
    return Product.findAll()
        .catch(e => console.log(e))
}

export const createProduct = async (name, description, price, author, image) => {
    return await Product.create<any>({
        name: name,
        description: description,
        price: price,
        author: author,
        image: image
    }, {
        raw: true
    })
        .then(result => {
            return result.id
        })
        .catch(e => {
            return
        })
}

export const findOneProduct = async (cpf) => {
    return await Product.findByPk(cpf, { raw: true, attributes: { exclude: ['password'] } })
}

export const updateProduct = async (product) => {
    return await Product.update(product, {
        where: { id: product.id }
    }).then(async (res) => {
        if (res[0] === 1) {
            const updated = await findOneProduct(product.id)
            return updated
        }
        return undefined
    })
}

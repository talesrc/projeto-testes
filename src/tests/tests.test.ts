const { db } = require('../config/config');
const { findAll, create, findOne, login } = require('../services/user.service')
const { createProduct, findAllProducts, findOneProduct, updateProduct } = require('../services/product.service')
const { expect, describe, it, beforeAll, afterEach, test } = require('@jest/globals');
const { User } = require('../models/user.model');

async function connectDB() {
    return db.sync()
}

async function destroyTable() {
    return User.destroy({ truncate: true, cascade: true })
}

const isObject = (thing) => {
    if (
        typeof thing === 'object' &&
        thing !== null &&
        !Array.isArray(thing)
    ) return true
    return false
}

describe('User', () => {
    beforeAll(() => {
        return connectDB()
    })

    test('Find all init with length 0', async () => {
        const response = await findAll()
        expect(response.length).toBe(0)
    })

    test('User creation responds with cpf', async () => {
        const cpf = '12222'
        const response = await create(cpf, 'name', 'type', 'tales@gmail.com', 'password')
        expect(response === cpf).toBe(true)
    })

    test('User creation responds with false when we try to create with a cpf already registered', async () => {
        const response = await create('12222', 'name', 'type', 'email', 'password')
        expect(response === false).toBe(true)
    })

    test('Find one user returns without password', async () => {
        const cpf = '12222'
        const response = await findOne(cpf)
        expect(response.password).toBe(undefined)
    })

    test('Login returns true to valid email and password', async () => {
        await create('1234567890', 'Sérgio', 'admin', 'sergio@gmail.com', 'password')
        const response = await login('sergio@gmail.com', 'password')
        expect(response).toBe(true)
    })
    test('Login returns false to invalid email and password', async () => {
        const response = await login('sergio@gmail.com', 'senha')
        expect(response).toBe(false)
    })
})

describe('Product', () => {
    test('Create product returns productId if success', async () => {
        const response = await createProduct('Percy Jackson', 'Deuses gregos?', 10.99, 'Eu', 'imagePath')
        expect(response).toEqual(1)
    })

    test('Find all products must return an array of two items', async () => {
        await createProduct('Livro 2', 'Muito bom', 15.50, 'Eu', 'imagePath')
        const response = await findAllProducts()
        expect(response.length).toEqual(2)
    })

    test('Find one product must return an object', async () => {
        const response = await findOneProduct(2)
        expect(isObject(response)).toEqual(true)
    })

    test('Find one product must return an object with name equals to modified product', async () => {
        const update = {
            id: 2,
            name: 'modified product'
        }
        const response = await updateProduct(update)
        expect(response.name).toEqual(update.name)
    })
})

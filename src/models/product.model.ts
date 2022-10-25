import { BelongsToMany, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Category } from './category.model'
import { Order } from './order.model'
import { OrderProduct } from './orderProduct.model'
import { ProductCategory } from './productCategory.model'

@Table
export class Product extends Model<Product> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string

    @Column({
        type: DataType.FLOAT,
        allowNull: false
    })
    price: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    author: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    image: string

    //Relations
    @BelongsToMany(() => Category, {through: {model: () => ProductCategory, unique: false}})
    categories: Category[]

    @BelongsToMany(() => Order, {through: {model: () => OrderProduct, unique: false}})
    orders: Order[]
}

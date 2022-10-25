import { BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript'
import { Product } from './product.model'
import { ProductCategory } from './productCategory.model'

@Table
export class Category extends Model<Category> {
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name?: string

    //Relations
    @BelongsToMany(() => Product, {through: {model: () => ProductCategory, unique: false}})
    product: Product[]
}

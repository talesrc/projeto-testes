import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Category } from './category.model'
import { Product } from './product.model'

@Table({indexes: [{unique: false, fields: ['productId', 'categoryId']}]})
export class ProductCategory extends Model<ProductCategory> {

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: false,
        primaryKey: true
    })
    productId?: number

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: false,
        primaryKey: true
    })
    categoryId?: number
}

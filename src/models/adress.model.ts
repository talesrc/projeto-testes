import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { Order } from './order.model'
import { User } from './user.model'

@Table
export class Adress extends Model<Adress> {
    
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    street: string //rua

    @Column({
            type: DataType.STRING,
            allowNull: false
        })
    number: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    district: string //bairro

    @ForeignKey(() => User)
    @Column({
        type: DataType.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'cpf'
        }
    })
    userId: number
    
    //Relations
    @BelongsTo(() => User)
    customer: User
}

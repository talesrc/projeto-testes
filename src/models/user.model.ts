import { Column, DataType, Model, PrimaryKey, Table, HasMany, BelongsTo } from 'sequelize-typescript'
import { Adress } from './adress.model'

@Table({timestamps: true})
export class User extends Model<User> {
    @PrimaryKey
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    cpf?: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name?: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    type: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    email?: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    password?: string

    //Relations
    @HasMany(() => Adress)
    adresses: Adress[]
}

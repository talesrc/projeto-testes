import { Sequelize } from "sequelize-typescript";
import { Adress } from "../models/adress.model";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";
import { Product } from "../models/product.model";
import { OrderProduct } from "../models/orderProduct.model";
import { ProductCategory } from "../models/productCategory.model";
import { Category } from "../models/category.model";

export const db = new Sequelize({
    dialect: 'mariadb',
    host: 'appDB',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'LIVRARIA',
    models: [User, Adress, Product, Order, OrderProduct, Category, ProductCategory],
    define: {
        timestamps: false
    },
    logging: false
});
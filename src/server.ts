import express from 'express';


import { db } from './config/config';

const userRouter = require('./routes/user.router');
const productRouter = require('./routes/product.router');
const orderRouter = require('./routes/order.router');
const categoryRouter = require('./routes/category.router');
var cookieParser = require('cookie-parser')


const path = require('path');

db.sync()
const app = express()

app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', categoryRouter)
app.use('/', userRouter)
app.use('/', productRouter)
app.use('/', orderRouter)

module.exports = app
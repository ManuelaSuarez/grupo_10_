require('dotenv').config();
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const mainRoutes = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cookieParser())
app.use(userLoggedMiddleware)
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use('/', mainRoutes)
app.use('/products', productsRouter);
app.use('/users', usersRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

module.exports = app
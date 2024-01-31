require('dotenv').config();
const express = require("express");
const path = require("path");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const mainRoutes = require('./routes/main');
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

const productRouterApi = require('./routes/api/productApi');
const userRouterApi = require('./routes/api/userApi');

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(cors())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: process.env.SECRET
}))
app.use(userLoggedMiddleware)

app.use('/', mainRoutes)
app.use('/products', productsRouter)
app.use('/users', usersRouter)

app.use((req, res, next) => {
    res.status(404).render("error404")
})

app.use('/api/products', productRouterApi)
app.use('/api/users', userRouterApi)
app.use('/api', productRouterApi)

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

module.exports = app
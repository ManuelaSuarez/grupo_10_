const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/productDetail", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});

app.get("/productCart", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/productCart.html"));
});

app.get("/login-register", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login-register.html"));
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});
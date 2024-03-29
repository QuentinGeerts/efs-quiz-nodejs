// npm install --save express -
const express = require("express");

// npm install --save mongoose
const mongoose = require("mongoose");
const Product = require("./models/Product");

// Utiliser votre lien de  votre DB
mongoose
    .connect(
        "mongodb+srv://user:password@cluster0.w3eho.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => console.log("Connexion à la base de données a réussie."))
    .catch(() => console.log("Connexion à la base de données a échouée."));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );

    next();
});

app.post("/api/products", (req, res, next) => {
    const product = new Product({
        ...req.body,
    });

    product
        .save()
        .then((product) => res.status(201).json({ product }))
        .catch((error) => res.status(400).json({ error }));
});

app.get("/api/products", (req, res, next) => {
    Product.find()
        .then((products) => res.status(200).json({ products }))
        .catch((error) => res.status(400).json({ error }));
});

app.get("/api/products/:id", (req, res, next) => {
    Product.findOne({ _id: req.params.id })
        .then((product) => res.status(200).json({ product }))
        .catch((error) => res.status(400).json({ error }));
});

app.put("/api/products/:id", (req, res, next) => {
    Product.updateOne(
        { _id: req.params.id },
        { ...req.body, _id: req.params.id }
    )
        .then(() => res.status(200).json({ message: "Modified!" }))
        .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/products/:id", (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: "Deleted!" }))
        .catch((error) => res.status(400).json({ error }));
});

// Export de l'app dans tout le projet
module.exports = app;

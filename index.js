/*require is Node.js global function that allows you to extract
contents from module.exports object inside some file.
Unlike regular NPM modules, you don't need to install it 
because it's already inside Node.js */
const express = require('express');
const app = express();
const path = require('path');

//require Products Model from seperate JS file.
const Product = require('./models/product');
//require mongoose.
const mongoose = require('mongoose');

//connect mongoose and set useNewUrslParser: true as recommended.
mongoose.connect('mongodb://127.0.0.1:27017/storeApp', { useNewUrlParser: true })
    .then(() => {
        console.log(' MONGO CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('MONGO ERROR!!!!')
        console.log(err)
    })

// connect views and set path to be accessible under Directory.
// set view engine as EJS (Embedded Java Script)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Create RESTful routes
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    res.render('products/index.ejs', { products })
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

//app.listen() function is used to bind and listen the
//connections on the specified host and port.
app.listen(3000, () => {
    console.log('App is listening on PORT 3000')
});

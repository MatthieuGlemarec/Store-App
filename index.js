/*require is Node.js global function that allows you to extract
contents from module.exports object inside some file.
Unlike regular NPM modules, you don't need to install it 
because it's already inside Node.js */
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); /* <- Lets you use HTTP verbs such as PUT or DELETE
 in places where the client doesn't support it. */

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];

//Create RESTful routes
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index.ejs', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index.ejs', { products, category: 'All' })
    }
})

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})


app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save()
    console.log(newProduct)
    res.redirect('products')
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})


//app.listen() function is used to bind and listen the
//connections on the specified host and port.
app.listen(3000, () => {
    console.log('App is listening on PORT 3000')
});

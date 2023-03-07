const Product = require('./models/product');
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/storeApp', { useNewUrlParser: true })
    .then(() => {
        console.log(' MONGO CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('MONGO ERROR!!!!')
        console.log(err)
    })

// const p = new Product({
//     name: 'Grapefruit',
//     price: 1.50,
//     category: 'fruit'
// })
// p.save().then(res => {
//     console.log(res)
// })
//     .catch(err => {
//         console.log(err)
//     })

const seedProducts = [
    {
        name: 'Dozen Eggs',
        price: 3.99,
        category: 'dairy'
    },
    {
        name: 'Rock Melon',
        price: 2.99,
        category: 'fruit'
    },
    {
        name: 'Potatoes 1kg',
        price: 3.99,
        category: 'vegetable'
    },
    {
        name: 'Strawberries',
        price: 3.49,
        category: 'fruit'
    },
    {
        name: 'Organic Onions 1kg',
        price: 2.49,
        category: 'vegetable'
    },
    {
        name: 'Milk 1L',
        price: 3.49,
        category: 'dairy'
    },
]


Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
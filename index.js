const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp', { useNewUrlParser: true })
    .then(() => {
        console.log(' MONGO CONNECTION OPEN!')
    })
    .catch(err => {
        console.log('MONGO ERROR!!!!')
        console.log(err)
    })


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
    res.send('Tehehehe welcome HOME')
})

app.listen(3000, () => {
    console.log('App is listening on PORT 3000')
});

const express = require('express')
const app = express()
const path = require('path')

const db = require('./db')
const { Product, Category } = db.models

const port = process.env.PORT || 3000
app.listen(port, ()=> console.log(`Now listening to port: ${port}`))


// Instead of the Express Static that is usually used (for no real reason)
// This is jut saying if a request with /app.js comes in then we are going to return the file main.js situated in the dist folder.
app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')))

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')))


app.get('/api/categories', (req, res, next)=> {
  Category.findAll({
    include: [Product]
  })
    .then(categories => res.send(categories))
    .catch(next)
})

app.delete('/api/categories/:id', (req, res, next)=> {
  Category.destroy({
    where: { id: req.params.id }
  })
    .then(()=> res.sendStatus(204))
    .catch(next)
})

app.delete('/api/categories/:categoryId/products/:id', (req, res, next)=> {
  Product.destroy({
    where: { id: req.params.id, categoryId: req.params.categoryId }
  })
    .then(()=> res.sendStatus(204))
    .catch(next)
})

app.post('/api/categories', (req, res, next)=> {
  Category.createFakeCategory()
    .then(category => res.send(category))
    .catch(next)
})

app.post('/api/categories/:id/products', (req, res, next)=> {
  Category.findByPk(req.params.id)
    .then(category => category.createFakeProduct())
    .then(product => res.send(product))
    .catch(next)
})



db.syncAndSeed()

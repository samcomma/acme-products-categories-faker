const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL)

const faker = require('faker')

const Category = conn.define('category', {
  name: Sequelize.STRING
})

const Product = conn.define('product', {
  name: Sequelize.STRING
})

Category.createFakeCategory = function() {
  return this.create({ name: faker.commerce.department() })
}

Category.prototype.createFakeProduct = function() {
  return Product.create({ 
    name: faker.commerce.productName(),
    categoryId: this.id
  })
}

Category.hasMany(Product)
Product.belongsTo(Category)

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> ['Foo','Bar','Baz'].map( name => Category.create({ name: `${name} Category` })))
    .then(categories => Promise.all(categories))
    .then(categories => {
      return categories.map( category => Product.create({ name: `${ category.name.split(' ')[0] } Product`, categoryId: category.id }))
    })
}


module.exports = {
  syncAndSeed,
  models: {
    Category,
    Product
  }
}
import React from 'react'
import ProductItem from './ProductItem'

const CategoryItem = (props)=> {
  const { category, deleteCategory, createProduct, deleteProduct } = props

  return (
    <li>
      { category.name }
      <button onClick={ deleteCategory }>x</button>
      <button onClick={ createProduct }>Add Product</button>
      <ul>
        {
          category.products.map(product => {
            return (
              <ProductItem 
                product={ product } 
                key={ product.id }
                deleteProduct={ ()=> deleteProduct(product.id) }  
              />
            )
          })
        }
      </ul>
    </li>
  )
}

export default CategoryItem
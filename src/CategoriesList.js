import React from 'react'
import CategoryItem from './CategoryItem'

const CategoriesList = (props)=> {
  const { categories, createCategory, deleteCategory, createProduct, deleteProduct } = props
  return (
    <div>
      <button onClick={ createCategory }>Add Category</button>
      <ul>
        {
          categories.map(category => {
            return (
              <CategoryItem 
                category={ category } 
                key={ category.id } 
                deleteCategory={ ()=> deleteCategory(category.id) } // this way of passing the deleteCategory prop is passing the deleteCategory function down to CategoryItem and simultaneously providing the relevant Category ID. This saves us also separately passing the Category ID.
                createProduct={ ()=> createProduct(category.id) }
                deleteProduct={ (id)=> deleteProduct(category.id, id) } // at this level we know the category.id we want to use in this function, but not the product id. So we provide the category.id and pass an argument in (called id) which we will then provide in the next component down where we can access it.
              />
            )
          })
        }
      </ul>
    </div>
  )
}

export default CategoriesList
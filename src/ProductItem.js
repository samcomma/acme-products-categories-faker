import React from 'react'

const ProductItem = (props)=> {
  const { product, deleteProduct } = props
  
  return (
    <li>
      { product.name }
      <button onClick={ deleteProduct }>x</button>
    </li>
  )
}

export default ProductItem
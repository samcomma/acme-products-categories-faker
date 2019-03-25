import React, { Component, Fragment } from 'react'
import axios from 'axios'
import CategoriesList from './CategoriesList'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      categories: []
    }
  }

  componentDidMount() {
    this.loadCategories()
  }

  loadCategories = ()=> {
    axios.get('/api/categories')
      .then(({ data })=> this.setState({ categories: data }))
      .catch(ex => console.log(ex))
  }

  createCategory = ()=> {
    axios.post('/api/categories')
      .then(()=> this.loadCategories())
      .catch(ex => console.log(ex))
  }
  
  createProduct = (id)=> {
    axios.post(`/api/categories/${id}/products`)
      .then(()=> this.loadCategories())
      .catch(ex => console.log(ex))
  }

  deleteCategory = (id)=> {
    axios.delete(`/api/categories/${id}`)
      .then(()=> this.loadCategories())
      .catch(ex => console.log(ex))
  }
  
  deleteProduct = (categoryId, id)=> {
    axios.delete(`/api/categories/${categoryId}/products/${id}`)
      .then(()=> this.loadCategories())
      .catch(ex => console.log(ex))
  }
  
  render() {
    const { categories } = this.state
    const { createCategory, createProduct, deleteCategory, deleteProduct } = this
    
    return (
      <Fragment>
        <h2>Categories and Products</h2>
        <CategoriesList 
          categories={ categories }
          createCategory={ createCategory }
          deleteCategory={ deleteCategory }
          createProduct={ createProduct }
          deleteProduct={ deleteProduct }
        />
      </Fragment>
    )
  }
}


import React from 'react'
import Navbar from './components/Navbar'
import Footer from './Footer'
import './productList.css'
import Products from './components/Products'
import { useSelector } from 'react-redux'
import ViewOrder from './components/ViewOrder'



const ProductsList = () => {
 const currentUser = useSelector(state => state.user?.currentUser)

  return (
    <div className='productList'>
     
      <Navbar/>
      <div className = "filter">
        <h4>Filter:</h4>
          <select name="" id="">
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>

      </div>
      <div className='product-show'>

       <Products />
      </div>

       <Footer/>
    </div>
  )
}

export default ProductsList

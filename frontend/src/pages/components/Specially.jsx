import React from 'react'
import { useState } from 'react'
import './specially.css'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'



const Specially = () => {
  let cart = localStorage.getItem('cart');
  cart = JSON.parse(cart);
  console.log(cart)
  const category = cart.categories[1];
  console.log(category)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getApi = async () => {

      const res = await axios.get(`http://localhost:5000/api/products/?category=${category}`);
      setProducts(res.data.slice(0, 2));

    }
    getApi();
  }, [category])
  console.log(products)

  return (
    <div className='specially'>
      <h1>Specially For YOU</h1>
      <div className='your-offers'>
        {
          products.map(items => (
            <Link to={`/product/${items._id}`}>
            <div>
              <img src={items.img} alt="" />
              <h2>{items.title}</h2>
            </div>
            </Link>
          ))
        }
      </div>

    </div>
  )
}

export default Specially

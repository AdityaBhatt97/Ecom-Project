import React, { useState } from 'react'
import Navbar from './components/Navbar'
import './Cart.css'
// import Footer from './Footer'
// import Hero from './components/Images/hero.png'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import StripeCheckout from 'react-stripe-checkout';
import { useEffect } from 'react'
import {   userRequest } from '../RequestMethod'
import { useDispatch } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import {  getTotal, removeItem } from '../Redux/CartRedux'



const Cart = () => {

// const oldToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNDZiYmU1MjgwYTZlZGI5OWQ2OTYwYyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Njk5MTc2OTEsImV4cCI6MTY2OTkyMTI5MX0.fW587k421KNmw_G2nZM8Zm6PfYiMHTGxTt0Lm38-zY8'

    const dispatch = useDispatch();
    const [stripeToken , setStripeToken] = useState(null);
    const history = useNavigate();
    

    dispatch(getTotal())
    // let user = sessionStorage.getItem('userDetails');
    // user = JSON.parse(user)
    let user = useSelector(state => state.user?.currentUser)

    const cart = useSelector(state => state.cart)

    
    const Key = "pk_test_51Ls9VmSATR8mTR5Djqc3PR3Pm0EAe47dh3UAl2PTb2qAYqVr6DI8NyLwjmRrKgd2394wk7y9DirKn6dcMPub8M8s00qeua2aIq"

    

    
    const onToken = (token) => {
        setStripeToken(token)
    }

    

    useEffect(()=> {
       const makeRequest = async() => {
         try{
          const res = await userRequest.post('http://localhost:5000/api/checkout/payment' , {
            token : stripeToken,
            amount : cart.total*100,
        }
        )

        
        history(`/success/${res.data.id}`)
        
         }catch(err){
              console.log(err)
         }
       }

      stripeToken && cart.total>=100 && makeRequest()
       

    } , [stripeToken,cart.total,history])

  const remove = (id) => {
    dispatch(removeItem(id))

  }

   

    

    return (
        <div className='Cart'>
            <Navbar />
            <div className='cart-heading'>

                <h1>YOUR CART</h1>

            </div>

            <div className='cart-total'>

                <div className='cart-product'>
                    <div className='cart-title'>
                        <h2 >Image</h2>
                        <h2>Name</h2>
                        <h2>Quantity</h2>
                        <h2>Color</h2>
                        <h2>Size</h2>
                        <h2>Price</h2>

                    </div>
                    <div className='cart-details'>
                
                   

                        {
                            
                            cart.products.length === 0 ?
                            <h2>YOUR CART IS EMPTY!</h2>
                           :
                           cart.products?.map(item => (


                                <div className="cart-detail">
                                    <img src={item.img} alt="" />
                                    <h3>{item.title}</h3>
                                    <h4>{item.quantity}</h4>
                                    <h4>{item.color}</h4>
                                    <h4>{item.size}</h4>
                                    <h3>{`Rs. ${item.price * item.quantity}`}</h3>
                                    <button onClick={()=> remove(item._id)}>X</button>

                                    
                                </div>
                                
                                ))
                                
                            
                                
                            
                                
                        }

                    </div>
                </div>
                <div className='cart-right'>
                    <div className='cart-shipping'>

                        <h2>Shipping Charge: Rs.150</h2>
                        <h2>Shipping Discount : Rs.-50</h2>
                        <h2 className='total'>{`Total : Rs.${cart.total > 100 ? cart.total + 100 : 0}`}</h2>

                    </div>
                    <div className='cart-buttons '>
                        <Link to={'/'}>
                        <button className='continue-shopping btn'>Continue Shopping</button>
                        </Link>
                        <StripeCheckout
                        name = 'Ecom Project'
                        image = 'https://images-platform.99static.com//cMBAi8cQkv2412QnzWlGbw3j4ME=/309x291:1064x1046/fit-in/590x590/99designs-contests-attachments/63/63533/attachment_63533816'
                        amount={(cart.total +100) * 100}
                        currency = 'INR'
                        token = {onToken}
                        stripeKey = {Key}

                        >

                        <button className='checkout btn' disabled ={!user  || cart.products.length === 0 } >Checkout</button>
                        </StripeCheckout>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart

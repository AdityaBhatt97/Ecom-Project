import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { userRequest } from '../../RequestMethod';
import Navbar from './Navbar';
import './order.css'
import { Link } from 'react-router-dom';

const Order = () => {
    const user = useSelector(state => state.user?.currentUser)
    const [orderList , setOrderList] = useState([]);
    useEffect(() => {
        const getOrder = async() => {
          try{
               const res = await userRequest.get(`/orders/find/${user._id}`);
            //    console.log(res.data[res.data.length -1]);
               setOrderList(res.data[res.data.length-1]);
          }catch(err){
            console.log(err)
          }
        }
        getOrder()
    }, [user])

    console.log(orderList)
  return (
    <div className='order'>
        <Navbar/>



          <div className='orders'>
         <div>
        
        <h1 className='order-title'>YOUR ORDERS</h1>
         </div>
   {  !orderList.products ? 
   <h2 className='no-order'>There Are No Orders! <br /> <Link to={'/products'} style={{textDecoration :'none'}}>
   <h4>Go To Products</h4>
   </Link></h2> :
        <div className='all-orders'>
   


     <h2>{`Order ID : ${orderList._id} `}</h2>

            { 
              orderList.products?.map(items => (
                  <div className='all-order-items'>
                        <img src={items.productImg} alt="" />
                        <h4>{items.productName}</h4>
                        <h4>{items.color}</h4>
                        <h4>{items.size}</h4>
                        <h4>{items.quantity}</h4>
                        <h4>{`Rs.${items.price}`}</h4>

                        
                    </div>
      
                
                ))
              }
            <h2>{`Total : Rs.${orderList.amount}`}</h2>
          
        </div>
          }  
        </div>
              

 
    </div>
  )
}

export default Order

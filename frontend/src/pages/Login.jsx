import React from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import loginUser from '../LoginUser'




const Login = () => {

    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('');
    const dispatch = useDispatch();
   const navigate = useNavigate();
   let currentUser = useSelector(state => state.user.currentUser?.username)
   const { isFetching , error} = useSelector((state) => state.user);
  

  // console.log(loginStart , loginFailure)



    const handleClick = async(e) => {
      e.preventDefault();
      
    const res = await      loginUser(dispatch , {username , password});
          
        }
        if(currentUser){
          navigate('/')
        }

    

        
  return (
    <div className='login-container'>
      <Link to={'/'}>
      <img src='https://images-platform.99static.com//cMBAi8cQkv2412QnzWlGbw3j4ME=/309x291:1064x1046/fit-in/590x590/99designs-contests-attachments/63/63533/attachment_63533816' alt="" />
      </Link>
        <form className='login-bg'>


       <h2>Sign In</h2>
        <input type="text" placeholder='Username' required= {true} onChange={(e) => setUsername(e.target.value)}/>
        <input type="password" placeholder='Password' required={true} onChange={(e) => setPassword(e.target.value)}/>
    {error && <p>Wrong Credentials!</p>}
        <button className='btn' onClick={handleClick} disabled = { isFetching }>Sign In</button>
        </form>
    </div>
  )
}

export default Login

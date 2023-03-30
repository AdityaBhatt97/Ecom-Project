import React from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const handleClick = async () => {
   const res = await  axios.post('http://localhost:5000/api/auth/register', { username, email, password })
    console.log(res)
    if(res.status === 201){

      navigate('/')
    }
     
   
  }
  console.log(username, email, password)
  return (
    <div className='register-container'>
     {/* <div className='black-bg'></div>  */}
     <Link to={'/'}>
      <img src='https://images-platform.99static.com//cMBAi8cQkv2412QnzWlGbw3j4ME=/309x291:1064x1046/fit-in/590x590/99designs-contests-attachments/63/63533/attachment_63533816' alt="" />
      </Link>
      <div className='register-bg'>
        <h2>SIGN-UP</h2>
        <input type="text" placeholder='username' onChange={(e) => setUsername(e.target.value)} />
        <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
        <button className='btn' onClick={handleClick}>Sign Up</button>
  
       
      </div>

     </div>
  )
}

export default Register

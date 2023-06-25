import React from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const handleClick = async () => {
   const res = await  axios.post('http://localhost:5000/api/auth/register', { username, email, password })
    
    if(res.status === 201){

      navigate('/')
    }
     
   
  }
  
  return (
    <div className='register-container'>
     
     <Link to={'/'}>
      <img src='https://images-platform.99static.com//cMBAi8cQkv2412QnzWlGbw3j4ME=/309x291:1064x1046/fit-in/590x590/99designs-contests-attachments/63/63533/attachment_63533816' alt="" />
      </Link>
      <form className='register-bg'>
        <h2>SIGN-UP</h2>
        <input type="text" placeholder='username' required={true} onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder='email' required= {true} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder='password' required= {true} onChange={(e) => setPassword(e.target.value)} />
        <button className='btn' onClick={handleClick}>Sign Up</button>
  
       
      </form>

     </div>
  )
}

export default Register

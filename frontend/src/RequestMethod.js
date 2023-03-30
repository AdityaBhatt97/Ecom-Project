import axios from "axios";

 const userDetail = sessionStorage?.getItem('userDetails');
  const user = JSON.parse(userDetail);

const BASE_URL = 'http://localhost:5000/api'
   const accessToken = user?.accessToken;
 const Token =  accessToken;


// console.log(userDetail.accessToken)

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers : {token : `Bearer ${Token}`}
})


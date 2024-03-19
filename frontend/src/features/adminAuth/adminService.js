import axios from "axios"
const API_URL='/api/admin/'


// login Admin
const adminLogin=async(adminData)=>{
    const response=await axios.post(API_URL+'login',adminData)
    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data
}

//logout admin
const adminLogout=()=>{
  localStorage.removeItem('admin')
}

// get all users
const getAllUsers = async(token)=>{
  const config={
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// block user
const userBlock = async(token, userId) => {
  const config = {
    headers:{
      Authorization:`Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL+'block', {userId}, config)
  return response.data
}

// edit user details
const editUserDetails = async(token, userId, name, email) => {
  const config={
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.put(API_URL+userId, {userId,name,email},config)
  return response.data
}

// add user
const addUser = async(userData, token) => {
const config={
  headers:{
    Authorization: `Bearer ${token}`
  }
}
const response = await axios.post(API_URL+'adduser', {userData}, config)
return response.data
}

// search user
const searchUser = async(query, token) => {
  const config = {
    headers:{
      Authorization: `Bearer ${token}`
    }
  }
  console.log("response", query);
  const response = await axios.post(API_URL+'search', {query}, config)
  console.log("responsedata", response.data);
  return response.data
}

const adminAuthService = {
  adminLogin,
  adminLogout,
  getAllUsers,
  editUserDetails,  
  userBlock,
  addUser,
  searchUser,
}

export default adminAuthService

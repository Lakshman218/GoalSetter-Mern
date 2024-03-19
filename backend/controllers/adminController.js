const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// function for admin login
const loginAdmin = asyncHandler(async(req, res) => {
  const { email, password } = req.body
  console.log("function called");

  const user = await User.findOne({email})

  if(user && user.isAdmin && (await bcrypt.compare(password, user.password)))
   res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    profileUrl:user.profileUrl,
    token: generateToken(user._id),
  })
  else {
    res.status(400)
    throw new Error('Not Authorized')
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

const adminAccount= asyncHandler(
  async(req,res)=> {
      res.json({message:'Admin And user data'})
  }
)

// get all users
const getUsers = asyncHandler(async(req, res)=>{
  const users = await User.find({isAdmin: false});
  console.log("users",users);
  if(users) {
    res.status(200).json({users})
  } else {
    res.status(404);
    throw new Error("Users not found")
  }
})

// edit User
const editUser = asyncHandler(async(req, res) => {
  const {userId, name, email} = req.body
  const updateUser = await User.findByIdAndUpdate(userId,{name,email},{new:true})
  const users = await User.find({isAdmin: false})
  if(users) {
    res.status(200).json({users})
  } else {
    res.status(400)
    throw new Error("User not found")
  }
})

// block user
const userBlock = asyncHandler(async(req, res) => {
  const userId = req.body.userId
  const user = await User.findById(userId)
  if(!user) {
    res.status(400)
    throw new Error('User not found')
  }
  user.isBlock = !user.isBlock;
  await user.save();
  const users = await User.find({isAdmin: false})
  res.status(200).json({users})
})

// search User
const searchUser=asyncHandler(async(req,res)=>{
 
  const {query}=req.body
  console.log("search result",req.body);
  const regex=new RegExp(`^${query}`, 'i');

  const users = await User.find({name:{$regex:regex}})
  res.status(200).json({users});
})

// register user
const registerUser = asyncHandler(async(req, res) => {
  const { name, email, password } = req.body.userData;
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('please add all fields')
  }
  const userExists = await User.findOne({email})

  if(userExists) {
    res.status(400)
    throw new Error('User already exist')
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    name,
    email, 
    password: hashedPassword,
  })
  const users=await find({isAdmin: false})
  if(user) {
    res.status(200).json({users})
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

module.exports={
  loginAdmin,
  adminAccount,
  getUsers,
  editUser,
  userBlock,
  registerUser,
  searchUser,
}
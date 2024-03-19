const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]
      console.log("token in midd",token);
      req.token=token

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const protectAdmin = asyncHandler(async(req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // get token from header
      token = req.headers.authorization.split(' ')[1]
      console.log("token in midd",token);

      // verify
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // get admind from token
      req.admin= await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error);
       res.status(401)
       throw new Error("Not authorized")
    }
  }
  if(!token){
    res.status(401)
    throw new Error("No token")
}
})

module.exports = { protect, protectAdmin }

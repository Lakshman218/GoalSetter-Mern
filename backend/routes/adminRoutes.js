const express = require('express')
const router = express.Router()

const { loginAdmin,adminAccount, getUsers, editUser, userBlock, registerUser, searchUser } = require('../controllers/adminController')
const { protectAdmin } = require('../middleware/authMiddleware')

router.post('/login', loginAdmin)
router.get('/',protectAdmin, getUsers)
// router.get('/account', protectAdmin, adminAccount)
router.post('/block', protectAdmin, userBlock)
router.put('/:userId', protectAdmin, editUser)
router.post('/adduser', protectAdmin, registerUser)
router.post('/search',protectAdmin, searchUser)

module.exports = router

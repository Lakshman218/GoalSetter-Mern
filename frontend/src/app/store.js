import { configureStore } from '@reduxjs/toolkit'
import goalReducer from '../features/goals/goalSlice'
import authReducer from '../features/auth/authSlice'
import adminReducer from '../features/adminAuth/adminAuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminReducer,
    goals: goalReducer,
  },
})

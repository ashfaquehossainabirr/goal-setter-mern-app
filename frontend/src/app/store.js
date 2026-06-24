import { configureStore } from '@reduxjs/toolkit'
import authreducer from '../features/auth/authSlice'
import goalreducer from '../features/goals/goalSlice'

export const store = configureStore({
  reducer: {
    auth: authreducer,
    goals: goalreducer
  },
})
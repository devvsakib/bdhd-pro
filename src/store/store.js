import { configureStore } from '@reduxjs/toolkit'
import facilitiesReducer from './slices/facilitiesSlice'
import doctorsReducer from './slices/doctorsSlice'
import authReducer from './slices/authSlice'
import uiReducer from './slices/uiSlice'

const store = configureStore({
  reducer: {
    facilities: facilitiesReducer,
    doctors: doctorsReducer,
    auth: authReducer,
    ui: uiReducer,
  },
})

export default store

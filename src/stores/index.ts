// ** Toolkit imports
// STORE
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/stores/user'
import auth from 'src/stores/auth'
import role from 'src/stores/role'
import city from 'src/stores/city'
import paymentType from 'src/stores/payment-type'
import productType from 'src/stores/product-type'
import deliveryType from 'src/stores/delivery-type'

export const store = configureStore({
  reducer: {
    user,
    auth,
    role,
    city,
    paymentType,
    productType,
    deliveryType
  },
  middleware: (
    getDefaultMiddleware // redux thunk ở đây
  ) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

// ** Toolkit imports
// STORE
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import user from 'src/stores/apps/user'
import auth from 'src/stores/apps/auth'

export const store = configureStore({
  reducer: {
    user,
    auth
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

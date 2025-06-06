// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import { changePasswordMeAsync, registerAuthAsync, serviceName, updateAuthMeAsync } from './action'

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  TypeError: '',
  isSuccessUpdateMe: true,
  isErrorUpdateMe: false,
  messageUpdateMe: '',
  isSuccessChangePassword: true,
  isErrorChangePassword: false,
  messageChangePassword: ''
}

export const authSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.message = ''
      state.TypeError = ''
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = true
      state.messageUpdateMe = ''
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = true
      state.messageChangePassword = ''
    }
  },
  extraReducers: builder => {
    // Register
    builder.addCase(registerAuthAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(registerAuthAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = !!action.payload?.data?.email
      state.isError = !action.payload?.data?.email
      state.message = action.payload?.message
      state.TypeError = action.payload?.typeError
    })
    builder.addCase(registerAuthAsync.rejected, (state, action) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = true
      state.message = ''
      state.TypeError = ''
    })

    // Update Me
    builder.addCase(updateAuthMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateAuthMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessUpdateMe = !!action.payload?.data?.email
      state.isErrorUpdateMe = !action.payload?.data?.email
      state.messageUpdateMe = action.payload?.message
      state.TypeError = action.payload?.typeError
    })
    builder.addCase(updateAuthMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.TypeError = ''
      state.isSuccessUpdateMe = false
      state.isErrorUpdateMe = false
      state.messageUpdateMe = ''
    })

    // Change Password Me
    builder.addCase(changePasswordMeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(changePasswordMeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessChangePassword = !!action.payload?.data
      state.isErrorChangePassword = !action.payload?.data
      state.messageChangePassword = action.payload?.message
      state.TypeError = action.payload?.typeError
    })
    builder.addCase(changePasswordMeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.TypeError = ''
      state.isSuccessChangePassword = false
      state.isErrorChangePassword = false
      state.messageChangePassword = ''
    })
  }
})

export const { resetInitialState } = authSlice.actions
export default authSlice.reducer

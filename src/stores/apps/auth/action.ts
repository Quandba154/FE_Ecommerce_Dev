import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'
// ** Services
import { registerAuth } from 'src/services/auth'

export const registerAuthAsync = createAsyncThunk('appUsers/register', async (data: any) => {
  const response = await registerAuth(data)
  console.log('response1111', response)

  if (response?.data) {
    return response
  }

  return {
    data: null,
    message: response?.response?.data?.message,
    typeError: response?.response?.data?.typeError
  }
})

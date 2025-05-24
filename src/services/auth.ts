import axios from 'axios'
//** Config */
import { CONFIG_API } from 'src/configs/api'
//** Types */
import { TLoginAuth, TRegisterAuth } from 'src/types/auth'
// ** instanceAxios
import instanceAxios from 'src/helpers/axios'

export const loginAuth = async (data: TLoginAuth) => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/login`, data)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const logoutAuth = async () => {
  try {
    const res = await instanceAxios.post(`${CONFIG_API.AUTH.INDEX}/logout`)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const registerAuth = async (data: TRegisterAuth) => {
  const res = await axios.post(`${CONFIG_API.AUTH.INDEX}/register`, data)
  return res.data
}

export const updateAuthMe = async (data: any) => {
  try {
    const res = await instanceAxios.put(`${CONFIG_API.AUTH.INDEX}/me`, data)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const getAuthMe = async () => {
  try {
    const res = await instanceAxios.get(`${CONFIG_API.AUTH.INDEX}/me`)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

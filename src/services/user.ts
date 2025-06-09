import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamCreateUser, TParamDeleteMultipleUser, TParamEditUser, TParamGetAllUsers } from 'src/types/user/user'

export const getAllUsers = async (data: { params: TParamGetAllUsers }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.USER.INDEX}`, data)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const createUser = async (data: TParamCreateUser) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.USER.INDEX}`, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateUser = async (data: TParamEditUser) => {
  const { id, ...rests } = data
  const res = await instanceAxios.put(`${API_ENDPOINT.USER.INDEX}/${id}`, rests)
  return res.data
}

export const deleteUser = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.USER.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsUser = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.USER.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleUser = async (data: TParamDeleteMultipleUser) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.USER.INDEX}/delete-many`, { data })
    if (res?.data?.status === 'Success') {
      return {
        data: []
      }
    }
    return {
      data: null
    }
  } catch (error: any) {
    return error?.response?.data
  }
}

import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamEditRole, TParamDeleteRole, TParamCreateRole, TParamGetAllRoles } from 'src/types/role/role'

export const getAllRole = async (data: { params: TParamGetAllRoles }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.ROLE.INDEX}`, data)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const createRole = async (data: TParamCreateRole) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.ROLE.INDEX}`, data)
    return res.data
  } catch (error: any) {
    console.error('Error during login:', error)
    return error?.response?.data
  }
}

export const updateRole = async (data: TParamEditRole) => {
  const { id, ...rests } = data
  try {
    const res = await instanceAxios.put(`${API_ENDPOINT.ROLE.INDEX}/${id}`, rests)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const deleteRole = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.ROLE.INDEX}/${id}`)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const getDetailsRole = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.ROLE.INDEX}/${id}`)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

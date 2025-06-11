import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import { TParamCreateCity, TParamGetAllCities, TParamEditCity, TParamDeleteMultipleCity } from 'src/types/city/index'

export const getAllCities = async (data: { params: TParamGetAllCities }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTINGS.CITY.INDEX}`, data)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const createCity = async (data: TParamCreateCity) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTINGS.CITY.INDEX}`, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateCity = async (data: TParamEditCity) => {
  const { id, ...rests } = data
  const res = await instanceAxios.put(`${API_ENDPOINT.SETTINGS.CITY.INDEX}/${id}`, rests)
  return res.data
}

export const deleteCity = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTINGS.CITY.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsCity = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTINGS.CITY.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleCity = async (data: TParamDeleteMultipleCity) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTINGS.CITY.INDEX}/delete-many`, { data })
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

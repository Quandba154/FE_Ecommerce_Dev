import { API_ENDPOINT } from 'src/configs/api'
import instanceAxios from 'src/helpers/axios'
import {
  TParamsCreateDeliveryType,
  TParamsGetDeliveryTypes,
  TParamsEditDeliveryType,
  TParamsDeleteMultipleDeliveryType
} from 'src/types/delivery-type/index'

export const getAllDeliveryTypes = async (data: { params: TParamsGetDeliveryTypes }) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTINGS.DELIVERY_TYPE.INDEX}`, data)
    return res.data
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
}

export const createDelivery = async (data: TParamsCreateDeliveryType) => {
  try {
    const res = await instanceAxios.post(`${API_ENDPOINT.SETTINGS.DELIVERY_TYPE.INDEX}`, data)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const updateDelivery = async (data: TParamsEditDeliveryType) => {
  try {
    const { id, ...rests } = data
    const res = await instanceAxios.put(`${API_ENDPOINT.SETTINGS.DELIVERY_TYPE.INDEX}/${id}`, rests)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteDelivery = async (id: string) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTINGS.DELIVERY_TYPE.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const getDetailsDelivery = async (id: string) => {
  try {
    const res = await instanceAxios.get(`${API_ENDPOINT.SETTINGS.DELIVERY_TYPE.INDEX}/${id}`)
    return res.data
  } catch (error: any) {
    return error?.response?.data
  }
}

export const deleteMultipleDelivery = async (data: TParamsDeleteMultipleDeliveryType) => {
  try {
    const res = await instanceAxios.delete(`${API_ENDPOINT.SETTINGS.DELIVERY_TYPE.INDEX}/delete-many`, { data })
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

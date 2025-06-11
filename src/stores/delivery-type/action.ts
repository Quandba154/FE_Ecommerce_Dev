import { createAsyncThunk } from '@reduxjs/toolkit'
// ** Services
import {
  createDelivery,
  deleteDelivery,
  deleteMultipleDelivery,
  getAllDeliveryTypes,
  updateDelivery
} from 'src/services/delivery-type'

//** Types */
import {
  TParamsGetDeliveryTypes,
  TParamsCreateDeliveryType,
  TParamsEditDeliveryType,
  TParamsDeleteMultipleDeliveryType
} from 'src/types/delivery-type'

export const serviceName = 'delivery-type'

export const getAllDeliveryTypeAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetDeliveryTypes }) => {
    const response = await getAllDeliveryTypes(data)
    return response
  }
)

export const createDeliveryTypeAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreateDeliveryType) => {
    const response = await createDelivery(data)
    return response
  }
)

export const updateDeliveryTypeAsync = createAsyncThunk(
  `${serviceName}/update`,
  async (data: TParamsEditDeliveryType) => {
    const response = await updateDelivery(data)
    return response
  }
)

export const deleteDeliveryTypeAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteDelivery(id)
  return response
})

export const deleteMultipleDeliveryTypeAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultipleDeliveryType) => {
    const response = await deleteMultipleDelivery(data)
    return response
  }
)

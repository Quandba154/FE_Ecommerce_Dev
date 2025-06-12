import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createPaymentType,
  deleteMultiplePaymentType,
  deletePaymentType,
  getAllPaymentTypes,
  updatePaymentType
} from 'src/services/payment-type'

// ** Types
import {
  TParamsCreatePaymentType,
  TParamsDeleteMultiplePaymentType,
  TParamsEditPaymentType,
  TParamsGetPaymentTypes
} from 'src/types/payment-type'

export const serviceName = 'payment-type'

// Lấy tất cả loại sản phẩm
export const getAllPaymentTypeAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetPaymentTypes }) => {
    const response = await getAllPaymentTypes(data)
    return response
  }
)

// Tạo loại sản phẩm mới
export const createPaymentTypeAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreatePaymentType) => {
    const response = await createPaymentType(data)
    return response
  }
)

// Cập nhật loại sản phẩm
export const updatePaymentTypeAsync = createAsyncThunk(
  `${serviceName}/update`,
  async (data: TParamsEditPaymentType) => {
    const response = await updatePaymentType(data)
    return response
  }
)

// Xoá một loại sản phẩm
export const deletePaymentTypeAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deletePaymentType(id)
  return response
})

// Xoá nhiều loại sản phẩm
export const deleteMultiplePaymentTypeAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultiplePaymentType) => {
    const response = await deleteMultiplePaymentType(data)
    return response
  }
)

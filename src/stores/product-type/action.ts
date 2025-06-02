import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createProductType,
  deleteMultipleProductType,
  deleteProductType, 
  getAllProductTypes,
  updateProductType
} from 'src/services/product-type'

// ** Types
import {
  TParamsCreateProductType,
  TParamsDeleteMultipleProductType,
  TParamsEditProductType,
  TParamsGetProductTypes
} from 'src/types/product-type'

export const serviceName = 'product-type'

// Lấy tất cả loại sản phẩm
export const getAllProductTypeAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamsGetProductTypes }, { rejectWithValue }) => {
    try {
      const response = await getAllProductTypes(data)
      return response
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || { message: 'Failed to fetch product types' })
    }
  }
)

// Tạo loại sản phẩm mới
export const createProductTypeAsync = createAsyncThunk(
  `${serviceName}/create`,
  async (data: TParamsCreateProductType, { rejectWithValue }) => {
    try {
      const response = await createProductType(data)
      return response
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || { message: 'Failed to create product type' })
    }
  }
)

// Cập nhật loại sản phẩm
export const updateProductTypeAsync = createAsyncThunk(
  `${serviceName}/update`,
  async (data: TParamsEditProductType, { rejectWithValue }) => {
    try {
      const response = await updateProductType(data)
      console.log('res', { response })
      return response
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || { message: 'Failed to update product type' })
    }
  }
)

// Xoá một loại sản phẩm
export const deleteProductTypeAsync = createAsyncThunk(
  `${serviceName}/delete`,
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteProductType(id)
      return response
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || { message: 'Failed to delete product type' })
    }
  }
)

// Xoá nhiều loại sản phẩm
export const deleteMultipleProductTypeAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamsDeleteMultipleProductType, { rejectWithValue }) => {
    try {
      const response = await deleteMultipleProductType(data)
      return response
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || { message: 'Failed to delete multiple product types' })
    }
  }
)

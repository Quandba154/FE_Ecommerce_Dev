// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Actions
import {
  getAllPaymentTypeAsync,
  createPaymentTypeAsync,
  updatePaymentTypeAsync,
  deletePaymentTypeAsync,
  deleteMultiplePaymentTypeAsync,
  serviceName
} from 'src/stores/payment-type/action'

const initialState = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  message: '',
  typeError: '',
  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageErrorCreateEdit: '',
  isSuccessDelete: false,
  isErrorDelete: false,
  messageErrorDelete: '',
  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  messageErrorMultipleDelete: '',
  productTypes: {
    data: [],
    total: 0
  }
}

export const productTypeSlice = createSlice({
  name: serviceName,
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.message = ''
      state.typeError = ''
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = false
      state.messageErrorCreateEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = false
      state.messageErrorDelete = ''
      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = false
      state.messageErrorMultipleDelete = ''
    }
  },
  extraReducers: builder => {
    // Get all product types
    builder.addCase(getAllPaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllPaymentTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.productTypes.data = action.payload?.data?.productTypes || []
      state.productTypes.total = action.payload?.data?.totalCount || 0
    })
    builder.addCase(getAllPaymentTypeAsync.rejected, state => {
      state.isLoading = false
      state.productTypes.data = []
      state.productTypes.total = 0
    })

    // Create product type
    builder.addCase(createPaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createPaymentTypeAsync.fulfilled, (state, action) => {
      const isSuccess = !!action.payload?.data?._id
      state.isLoading = false
      state.isSuccessCreateEdit = isSuccess
      state.isErrorCreateEdit = !isSuccess
      state.messageErrorCreateEdit = action.payload?.message || ''
      state.typeError = action.payload?.typeError || ''
    })

    // Update product type
    builder.addCase(updatePaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updatePaymentTypeAsync.fulfilled, (state, action) => {
      const isSuccess = !!action.payload?.data?._id
      state.isLoading = false
      state.isSuccessCreateEdit = isSuccess
      state.isErrorCreateEdit = !isSuccess
      state.messageErrorCreateEdit = action.payload?.message || ''
      state.typeError = action.payload?.typeError || ''
    })

    // Delete product type
    builder.addCase(deletePaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deletePaymentTypeAsync.fulfilled, (state, action) => {
      const isSuccess = !!action.payload?.data?._id
      state.isLoading = false
      state.isSuccessDelete = isSuccess
      state.isErrorDelete = !isSuccess
      state.messageErrorDelete = action.payload?.message || ''
      state.typeError = action.payload?.typeError || ''
    })

    // Delete multiple product types
    builder.addCase(deleteMultiplePaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteMultiplePaymentTypeAsync.fulfilled, (state, action) => {
      const isSuccess = !!action.payload?.data
      state.isLoading = false
      state.isSuccessMultipleDelete = isSuccess
      state.isErrorMultipleDelete = !isSuccess
      state.messageErrorMultipleDelete = action.payload?.message || ''
      state.typeError = action.payload?.typeError || ''
    })
  }
})

export const { resetInitialState } = productTypeSlice.actions
export default productTypeSlice.reducer

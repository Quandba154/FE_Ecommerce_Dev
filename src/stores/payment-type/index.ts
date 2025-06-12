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
  isSuccess: false,
  isError: false,
  message: '',
  typeError: '',

  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageCreateEdit: '',

  isSuccessDelete: false,
  isErrorDelete: false,
  messageDelete: '',

  isSuccessMultipleDelete: false,
  isErrorMultipleDelete: false,
  messageMultipleDelete: '',
  paymentTypes: {
    data: [],
    total: 0
  }
}

export const paymentTypeSlice = createSlice({
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
      state.isErrorCreateEdit = true
      state.messageCreateEdit = ''
      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageDelete = ''
      state.isSuccessMultipleDelete = false
      state.isErrorMultipleDelete = true
      state.messageMultipleDelete = ''
    }
  },
  extraReducers: builder => {
    // Get all product types
    builder.addCase(getAllPaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getAllPaymentTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.paymentTypes.data = action.payload?.data?.paymentTypes || []
      state.paymentTypes.total = action.payload?.data?.totalCount || 0
    })
    builder.addCase(getAllPaymentTypeAsync.rejected, state => {
      state.isLoading = false
      state.paymentTypes.data = []
      state.paymentTypes.total = 0
    })

    // Create payment type
    builder.addCase(createPaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createPaymentTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // Update payment type
    builder.addCase(updatePaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(updatePaymentTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // Delete payment type
    builder.addCase(deletePaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deletePaymentTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // Delete multiple payment types
    builder.addCase(deleteMultiplePaymentTypeAsync.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteMultiplePaymentTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = paymentTypeSlice.actions
export default paymentTypeSlice.reducer

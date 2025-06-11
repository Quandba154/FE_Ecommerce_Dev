// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

//.** Action
import {
  serviceName,
  getAllDeliveryTypeAsync,
  createDeliveryTypeAsync,
  updateDeliveryTypeAsync,
  deleteDeliveryTypeAsync,
  deleteMultipleDeliveryTypeAsync
} from './action'

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
  deliveryTypes: {
    data: [],
    total: 0
  }
}

export const deliveryTypeSlice = createSlice({
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
    // **get all deliveryTypes
    builder.addCase(getAllDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllDeliveryTypeAsync.fulfilled, (state, action) => {
      console.log('action', { action })
      state.isLoading = false
      state.deliveryTypes.data = action.payload.data.deliveryTypes || []
      state.deliveryTypes.total = action.payload.data.totalCount
    })
    builder.addCase(getAllDeliveryTypeAsync.rejected, (state, action) => {
      state.isLoading = false
      state.deliveryTypes.data = []
      state.deliveryTypes.total = 0
    })

    // **create deliveryTypes
    builder.addCase(createDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // **update deliveryTypes
    builder.addCase(updateDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // **delete deliveryTypes
    builder.addCase(deleteDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // **delete multiple deliveryTypes
    builder.addCase(deleteMultipleDeliveryTypeAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleDeliveryTypeAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = deliveryTypeSlice.actions
export default deliveryTypeSlice.reducer

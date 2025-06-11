// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

//.** Action
import {
  createCityAsync,
  deleteMultipleCityAsync,
  deleteCityAsync,
  getAllCityAsync,
  serviceName,
  updateCityAsync
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
  cities: {
    data: [],
    total: 0
  }
}

export const citySlice = createSlice({
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
    // **get all cities
    builder.addCase(getAllCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllCityAsync.fulfilled, (state, action) => {
      console.log('action', { action })
      state.isLoading = false
      state.cities.data = action.payload.data.cities || []
      state.cities.total = action.payload.data.totalCount
    })
    builder.addCase(getAllCityAsync.rejected, (state, action) => {
      state.isLoading = false
      state.cities.data = []
      state.cities.total = 0
    })

    // **create city
    builder.addCase(createCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createCityAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // **update city
    builder.addCase(updateCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(updateCityAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data?._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageCreateEdit = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // **delete city
    builder.addCase(deleteCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteCityAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessDelete = !!action.payload?.data?._id
      state.isErrorDelete = !action.payload?.data?._id
      state.messageDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })

    // **delete multiple city
    builder.addCase(deleteMultipleCityAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(deleteMultipleCityAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccessMultipleDelete = !!action.payload?.data
      state.isErrorMultipleDelete = !action.payload?.data
      state.messageMultipleDelete = action.payload?.message
      state.typeError = action.payload?.typeError
    })
  }
})

export const { resetInitialState } = citySlice.actions
export default citySlice.reducer

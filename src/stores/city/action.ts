import { createAsyncThunk } from '@reduxjs/toolkit'
// ** Services
import { createCity, deleteMultipleCity, deleteCity, getAllCities, updateCity } from 'src/services/city'

//** Types */
import { TParamCreateCity, TParamDeleteMultipleCity, TParamEditCity, TParamGetAllCities } from 'src/types/city'

export const serviceName = 'city'

export const getAllCityAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamGetAllCities }) => {
    const response = await getAllCities(data)
    return response
  }
)

export const createCityAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamCreateCity) => {
  const response = await createCity(data)
  return response
})

export const updateCityAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamEditCity) => {
  const response = await updateCity(data)
  return response
})

export const deleteCityAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteCity(id)
  return response
})

export const deleteMultipleCityAsync = createAsyncThunk(
  `${serviceName}/delete-multiple`,
  async (data: TParamDeleteMultipleCity) => {
    const response = await deleteMultipleCity(data)
    return response
  }
)

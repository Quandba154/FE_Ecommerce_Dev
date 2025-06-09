import { createAsyncThunk } from '@reduxjs/toolkit'
// ** Services
import { createUser, deleteMultipleUser, deleteUser, getAllUsers, updateUser } from 'src/services/user'

//** Types */
import { TParamCreateUser, TParamDeleteMultipleUser, TParamEditUser, TParamGetAllUsers } from 'src/types/user/user'

export const serviceName = 'user'

export const getAllUsersAsync = createAsyncThunk(
  `${serviceName}/get-all`,
  async (data: { params: TParamGetAllUsers }) => {
    const response = await getAllUsers(data)

    return response
  }
)

export const createUserAsync = createAsyncThunk(`${serviceName}/create`, async (data: TParamCreateUser) => {
  const response = await createUser(data)
  return response
})

export const updateUserAsync = createAsyncThunk(`${serviceName}/update`, async (data: TParamEditUser) => {
  const response = await updateUser(data)
  return response
})

export const deleteUserAsync = createAsyncThunk(`${serviceName}/delete`, async (id: string) => {
  const response = await deleteUser(id)
  return response
})

export const deleteMultipleUserAsync = createAsyncThunk(`${serviceName}/delete-multiple`, async (data : TParamDeleteMultipleUser) => {
  const response = await deleteMultipleUser(data)
  return response
})

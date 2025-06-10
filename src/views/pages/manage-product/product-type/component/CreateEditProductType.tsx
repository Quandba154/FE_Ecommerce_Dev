// // ** React
// import React, { useEffect, useState } from 'react';
// //
// import { Box, useTheme, Button, Typography, IconButton, Grid, Avatar, InputLabel, FormHelperText, Switch, InputAdornment, TableHead } from '@mui/material';
// import FormControlLabel from '@mui/material/FormControlLabel';

// // ** form
// import { Controller, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup'
// // i18
// import { useTranslation } from 'react-i18next';
// // ** component
// import CustomModal from 'src/components/custom-modal';
// import Spinner from 'src/components/spinner';
// import Iconfi from "src/components/Icon"
// import CustomTextField from 'src/components/text-field';
// import CustomSelect from 'src/components/custom-select';
// import WrapperFileUpload from 'src/components/wrap-file-upload';

// //** redux */
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from 'src/stores';
// import { createUserAsync, updateUserAsync } from 'src/stores/user/action';
// // ** Service
// import { getDetailsUser } from 'src/services/user';
// import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex';
// import { getAllRole } from 'src/services/role';

// //**User */
// import { useAuth } from 'src/hooks/useAuth';

// //**Icon */
// import Iconfy from 'src/components/Icon'

// //**Other */
// import { convertBase64, separationFullName, toFullName } from 'src/utils';
// import { NextPage } from 'next';
// import { usePermission } from 'src/hooks/usePermission';
// import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig';
// import { deleteMultipleProductTypeAsync, deleteProductTypeAsync, getAllProductTypeAsync } from 'src/stores/product-type/action';
// import { GridColDef, GridSortModel } from '@mui/x-data-grid';
// import ConfirmationDialog from 'src/components/confirmation-dialog';
// import CustomPagination from 'src/components/custom-pagination';
// import toast from 'react-hot-toast';
// import { resetInitialState } from 'src/stores/user';
// import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role';
// import CreateEditPaymentType from 'src/views/pages/settings/payment-type/ component/CreateEditPaymentType';
// import GridCreate from 'src/components/grid-create';
// import InputSearch from 'src/components/input-search';
// import TableHeader from 'src/components/table-header';




// interface TProductTypeListPage {
//     open: boolean,
//     onClose: () => void,
//     idProductType?: string
// }

// type TProps = {
// }


// const ProductTypeListPage: NextPage<TProps> = () => {
//     // Translate
//     const { t, i18n } = useTranslation()

//     // ** State
//     const [openCreateEdit, setOpenCreateEdit] = useState({
//         open: false,
//         id: ""
//     })

//     const [openDeleteCity, setOpenDeleteCity] = useState({
//         open: false,
//         id: ""
//     })

//     const [openDeleteMultipleProduct, setOpenDeleteMultipleProduct] = useState(false)
//     const [sortBy, setSortBy] = useState("createAt des")
//     const [searchBy, setSearchBy] = useState("")

//     const [loading, setLoading] = useState(false)
//     const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
//     const [page, setPage] = useState(1)
//     const [selectedRow, setSelectedRow] = useState<string[]>([])

//     //**Hook */
//     const { VIEW, UPDATE, DELETE, CREATE } = usePermission("MANAGE_PRODUCT.PRODUCT_TYPE", [
//         "CREATE",
//         "DELETE",
//         "UPDATE",
//         "VIEW"
//     ])

//     // * Redux
//     const dispatch: AppDispatch = useDispatch();

//     const {
//         productTypes,
//         isSuccessCreateEdit,
//         isErrorCreateEdit,
//         isLoading,
//         messageErrorCreateEdit,
//         isErrorDelete,
//         isSuccessDelete,
//         messageErrorDelete,
//         typeError,
//         isSuccessMultipleDelete,
//         isErrorMultipleDelete,
//         messageErrorMultipleDelete
//     } = useSelector((state: RootState) => state.productType)

//     //** theme */
//     const theme = useTheme()


//     // ** Fetch api
//     const handleGetListProductTypes = () => {
//         const query = { params: { limit: pageSize, page, search: searchBy, order: sortBy } }
//         dispatch(getAllProductTypeAsync(query))
//     }

//     const handleCloseConfirmDeleteCity = () => {
//         setOpenDeleteCity({
//             open: false,
//             id: ""
//         })
//     }

//     const handleCloseConfirmDeleteMultipleCity = () => {
//         setOpenDeleteMultipleProduct(false)
//     }

//     const handleSort = (sort: GridSortModel) => {
//         const sortOption = sort[0]
//         if (sortOption) {
//             setSortBy(`${sortOption.field} ${sortOption.sort}`)
//         } else {
//             setSortBy("createdAt desc")
//         }
//     }

//     const handleCloseCreateEdit = () => {
//         setOpenCreateEdit({
//             open: false,
//             id: ""
//         })
//     }

//     const handleDeleteCity = () => {
//         dispatch(deleteProductTypeAsync(openDeleteCity.id))
//     }

//     const handleDeleteMultipleCity = () => {
//         dispatch(
//             deleteMultipleProductTypeAsync({
//                 productTypeIds: selectedRow
//             })
//         )
//     }

//     const handleAction = (action: string) => {
//         switch (action) {
//             case "delete": {
//                 setOpenDeleteMultipleProduct(true)
//                 break
//             }
//         }
//     }

//     const handleOnchangePagination = (page: number, pageSize: number) => {
//         setPage(page)
//         setPageSize(pageSize)
//     }

//     const columns: GridColDef[] = [
//         {
//             field: 'fallName',
//             headerName: t('FullName'),
//             flex: 1,
//             minWidth: 200,
//             renderCell: (params) => {
//                 const { row } = params
//                 const fullName = toFullName(row?.lastName || "", row?.middleName || "", row?.firstName || "", i18next.language)
//                 return <Typography>{fullName}</Typography>
//             }
//         },
//         {
//             field: 'email',
//             headerName: t('Email'),
//             flex: 1,
//             minWidth: 200,
//             maxWidth: 200,
//             renderCell: params => {
//                 const { row } = params
//                 return <Typography>{row.email}</Typography>
//             }
//         },
//         {
//             field: 'role',
//             headerName: t('Role'),
//             flex: 1,
//             minWidth: 200,
//             maxWidth: 200,
//             renderCell: params => {
//                 const { row } = params
//                 return <Typography>{row.role?.name || ''}</Typography>
//             }
//         },
//         {
//             field: 'phoneNumber',
//             headerName: t('phone_number'),
//             flex: 1,
//             minWidth: 200,
//             maxWidth: 200,
//             renderCell: params => {
//                 const { row } = params
//                 return <Typography>{row.phone_number}</Typography>
//             }
//         },
//         {
//             field: 'city',
//             headerName: t('City'),
//             flex: 1,
//             minWidth: 200,
//             maxWidth: 200,
//             renderCell: params => {
//                 const { row } = params
//                 return <Typography>{row.city}</Typography>
//             }
//         },
//         {
//             field: 'action',
//             headerName: t('Action'),
//             minWidth: 150,
//             sortable: false,
//             align: "left",
//             renderCell: params => {
//                 const { row } = params
//                 return (
//                     <>
//                         <GridEdit
//                             disabled={!UPDATE}
//                             onClick={() => {
//                                 console.log('Edit button clicked')
//                                 console.log('Row data:', params.row)
//                                 handleOpenEdit(String(params.id))
//                             }}></GridEdit>
//                         <GridDelete
//                             disabled={!DELETE}
//                             onClick={() =>
//                                 setOpenDeleteUser({
//                                     open: true,
//                                     id: String(params.id)
//                                 })
//                             } ></GridDelete>
//                     </>
//                 )
//             }
//         },
//     ];

//     const PaginationComponent = () => {
//         return (
//             <CustomPagination
//                 onChangePagination={handleOnchangePagination}
//                 pageSizeOption={PAGE_SIZE_OPTION}
//                 pageSize={pageSize}
//                 page={page}
//                 rowLength={productTypes.total}
//             />
//         )
//     }

//     useEffect(() => {
//         handleGetListProductTypes()
//     }, [sortBy, searchBy, page, pageSize])

//     useEffect(() => {
//         if (isSuccessCreateEdit) {
//             if (!openCreateEdit.id) {
//                 toast.success(t("create-user-success"))
//             } else {
//                 toast.success(t("update-user-success"))
//             }
//             handleGetListProductTypes()
//             handleCloseCreateEdit()
//             dispatch(resetInitialState())
//         } else if (isErrorCreateEdit && messageErrorCreateEdit && typeError) {
//             const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
//             if (errorConfig) {
//                 toast.error(t(errorConfig))
//             } else {
//                 if (openCreateEdit.id) {
//                     toast.error(t("Update_user_error"))
//                 } else {
//                     toast.error(t("Create_user_error"))
//                 }
//             }
//             dispatch(resetInitialState())
//         }
//     }, [isSuccessCreateEdit, isErrorCreateEdit, messageErrorCreateEdit, typeError])

//     useEffect(() => {
//         if (isSuccessMultipleDelete) {
//             toast.success(t("Delete_multiple_product_type_success"))
//             handleGetListProductTypes()
//             dispatch(resetInitialState())
//             handleCloseConfirmDeleteMultipleCity()
//             setSelectedRow([])
//         } else if (isErrorMultipleDelete && messageErrorMultipleDelete) {
//             toast.error(t("Delete_product_type_error"))
//             dispatch(resetInitialState())
//         }
//     }, [isErrorMultipleDelete, isSuccessMultipleDelete, messageErrorCreateEdit])

//     useEffect(() => {
//         if (isSuccessDelete) {
//             toast.success(t('Delete_product_type_success'))
//             handleGetListProductTypes()
//             dispatch(resetInitialState())
//             handleCloseConfirmDeleteCity()
//         } else if (isErrorDelete && messageErrorDelete) {
//             toast.error(t("Delete_product_type_error"))
//             dispatch(resetInitialState())
//         }
//     }, [isSuccessDelete, isErrorDelete, messageErrorDelete])



//     return (
//         <>
//             {loading && <Spinner></Spinner>}
//             <ConfirmationDialog
//                 open={openDeleteCity.open}
//                 handleClose={handleCloseConfirmDeleteCity}
//                 handleCancel={handleCloseConfirmDeleteCity}
//                 handleConfirm={handleDeleteCity}
//                 title={t("Title_delete_product_type")}
//                 description={t("Confirm_delete_product_type")}
//             />

//             <CreateEditProductType
//                 open={openDeleteMultipleProduct}
//                 onClose={handleCloseCreateEdit}
//                 idProductType={openCreateEdit.id}
//             />

//             {isLoading && <Spinner></Spinner>}
//             <Box
//                 sx={{
//                     backgroundColor: theme.palette.background.paper,
//                     display: "flex",
//                     alignItems: "center",
//                     padding: "20px",
//                     height: "100%",
//                     width: "100%"
//                 }}
//             >
//                 <Grid container sx={{ height: "100%", width: "100%" }}>
//                     {!selectedRow?.length && (
//                         <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, mb: 4, width: "100%" }}>
//                             <Box sx={{ width: "200px" }}>
//                                 <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} ></InputSearch>
//                             </Box>
//                             <GridCreate
//                                 disabled={!CREATE}
//                                 onClick={() => {
//                                     setOpenCreateEdit({
//                                         open: true,
//                                         id: ""
//                                     })
//                                 }
//                                 } ></GridCreate>
//                         </Box>
//                     )}
//                     {selectedRow?.length > 0 && (
//                         <TableHeader
//                             numRow={selectedRow?.length}
//                             onClear={() => setSelectedRow([])}
//                             handleAction={handleAction}
//                             actions={[{ label: t("Xoá"), value: "delete", disabled: !DELETE }]}
//                         />
//                     )}
//                 </Grid>

//             </Box>

//         </>
//     )

// }
// export default ProductTypeListPage
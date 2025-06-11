// "use client"
import { NextPage } from 'next'
//** Mui
import {
    Box,
    Grid,
    Typography,
    useTheme
} from '@mui/material'
import { GridColDef, GridSortModel } from '@mui/x-data-grid'
import { GridRowSelectionModel } from '@mui/x-data-grid'

//*Yup
import * as yup from 'yup'

// ** React
import { useState, useEffect } from 'react'

// ** Redux_dispatch
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { deleteDeliveryTypeAsync, getAllDeliveryTypeAsync, deleteMultipleDeliveryTypeAsync } from 'src/stores/delivery-type/action'
import { resetInitialState } from 'src/stores/delivery-type'
import { useRouter } from 'next/router'

// ** translation 
import i18next, { t } from "i18next"

//** Component */
import CustomDataGrid from 'src/components/custom-data-grid'
import ConfirmationDialog from 'src/components/confirmation-dialog'

import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CustomPagination from 'src/components/custom-pagination'
import Spinner from 'src/components/spinner'

// **Service

// *Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role'

// ** Utils
import { formatDate, toFullName } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Other
import toast from 'react-hot-toast'

//** Hook */
import { usePermission } from 'src/hooks/usePermission'
import TableHeader from 'src/components/table-header'
import CreateEditDeliveryType from './component/CreateEditDeliveryType'





type TProps = {}

type TSelectedRow = { id: string, role: { name: string, permission: string[] } }




const DeliveryTypeListPage: NextPage<TProps> = () => {

    // ** State
    const [openCreateEdit, setOpenCreateEdit] = useState({
        open: false,
        id: ""
    })


    const [openDeleteDelivery, setOpenDeleteDelivery] = useState({
        open: false,
        id: ""
    })

    const [openDeleteMultipleDelivery, setOpenDeleteMultipleDelivery] = useState(false)

    const [sortBy, setSortBy] = useState("created desc")
    const [searchBy, setSearchBy] = useState("")
    const [permissionSelected, setPermissionSelected] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTION[0])
    const [page, setPage] = useState(1)

    const [selectedRow, setSelectedRow] = useState<string[]>([])


    //* Permission
    const { VIEW, UPDATE, DELETE, CREATE } = usePermission("SETTING.DELIVERY_TYPE", ["CREATE", "VIEW", "UPDATE", "DELETE"])

    // ** redux
    const dispatch: AppDispatch = useDispatch()
    const { deliveryTypes, isSuccessCreateEdit, isErrorCreateEdit, isLoading, messageCreateEdit, isErrorDelete, isSuccessDelete, messageDelete, typeError
        , isSuccessMultipleDelete, isErrorMultipleDelete, messageMultipleDelete } = useSelector((state: RootState) => state.deliveryType)


    //** router */
    const router = useRouter()

    // schema
    const schema = yup
        .object()
        .shape({

        })

    // ** Theme
    const theme = useTheme();

    // ** Fetch api
    const handleGetListDeliveryTypes = () => {
        const query = { params: { limit: pageSize, page, search: searchBy, order: sortBy } }
        dispatch(getAllDeliveryTypeAsync(query))
    }


    const handleCloseConfirmDeleteDeliveryType = () => {
        setOpenDeleteDelivery({
            open: false,
            id: ""
        })
    }

    const handleCloseConfirmDeleteMultipleDeliveryType = () => {
        setOpenDeleteMultipleDelivery(false)
    }

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        if (sortOption) {
            setSortBy(`${sortOption.field} ${sortOption.sort}`)
        } else {
            setSortBy("createdAt desc")
        }
    }

    const handleCloseCreateEdit = () => {
        setOpenCreateEdit({
            open: false,
            id: ""
        })
    }

    // ** handle
    const handleOnchangePagination = (page: number, pageSize: number) => {
        setPage(page)
        setPageSize(pageSize)
    }

    const handleDeleteDelivery = () => {
        dispatch(deleteDeliveryTypeAsync(openDeleteDelivery.id))
    }

    const handleDeleteMultipleDelivery = () => {
        dispatch(deleteMultipleDeliveryTypeAsync({
            deliveryTypeIds: selectedRow
        }))
    }

    const handleAction = (action: string) => {
        switch (action) {
            case "delete": {
                setOpenDeleteMultipleDelivery(true)
                break;
            }
        }
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('name'),
            flex: 1,
            minWidth: 200,
            maxWidth: 200,
            renderCell: params => {
                const { row } = params
                return <Typography>{row.name}</Typography>
            }
        },
        {
            field: 'createAt',
            headerName: t('Created_date'),
            minWidth: 180,
            maxWidth: 180,
            renderCell: params => {
                const { row } = params
                return <Typography>{formatDate(row?.createAt , {dateStyle : "short"})}</Typography>
            }
        },
        {
            field: 'action',
            headerName: t('Action'),
            minWidth: 150,
            sortable: false,
            align: "left",
            renderCell: params => {
                const { row } = params
                return (
                    <>
                        <GridEdit
                            disabled={!UPDATE}
                            onClick={() => {
                                setOpenCreateEdit({
                                    open: true,
                                    id: String(params.id)
                                })
                            }}></GridEdit>
                        <GridDelete
                            disabled={!DELETE}
                            onClick={() =>
                                setOpenDeleteDelivery({
                                    open: true,
                                    id: String(params.id)
                                })
                            } ></GridDelete>
                    </>
                )
            }
        },
    ];



    const PaginationComponent = () => {
        return (
            <CustomPagination pageSize={pageSize} page={page} rowLength={deliveryTypes.total} pageSizeOption={PAGE_SIZE_OPTION} onChangePagination={handleOnchangePagination} />
        )
    }



    useEffect(() => {
        handleGetListDeliveryTypes()
    }, [sortBy, searchBy, page, pageSize])



    useEffect(() => {
        if (isSuccessCreateEdit) {
            if (!openCreateEdit.id) {
                toast.success(t("create-delivery-type-success"))
            } else {
                toast.success(t("update-delivery-type-success"))
            }
            handleGetListDeliveryTypes()
            handleCloseCreateEdit()
            dispatch(resetInitialState())
        } else if (isErrorCreateEdit && messageCreateEdit && typeError) {
            const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
            if (errorConfig) {
                toast.error(t(errorConfig))
            } else {
                if (openCreateEdit.id) {
                    toast.error(t("Update_delivery_type_error"))
                } else {
                    toast.error(t("Create_delivery_type_error"))
                }
            }
            dispatch(resetInitialState())
        }
        handleGetListDeliveryTypes()
    }, [isSuccessCreateEdit, isErrorCreateEdit, messageCreateEdit, typeError])


    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete-delivery-type-success"))
            handleGetListDeliveryTypes()
            dispatch(resetInitialState())
            handleCloseConfirmDeleteDeliveryType()
        } else if (isErrorDelete && messageDelete) {
            toast.error(t(messageDelete))
            dispatch(resetInitialState())
        }
        handleGetListDeliveryTypes()
    }, [isErrorDelete, isSuccessDelete, messageDelete])

    useEffect(() => {
        if (isSuccessMultipleDelete) {
            toast.success(t("delete-multiple-delivery-type-success"))
            handleGetListDeliveryTypes()
            dispatch(resetInitialState())
            handleCloseConfirmDeleteMultipleDeliveryType()
            setSelectedRow([])
        } else if (isErrorMultipleDelete && messageMultipleDelete) {
            toast.error(t("Delete_multiple_delivery_type_error"))
            dispatch(resetInitialState())
        }
        handleGetListDeliveryTypes()
    }, [isErrorMultipleDelete, isSuccessMultipleDelete, messageMultipleDelete])


    return (
        <>
            {loading && <Spinner></Spinner>}
            <ConfirmationDialog
                open={openDeleteDelivery.open}
                handleClose={handleCloseConfirmDeleteDeliveryType}
                handleCancel={handleCloseConfirmDeleteDeliveryType}
                handleConfirm={handleDeleteDelivery}
                title={t("title_delete_delivery_type")}
                description={t("confirm_delete_delivery_type")}
            />
            <ConfirmationDialog
                open={openDeleteMultipleDelivery}
                handleClose={handleCloseConfirmDeleteMultipleDeliveryType}
                handleCancel={handleCloseConfirmDeleteMultipleDeliveryType}
                handleConfirm={handleDeleteMultipleDelivery}
                title={t("title_delete_multiple_delivery_type")}
                description={t("confirm_delete_multiple_delivery_type")}
            />
            <CreateEditDeliveryType open={openCreateEdit.open} onClose={handleCloseCreateEdit} idDelivery={openCreateEdit.id} />
            {isLoading && <Spinner />}
            <Box sx={{
                display: "flex",
                // backgroundColor: theme.palette.background.paper,
                alignItems: "center",
                padding: "20px",
                width: "100%", height: "100% !important"
            }}>
                <Box display={{
                    xs: "none",
                    sm: "flex"
                }} sx={{
                    justifyContent: 'center', alignItems: 'center', borderRadius: '40px',
                    backgroundColor: theme.palette.customColors.bodyBg,
                    height: "100% !important", width: "100%",
                }}>


                    <Grid container sx={{ height: "100%", width: "100%" }} >
                        {!selectedRow?.length && (
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, mb: 4, width: "100%" }}>
                                <Box sx={{ width: "200px" }}>
                                    <InputSearch value={searchBy} onChange={(value: string) => setSearchBy(value)} ></InputSearch>
                                </Box>
                                <GridCreate
                                    disabled={!CREATE}
                                    onClick={() => {
                                        setOpenCreateEdit({
                                            open: true,
                                            id: ""
                                        })
                                    }
                                    } ></GridCreate>
                            </Box>
                        )}

                        {selectedRow?.length > 0 && (
                            <TableHeader
                                numRow={selectedRow?.length}
                                onClear={() => setSelectedRow([])}
                                actions={[{ label: t("Xoá"), value: "delete", disabled: !DELETE }]}
                                handleAction={handleAction}
                            />
                        )}
                        <CustomDataGrid
                            rows={deliveryTypes?.data ?? []}
                            columns={columns}
                            sx={{
                                ".row-selected": {
                                    backgroundColor:
                                        `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                    color: `${theme.palette.primary.main} !important`
                                }
                            }}
                            checkboxSelection={true}
                            sortingMode='server'
                            onSortModelChange={handleSort}
                            sortingOrder={["desc", "asc"]}
                            autoHeight
                            getRowId={(row) => row._id}
                            disableRowSelectionOnClick
                            slots={{
                                pagination: PaginationComponent
                            }}
                            rowSelectionModel={selectedRow}
                            onRowSelectionModelChange={(row: GridRowSelectionModel) => {
                                setSelectedRow(row as string[])
                            }}
                            disableColumnFilter
                            disableColumnMenu
                        />
                    </Grid>
                </Box>
            </Box >
        </>
    )
}

export default DeliveryTypeListPage;



// "use client"
import { NextPage } from 'next'
//** Mui
import {
    Box,
    Button,
    Grid,
    useTheme
} from '@mui/material'
import { GridColDef, GridRowClassNameParams, GridSortModel } from '@mui/x-data-grid'

//*Yup
import * as yup from 'yup'

// ** React
import { useState, useEffect } from 'react'

// ** Icon
import Iconfy from 'src/components/Icon'

// ** Redux_dispatch
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/role'
import { useRouter } from 'next/router'
// ** translation 
import { t } from "i18next"
import { deleteRoleAsync, getAllRolesAsync, updateRoleAsync } from 'src/stores/role/action'

//** Component */
import CustomDataGrid from 'src/components/custom-data-grid'
import ConfirmationDialog from 'src/components/confirmation-dialog'
import TablePermission from './component/TablePermission'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/input-search'
import CreateEditRole from './component/CreateEditRole'
import Spinner from 'src/components/spinner'

// **Service
import { getDetailsRole } from 'src/services/role'

// *Config
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import { OBJECT_TYPE_ERROR_ROLE } from 'src/configs/role'
import { PERMISSIONS } from 'src/configs/permission'

// ** Utils
import { getAllValueOfObject } from 'src/utils'
import { hexToRGBA } from 'src/utils/hex-to-rgba'

// ** Other
import toast from 'react-hot-toast'

//** Hook */
import { usePermission } from 'src/hooks/usePermission'





type TProps = {}



const RoleListPage: NextPage<TProps> = () => {
    // ** State
    const [page, setPage] = useState(PAGE_SIZE_OPTION[0])
    const [pageSize, setPageSize] = useState(1)
    const [openCreateEdit, setOpenCreateEdit] = useState({
        open: false,
        id: ""
    })

    const [openDeleteRole, setOpenDeleteRole] = useState({
        open: false,
        id: ""
    })

    const [sortBy, setSortBy] = useState("created asc")
    const [searchBy, setSearchBy] = useState("")
    const [permissionSelected, setPermissionSelected] = useState<string[]>([])
    const [selectedRow, setSelectedRow] = useState({
        id: "",
        name: ""
    })
    const [loading, setLoading] = useState(false)
    const [isDisablePermission, setIsDisablePermission] = useState(false)

    //* Permission
    const { VIEW, UPDATE, DELETE, CREATE } = usePermission("SYSTEM.ROLE", ["CREATE", "VIEW", "UPDATE", "DELETE"])
    // console.log("data>>", { data });

    // ** redux
    const dispatch: AppDispatch = useDispatch()
    const { roles, isSuccessCreateEdit, isErrorCreateEdit, isLoading, messageCreateEdit, isErrorDelete, isSuccessDelete, messageDelete, typeError } = useSelector((state: RootState) => state.role)


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
    const handleGetListRoles = () => {
        dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: searchBy, order: sortBy } }))
    }

    const handleUpdateRole = () => {
        dispatch(updateRoleAsync({ name: selectedRow.name, id: selectedRow.id, permissions: permissionSelected }))
    }
    // console.log("per", { permissionSelected });
    const handleCloseConfirmDeleteRole = () => {
        setOpenDeleteRole({
            open: false,
            id: ""
        })
    }

    const handleSort = (sort: GridSortModel) => {
        const sortOption = sort[0]
        setSortBy(`${sortOption.field} ${sortOption.sort}`)
    }

    // ** handle
    const handleOnchangePagination = (page: number, pageSize: number) => { }

    const handleCloseCreateEdit = () => {
        setOpenCreateEdit({
            open: false,
            id: ""
        })
    }

    const handleDeleteRole = () => {
        dispatch(deleteRoleAsync(openDeleteRole.id))
    }

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: t('Name'),
            flex: 1
        },
        {
            field: 'action',
            headerName: t('Action'),
            minWidth: 150,
            sortable: false,
            align: "left",
            renderCell: params => {
                const { row } = params
                // console.log("row", { row });
                return (
                    <Box sx={{ width: "100%" }}>
                        {!row?.permissions?.some((per: string) => ["ADMIN.GRANTED", "BASIC.PUBLIC"]?.includes(per)) ? (
                            <>
                                <GridEdit
                                    disabled={!UPDATE}
                                    onClick={() => setOpenCreateEdit({
                                        open: true,
                                        id: String(params.id)
                                    })}></GridEdit>
                                <GridDelete
                                    disabled={!DELETE}
                                    onClick={() =>
                                        setOpenDeleteRole({
                                            open: true,
                                            id: String(params.id)
                                        })
                                    } ></GridDelete>
                            </>
                        ) : (
                            <Iconfy icon="material-symbols-light:lock-outline" fontSize={30} />
                        )}
                    </Box >
                )
            }
        },
    ];



    // const PaginationComponent = () => {
    //     return (
    //         <CustomPagination pageSize={pageSize} page={page} rowLength={roles.total} pageSizeOption={PAGE_SIZE_OPTION} onChangePagination={handleOnchangePagination} />
    //     )
    // }

    const handleGetDetailRoles = async (id: string) => {
        setLoading(true)
        await getDetailsRole(id).then((res) => {
            if (res?.data) {
                if (res?.data.permissions.includes(PERMISSIONS.ADMIN)) {
                    setIsDisablePermission(true)
                    setPermissionSelected(getAllValueOfObject(
                        PERMISSIONS, [PERMISSIONS.ADMIN, PERMISSIONS.BASIC]
                    ))
                } else if (res?.data.permissions.includes(PERMISSIONS.BASIC)) {
                    setIsDisablePermission(true)
                    setPermissionSelected([PERMISSIONS.DASHBOARD])
                } else {
                    setIsDisablePermission(false)
                    setPermissionSelected(res?.data?.permissions || [])
                }
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }



    useEffect(() => {
        if (isSuccessCreateEdit) {
            if (!openCreateEdit.id) {
                toast.success(t("create-role-success"))
            } else {
                toast.success(t("update-role-success"))
            }
            handleGetListRoles()
            handleCloseCreateEdit()
            dispatch(resetInitialState())
        } else if (isErrorCreateEdit && messageCreateEdit && typeError) {
            const errorConfig = OBJECT_TYPE_ERROR_ROLE[typeError]
            if (errorConfig) {
                toast.error(t(errorConfig))
            } else {
                if (openCreateEdit.id) {
                    toast.error(t("Update_role_error"))
                } else {
                    toast.error(t("Create_role_error"))
                }
            }
            dispatch(resetInitialState())
        }
        handleGetListRoles()
    }, [isSuccessCreateEdit, isErrorCreateEdit, messageCreateEdit, typeError])

    useEffect(() => {
        handleGetListRoles()
    }, [sortBy, searchBy])

    useEffect(() => {
        if (selectedRow.id) {
            handleGetDetailRoles(selectedRow.id)
        }
    }, [selectedRow])


    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete-role-success"))
            handleGetListRoles()
            dispatch(resetInitialState())
            handleDeleteRole()
        } else if (isErrorDelete && messageDelete) {
            toast.error(t(messageDelete))
            dispatch(resetInitialState())
        }
        handleGetListRoles()
    }, [isErrorDelete, isSuccessDelete, messageDelete])

    return (
        <>
            {loading && <Spinner></Spinner>}
            <ConfirmationDialog
                open={openDeleteRole.open}
                handleClose={handleCloseConfirmDeleteRole}
                handleCancel={handleCloseConfirmDeleteRole}
                handleConfirm={handleDeleteRole}
                title={t("title_delete_role")}
                description={t("confirm_delete_role")}
            />
            <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
            {isLoading && <Spinner />}
            <Box sx={{ backgroundColor: theme.palette.background.paper, display: "flex", alignItems: "center", padding: "20px", width: "100%", height: "100% !important" }}>
                <Box display={{
                    xs: "none",
                    sm: "flex"
                }} sx={{
                    justifyContent: 'center', alignItems: 'center', borderRadius: '40px',
                    backgroundColor: theme.palette.customColors.bodyBg,
                    height: "100% !important", width: "100%",
                }}>

                    <Grid container sx={{ height: "100%", width: "100%" }} spacing={5}>
                        <Grid item md={4} xs={12}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
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
                            <Box sx={{ maxHeight: "100%" }}>
                                <CustomDataGrid
                                    rows={roles.data}
                                    columns={columns}
                                    pageSizeOptions={[5]}
                                    sx={{
                                        ".row-selected": {
                                            backgroundColor:
                                                `${hexToRGBA(theme.palette.primary.main, 0.08)} !important`,
                                            color: `${theme.palette.primary.main} !important`
                                        }
                                    }}
                                    sortingMode='server'
                                    onSortModelChange={handleSort}
                                    sortingOrder={["desc", "asc"]}
                                    autoHeight
                                    getRowId={(row) => row._id}
                                    disableRowSelectionOnClick
                                    getRowClassName={(row: GridRowClassNameParams) => {
                                        return row.id === selectedRow.id ? "row-selected" : ''
                                    }}
                                    onRowClick={(row) => {
                                        setSelectedRow({ id: String(row.id), name: row?.row?.name })
                                        setOpenCreateEdit({
                                            open: false,
                                            id: String(row.id)
                                        })
                                    }}
                                    disableColumnFilter
                                    disableColumnMenu
                                />
                            </Box>
                        </Grid>
                        <Grid item md={8} xs={12} sx={{ maxHeight: "100%" }} paddingLeft={{ md: "40px", xs: "0" }} paddingTop={{ md: "0", sx: "20px" }}>
                            {selectedRow?.id && (
                                <>
                                    <Box sx={{ height: "calc(100% - 40px)" }}>
                                        <TablePermission permissionSelected={permissionSelected} setPermissionSelected={setPermissionSelected} disabled={isDisablePermission} ></TablePermission>
                                        <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                                            <Button
                                                sx={{ color: "white !important", padding: "2px 8px !important", mt: 2, mb: 2, height: "40px", borderRadius: "10px !important", backgroundColor: "gray !important" }}
                                                variant='contained'
                                                disabled={isDisablePermission}
                                                onClick={handleUpdateRole}
                                            >
                                                {t("update")}
                                            </Button>
                                        </Box>
                                    </Box>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </>
    )
}

export default RoleListPage;



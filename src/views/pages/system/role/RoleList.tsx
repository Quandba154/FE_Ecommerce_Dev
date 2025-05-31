// "use client"
import { NextPage } from 'next'
import Link from 'next/link'
//** Mui
import {
    Box,
    Card,
    Grid,
    useTheme
} from '@mui/material'
// ** Components
import CustomTextField from 'src/components/text-field'
import CustomPagination from 'src/components/custom-pagination'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/grid-search'
import CreateEditRole from './component/CreateEditRole'
import CustomDataGrid from 'src/components/custom-data-grid'
import Spinner from 'src/components/spinner'

import * as yup from 'yup'
// ** React
import { useState, useEffect } from 'react'
// ** Icon
import Icon from 'src/components/Icon'
// ** Redux_dispatch
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { resetInitialState } from 'src/stores/role'
import { useRouter } from 'next/router'
// ** Other
import toast from 'react-hot-toast'
// ** translation 
import { t } from "i18next"
// redux
import { deleteRoleAsync, getAllRolesAsync } from 'src/stores/role/action'
// others
import { GridColDef } from '@mui/x-data-grid'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'






type TProps = {}


const RoleListPage: NextPage<TProps> = () => {
    // ** State
    const [page, setPage] = useState(PAGE_SIZE_OPTION[0])
    const [pageSize, setPageSize] = useState(1)
    const [openCreateEdit, setOpenCreateEdit] = useState({
        open: false,
        id: ""
    })

    console.log("open>", openCreateEdit);




    // ** redux
    const dispatch: AppDispatch = useDispatch()
    const { roles, isSuccessCreateEdit, isErrorCreateEdit, isLoading, messageCreateEdit, isErrorDelete, isSuccessDelete, messageDelete } = useSelector((state: RootState) => state.role)



    //** router */
    const router = useRouter()


    const schema = yup
        .object()
        .shape({

        })

    // ** Theme
    const theme = useTheme();

    // ** Fetch api
    const handleGetListRoles = () => {
        dispatch(getAllRolesAsync({ params: { limit: -1, page: -1, search: "" } }))
    }

    // ** handle
    const handleOnchangePagination = (page: number, pageSize: number) => { }

    const handleCloseCreateEdit = () => {
        setOpenCreateEdit({
            open: false,
            id: ""
        })
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
            renderCell: row => {
                return (
                    <Box>
                        <GridEdit onClick={() => setOpenCreateEdit({
                            open: true,
                            id: String(row.id)
                        })}></GridEdit>
                        <GridDelete onClick={() => dispatch(deleteRoleAsync(String(row.id)))}></GridDelete>
                    </Box >
                )
            }
        },
    ];



    const PaginationComponent = () => {
        return (
            <CustomPagination pageSize={pageSize} page={page} rowLength={roles.total} pageSizeOption={PAGE_SIZE_OPTION} onChangePagination={handleOnchangePagination} />
        )
    }

    useEffect(() => {
        handleGetListRoles()
    }, [])


    useEffect(() => {
        if (isSuccessCreateEdit) {
            if (openCreateEdit.id) {
                toast.success(t("update-role-success"))
                console.log("quadao");

            } else {
                toast.success(t("create-role-success"))
                console.log("quadao2");
            }
            handleGetListRoles()
            handleCloseCreateEdit()
            dispatch(resetInitialState())
        } else if (isErrorCreateEdit && messageCreateEdit) {
            toast.error(t(messageCreateEdit))
            dispatch(resetInitialState())
        }
        handleGetListRoles()
    }, [isSuccessCreateEdit, isErrorCreateEdit, messageCreateEdit])


    useEffect(() => {
        if (isSuccessDelete) {
            toast.success(t("delete-role-success"))
            handleGetListRoles()
            dispatch(resetInitialState())
        } else if (isErrorDelete && messageDelete) {
            toast.error(t(messageDelete))
            dispatch(resetInitialState())
        }
        handleGetListRoles()
    }, [isErrorDelete, isSuccessDelete, messageDelete])


    return (
        <>
            <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
            {isLoading && <Spinner />}
            <Grid container >
                <Box sx={{ width: '100%', backgroundColor: theme.palette.background.paper, display: "flex", alignItems: "center", padding: "20px" }}>
                    <Box display={{
                        xs: "none",
                        sm: "flex"
                    }} sx={{
                        justifyContent: 'center', alignItems: 'center', borderRadius: '40px',
                        backgroundColor: theme.palette.customColors.bodyBg,
                        height: "100%", minWidth: "50vw", width: "100%"
                    }}>
                        <Grid container sx={{ height: "100%", width: "100%", }}>
                            <Grid item md={5} xs={12}>
                                <Card>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                                        <Box sx={{ width: "200px" }}>
                                            <InputSearch></InputSearch>
                                        </Box>
                                        <GridCreate onClick={() => setOpenCreateEdit({
                                            open: true,
                                            id: ""
                                        })} ></GridCreate>
                                    </Box>
                                    <CustomDataGrid
                                        rows={roles.data}
                                        columns={columns}
                                        pageSizeOptions={[5]}
                                        // checkboxSelection
                                        autoHeight
                                        getRowId={(row) => row._id}
                                        disableRowSelectionOnClick
                                        slots={{
                                            pagination: PaginationComponent
                                        }}
                                        disableColumnFilter
                                        disableColumnMenu
                                    />
                                </Card>
                            </Grid>
                            <Grid item md={7} xs={12}>
                                list permissions
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </>
    )
}

export default RoleListPage;



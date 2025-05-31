// "use client"
import Image from 'next/image'
import { NextPage } from 'next'
import Link from 'next/link'
//** Mui
import {
    Box,
    Button,
    CssBaseline,
    Grid,
    IconButton,
    InputAdornment,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material'
// ** Form
import { Controller, useForm } from 'react-hook-form'
// ** Components
import CustomTextField from 'src/components/text-field'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
// ** REGEX
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex'
// ** React
import { useState, useEffect } from 'react'
// ** Icon
import Icon from 'src/components/Icon'
// ** Images
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import GoogleSvg from '/public/svgs/google.svg'
import facebookSvg from '/public/svgs/facebook.svg'
// ** Redux_dispatch
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { changePasswordMeAsync } from 'src/stores/auth/action'
import FallbackSpinner from 'src/components/fall-back'
import { resetInitialState } from 'src/stores/role'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
// ** Other
import toast from 'react-hot-toast'
// ** translation 
import { t } from "i18next"
import { useTranslation } from 'react-i18next';
import { useAuth } from 'src/hooks/useAuth'
import { getAllRolesAsync } from 'src/stores/role/action'
import CustomDataGrid from 'src/components/custom-data-grid'
import { GridColDef } from '@mui/x-data-grid'
import { PAGE_SIZE_OPTION } from 'src/configs/gridConfig'
import CustomPagination from 'src/components/custom-pagination'
import GridEdit from 'src/components/grid-edit'
import GridDelete from 'src/components/grid-delete'
import GridCreate from 'src/components/grid-create'
import InputSearch from 'src/components/grid-search'
import CreateEditRole from './component/CreateEditRole'






type TProps = {}







const RoleListPage: NextPage<TProps> = () => {
    // ** State
    const [page, setPage] = useState(PAGE_SIZE_OPTION[0])
    const [pageSize, setPageSize] = useState(1)
    const [openCreateEdit, setOpenCreateEdit] = useState({
        open: false,
        id: ""
    })



    // ** redux
    const dispatch: AppDispatch = useDispatch()
    const { roles, isSuccessCreateEdit, isErrorCreateEdit, isLoading, messageCreateEdit } = useSelector((state: RootState) => state.role)



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
        setOpenCreateEdit: ({
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
            renderCell: () => {
                return (
                    <Box>
                        <GridEdit onClick={() => { }}></GridEdit>
                        <GridDelete onClick={() => { }}></GridDelete>
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
        if (isErrorCreateEdit) {
            toast.success(t("create-role-success"))
            handleGetListRoles()
            handleCloseCreateEdit()
            dispatch(resetInitialState())
        } else if (isErrorCreateEdit && messageCreateEdit) {
            toast.error(t(messageCreateEdit))
        }
    }, [isSuccessCreateEdit, isErrorCreateEdit, messageCreateEdit])


    return (
        <>
            <CreateEditRole open={openCreateEdit.open} onClose={handleCloseCreateEdit} idRole={openCreateEdit.id} />
            {isLoading && <FallbackSpinner />}
            <Box sx={{ backgroundColor: theme.palette.background.paper, display: "flex", alignItems: "center", padding: "20px" }}>
                <Box display={{
                    xs: "none",
                    sm: "flex"
                }} sx={{
                    justifyContent: 'center', alignItems: 'center', borderRadius: '40px',
                    backgroundColor: theme.palette.customColors.bodyBg,
                    height: "100%", minWidth: "50vw",
                }}>

                    <Grid container>
                        <Grid item md={5} xs={12}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
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
                        </Grid>
                        <Grid item md={5} xs={12}>
                            list permissions
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default RoleListPage;



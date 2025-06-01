// ** React
import React, { useEffect, useState } from 'react';
//
import { Box, useTheme, Button, Typography, IconButton } from '@mui/material';

// ** form
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
// i18
import { useTranslation } from 'react-i18next';
// ** component
import CustomModal from 'src/components/custom-modal';
import Spinner from 'src/components/spinner';
import Iconfi from "src/components/Icon"
import CustomTextField from 'src/components/text-field';
//** redux */
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/stores';
import { createRoleAsync, updateRoleAsync } from 'src/stores/role/action';
// ** Service
import { getDetailsRole } from 'src/services/role';



interface TCreateEditRole {
    open: boolean,
    onClose: () => void,
    idRole?: string
}


const CreateEditRole = (props: TCreateEditRole) => {

    // ** Theme
    const theme = useTheme();

    // ** State
    const [isLoading, setLoading] = useState(false)

    const dispatch: AppDispatch = useDispatch();

    const { t } = useTranslation()

    const schema = yup
        .object()
        .shape({
            name: yup
                .string()
                .required(t("require_field"))
        })


    const defaultValues = {
        name: '',
    }

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: { name: string }) => {
        if (!Object.keys(errors)?.length) {
            if (idRole) {
                dispatch(updateRoleAsync({ name: data?.name, id: idRole }))
            } else {
                dispatch(createRoleAsync({ name: data?.name }))
            }
        }
    }

    const { open, onClose, idRole } = props;

    const fetchDetailRole = async (id: string) => {
        setLoading(true)
        await getDetailsRole(id).then((res) => {
            const data = res.data
            if (data) {
                reset({
                    name: data?.name
                })
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }


    useEffect(() => {
        if (!open) {
            name: ""
        } else if (idRole) {
            fetchDetailRole(idRole)
        }
    }, [open, idRole])

    return (
        <>
            {isLoading && <Spinner></Spinner>}
            <CustomModal open={open} onClose={onClose}>
                <Box sx={{ backgroundColor: theme.palette.customColors.bodyBg, padding: "20px", borderRadius: "15px" }} minWidth={{ md: "400px", xs: "80vw" }}>
                    <Box sx={{ display: "flex", justifyContent: "center", position: "relative", paddingBottom: "20px" }}>
                        <Typography variant='h4' sx={{ fontWeight: 600 }}>{idRole ? "Chỉnh sửa nhóm vai trò" : "Tạo nhóm vái trò"}</Typography>
                        <IconButton sx={{ position: "absolute", top: "-4px", right: "-10px" }} onClick={onClose} >
                            <Iconfi icon="material-symbols-light:close" fontSize={"30px"} />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                        <Box sx={{ width: "100%", backgroundColor: theme.palette.background.paper, padding: "20px 30px", borderRadius: "12px" }}>
                            <Controller
                                control={control}
                                rules={{
                                    required: true
                                }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <CustomTextField
                                        required
                                        fullWidth
                                        label={t("Name_role")}
                                        placeholder={t("Enter_name")}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                        error={Boolean(errors?.name)}
                                        helperText={errors?.name ? errors?.name?.message : ''}
                                    />
                                )}
                                name='name'
                            />
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ mt: 2, mb: 2, height: "40px", borderRadius: "10px !important", backgroundColor: "gray !important" }} type='submit' variant='contained' >
                                {!idRole ? t("Create") : t("update")}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </CustomModal>
        </>
    )
}

export default CreateEditRole
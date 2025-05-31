import * as yup from 'yup'
import { Box, useTheme, Button, Typography, IconButton } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import CustomModal from 'src/components/custom-modal';
import Iconfi from "src/components/Icon"
import CustomTextField from 'src/components/text-field';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/stores';
import { createRoleAsync } from 'src/stores/role/action';



interface TCreateEditRole {
    open: boolean,
    onClose: () => void,
    idRole?: string
}


const CreateEditRole = (props: TCreateEditRole) => {

    // ** Theme
    const theme = useTheme();

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
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data: { name: string }) => {
        if (!Object.keys(errors)?.length) {
            if (idRole) {

            } else {
                dispatch(createRoleAsync({ name: data?.name }))
            }
        }
    }

    const { open, onClose, idRole } = props;

    return (
        <CustomModal open={open} onClose={onClose}>
            <Box sx={{ backgroundColor: theme.palette.background.paper, padding: "20px", borderRadius: "15px" }} minWidth={{ md: "400px", xs: "80vw" }}>
                <Box sx={{ display: "flex", justifyContent: "center", position: "relative", paddingBottom: "20px" }}>
                    <Typography variant='h4' sx={{ fontWeight: 600 }}>{idRole ? "Chỉnh sửa nhóm vai trò" : "Tạo nhóm vái trò"}</Typography>
                    <IconButton sx={{ position: "absolute", top: "-4px", right: "-10px" }} onClick={onClose}>
                        <Iconfi icon="material-symbols-light:close" fontSize={"30px"} />
                    </IconButton>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>

                    <Box sx={{ width: "100%" }}>
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
    )
}

export default CreateEditRole
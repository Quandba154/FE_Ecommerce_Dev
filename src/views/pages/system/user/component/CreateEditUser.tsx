// ** React
import React, { useEffect, useState } from 'react';
//
import { Box, useTheme, Button, Typography, IconButton, Grid, Avatar, InputLabel, FormHelperText, Switch, InputAdornment } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

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
import CustomSelect from 'src/components/custom-select';
import WrapperFileUpload from 'src/components/wrap-file-upload';

//** redux */
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/stores';
import { createUserAsync, updateUserAsync } from 'src/stores/user/action';
// ** Service
import { getDetailsUser } from 'src/services/user';
import { EMAIL_REG, PASSWORD_REG } from 'src/configs/regex';
import { getAllRole } from 'src/services/role';

//**User */
import { useAuth } from 'src/hooks/useAuth';

//**Icon */
import Iconfy from 'src/components/Icon'

//**Other */
import { convertBase64, separationFullName, toFullName } from 'src/utils';




interface TCreateEditUser {
    open: boolean,
    onClose: () => void,
    idUser?: string
}

type TDefaultValues = {
    password: string,
    fullName: string,
    email: string,
    role: string,
    phoneNumber: string,
    address: string,
    status?: number,
    // city ?: string
}


const CreateEditUser = (props: TCreateEditUser) => {
    // ** State
    const [isLoading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState("")
    const [optionRoles, setOptionRoles] = useState<{ label: string, value: string }[]>([])
    const [showPassWord, setShowPassWord] = useState(false)

    const dispatch: AppDispatch = useDispatch();

    //**Hook */
    const { user } = useAuth()

    const theme = useTheme()

    const { t, i18n } = useTranslation()

    const schema = yup
        .object()
        .shape({
            email: yup.string().required('Email is required').matches(EMAIL_REG, 'The fail email format'),
            password: yup
                .string()
                .nonNullable('Password is required')
                .matches(PASSWORD_REG, 'The password format is content characters , special characters, numbers'),
            fullName: yup.string().required('Email is required'),
            phoneNumber: yup.string().required('Phone number is required').min(9, 'Phone number must be at least 8 digits').max(15, 'Phone number must be at most 15 digits'),
            role: yup.string().required('Role is required'),
            // avatar: yup.string().required(),
            // city : yup.string().nonNullable(),
            address: yup.string().notRequired(),
            status: yup.number().notRequired(),
        })


    const defaultValues: TDefaultValues = {
        password: "",
        fullName: "",
        email: "",
        role: "",
        phoneNumber: "",
        address: "",
        status: 1,
        // city : ""
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

    const handleUpLoadAvatar = async (file: File) => {
        const base65 = await convertBase64(file)
        setAvatar(base65 as string)
    }

    const onSubmit = (data: any) => {
        if (!Object.keys(errors)?.length) {
            const { firstName, middleName, lastName } = separationFullName(data.fullName, i18n.language)
            if (idUser) {
                dispatch(updateUserAsync({
                    id: idUser,
                    password: data.password ? data?.password : "",
                    firstName,
                    middleName,
                    lastName,
                    status: data?.status,
                    email: data?.email,
                    role: data?.role,
                    phoneNumber: data?.phoneNumber,
                    address: data?.address,
                    avatar: avatar,
                    // city :data?.city
                }))
            } else {
                dispatch(createUserAsync({
                    password: data.password ? data?.password : "",
                    firstName,
                    middleName,
                    lastName,
                    status: data?.status,
                    email: data?.email,
                    role: data?.role,
                    phoneNumber: data.phoneNumber,
                    // city :data?.city
                    address: data?.address,
                    avatar: avatar
                }))
            }
        }
    }

    const { open, onClose, idUser } = props;

    const fetchDetailUser = async (id: string) => {
        setLoading(true)
        await getDetailsUser(id).then((res) => {
            const data = res.data
            // console.log("daaaa", { data });

            if (data) {
                reset({
                    fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language),
                    password: data.password,
                    phoneNumber: data.phoneNumber,
                    role: data?.role._id,
                    email: data?.email,
                    // city :data?.city,
                    address: data?.address,
                    status: data?.status,
                })
            }
            setAvatar(data?.avatar)
            setLoading(false)
        }).catch(e => {
            setLoading(false)
        })
    }

    const fetAllRoles = async () => {
        setLoading(true)
        await getAllRole({ params: { limit: -1, page: -1 } }).then((res) => {
            const data = res?.data.roles
            if (data) {
                setOptionRoles(data?.map((item: { name: string; _id: string }) => ({ label: item.name, value: item._id })))
            }
            setLoading(false)
        }).catch((e) => {
            setLoading(false)
        })
    };

    useEffect(() => {
        if (!open) {
            reset({
                ...defaultValues
            })
            setAvatar("")
            setShowPassWord(false)
        } else if (idUser && open) {
            fetchDetailUser(idUser)
        }
    }, [open, idUser])

    useEffect(() => {
        fetAllRoles()
    }, [])

    return (
        <>
            {isLoading && <Spinner></Spinner>}
            <CustomModal open={open} onClose={onClose}>
                <Box sx={{ backgroundColor: theme.palette.customColors.bodyBg, padding: "20px", borderRadius: "15px" }}
                    minWidth={{ md: "800px", xs: "80vw" }}
                    maxWidth={{ md: "80vw", xs: "80vw" }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", position: "relative", paddingBottom: "20px" }}>
                        <Typography variant='h4' sx={{ fontWeight: 600 }}>{idUser ? "Chỉnh sửa nhóm vai trò" : "Tạo nhóm vái trò"}</Typography>
                        <IconButton sx={{ position: "absolute", top: "-4px", right: "-10px" }} onClick={onClose} >
                            <Iconfi icon="material-symbols-light:close" fontSize={"30px"} />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                        <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "15px", py: 5, px: 4 }}  >
                            <Grid container
                                spacing={5}>
                                <Grid container item md={6} xs={12}>
                                    <Box sx={{ height: "100%", width: "100%" }}>
                                        <Grid container spacing={4}>
                                            <Grid item md={12} xs={12} >
                                                <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", }}>
                                                    <Box sx={{ position: "relative" }}>
                                                        {
                                                            avatar && (
                                                                <IconButton edge="start" color="inherit" sx={{ position: "absolute", bottom: -4, right: -6, zIndex: 2, color: theme.palette.error.main }} onClick={() => setAvatar('')}>
                                                                    <Iconfy icon="material-symbols-light:delete-outline" />
                                                                </IconButton>
                                                            )
                                                        }
                                                        {
                                                            avatar ? (
                                                                <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                                                                    <Iconfy icon="ph:user-thin" fontSize={70} />
                                                                </Avatar>
                                                            ) : (
                                                                <Avatar src='' sx={{ width: 100, height: 100 }}>
                                                                    <Iconfy icon="ph:user-thin" fontSize={70} />
                                                                </Avatar>
                                                            )
                                                        }
                                                    </Box>
                                                    <WrapperFileUpload uploadFunc={handleUpLoadAvatar} objectAcceptFile={{
                                                        "image/*": [".png", ".jpg", ".jpeg", ".gif"]
                                                    }} >
                                                        <Button variant='contained' sx={{ width: "auto", display: "flex", alignItems: "center", gap: 1 }} >
                                                            <Iconfy icon="ph:camera-thin" />
                                                            {avatar ? t('change_avatar') : t('upload_avatar')}
                                                        </Button>
                                                    </WrapperFileUpload>
                                                </Box>
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <Controller
                                                    control={control}
                                                    rules={{
                                                        required: true
                                                    }}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            required
                                                            fullWidth
                                                            label={t("Email")}
                                                            placeholder={t('enter_your_email')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value || user?.email}
                                                            error={Boolean(errors?.email)}
                                                            helperText={errors?.email ? errors?.email?.message : ''}
                                                        />
                                                    )}
                                                    name='email'
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <Controller
                                                    control={control}
                                                    name="role"
                                                    rules={{ required: true }}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                                            <InputLabel
                                                                sx={{
                                                                    fontSize: "13px",
                                                                    mb: 1,
                                                                    color: errors?.role
                                                                        ? theme.palette.error.main
                                                                        : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                                                }}
                                                            >
                                                                {t("Role")} <span style={{
                                                                    color: errors?.role
                                                                        ? theme.palette.error.main
                                                                        : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                                                }}>*</span>
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={optionRoles}
                                                                error={Boolean(errors?.role)}
                                                            // placeholder={t("enter_your_role")}
                                                            />
                                                            {errors?.role?.message && (
                                                                <FormHelperText
                                                                    sx={{
                                                                        color: !errors?.role
                                                                            ? theme.palette.error.main
                                                                            : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                                                        marginTop: "-4px"
                                                                    }}
                                                                >
                                                                    {errors?.role?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <Controller
                                                    control={control}
                                                    rules={{
                                                        required: true
                                                    }}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            required
                                                            fullWidth
                                                            label='Password'
                                                            placeholder='Input password'
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            error={Boolean(errors?.password)}
                                                            helperText={errors?.password ? errors?.password?.message : ''}
                                                            type={showPassWord ? 'text' : 'password'}
                                                            InputProps={{
                                                                endAdornment: (
                                                                    <InputAdornment position='end'>
                                                                        <IconButton
                                                                            edge='end'
                                                                            onClick={() => setShowPassWord(!showPassWord)}
                                                                            aria-label='toggle password visibility'
                                                                        >
                                                                            {showPassWord ? (
                                                                                <Iconfy icon='material-symbols:visibility-outline' />
                                                                            ) : (
                                                                                <Iconfy icon='material-symbols:visibility-off-outline-rounded' />
                                                                            )}
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                                )
                                                            }}
                                                        />
                                                    )}
                                                    name='password'
                                                />
                                            </Grid>
                                            {idUser && <Grid item md={6} xs={12}>
                                                <Controller
                                                    control={control}
                                                    name="status"
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <FormControlLabel
                                                            control={
                                                                <Switch
                                                                    sx={{ backgroundColor: "red" }}
                                                                    checked={Boolean(value)}
                                                                    onChange={(e) => {
                                                                        onChange(e.target.checked ? 1 : 0);
                                                                    }}
                                                                // onBlur={onBlur}
                                                                />
                                                            }
                                                            label={Boolean(value) ? t("Active") : t("Block")}
                                                        />
                                                    )}
                                                />
                                            </Grid>}

                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid container md={6} xs={12} >
                                    <Box>
                                        <Grid container spacing={4}>
                                            <Grid item md={6} xs={12}>
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            required
                                                            fullWidth
                                                            label={t("full_name")}
                                                            placeholder={t('enter_your_full_name')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            error={Boolean(errors?.fullName)}
                                                            helperText={errors?.fullName ? errors?.fullName?.message : ''}
                                                        />
                                                    )}
                                                    name='fullName'
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <Controller
                                                    name='address'
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            fullWidth
                                                            label={t("Address")}
                                                            placeholder={t('enter_your_address')}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                        />
                                                    )}
                                                />
                                            </Grid>
                                            {/* <Grid item md={6} xs={12}>
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <Box >
                                                            <InputLabel
                                                                sx={{
                                                                    fontSize: "13px",
                                                                    marginBottom: "4px",
                                                                    display: "block",
                                                                    color: errors?.role
                                                                        ? theme.palette.error.main
                                                                        : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                                                }}
                                                            >
                                                                {t("City")}
                                                            </InputLabel>
                                                            <CustomSelect
                                                                fullWidth
                                                                onChange={onChange}
                                                                onBlur={onBlur}
                                                                value={value}
                                                                options={[]}
                                                                error={Boolean(errors?.role)}
                                                                placeholder={t("enter_your_city")}
                                                            />
                                                            {errors?.role?.message && (
                                                                <FormHelperText
                                                                    sx={{
                                                                        color: !errors?.role
                                                                            ? theme.palette.error.main
                                                                            : `rgba(${theme.palette.customColors.main}, 0.42)`,
                                                                    }}
                                                                >
                                                                    {errors?.role?.message}
                                                                </FormHelperText>
                                                            )}
                                                        </Box>
                                                    )}
                                                    name='city'
                                                />
                                            </Grid> */}

                                            <Grid item md={6} xs={12}>
                                                <Controller
                                                    control={control}
                                                    render={({ field: { onChange, onBlur, value } }) => (
                                                        <CustomTextField
                                                            required
                                                            fullWidth
                                                            label={t("phone_number")}
                                                            placeholder={t('enter_your_phone')}
                                                            onChange={(e) => {
                                                                const numValue = e.target.value.replace(/\D/g, '');
                                                                onChange(numValue)
                                                            }}
                                                            inputProps={{
                                                                inputMode: "numeric",
                                                                pattern: "[0-9]*",
                                                                minLength: 8,
                                                            }}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            error={Boolean(errors?.phoneNumber)}
                                                            helperText={errors?.phoneNumber ? errors?.phoneNumber?.message : ''}
                                                        />
                                                    )}
                                                    name='phoneNumber'
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid >
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ color: "white !important", padding: "2px 8px !important", mt: 2, mb: 2, height: "40px", borderRadius: "10px !important", backgroundColor: "gray !important" }} type='submit' variant='contained' >
                                {!idUser ? t("create_user") : t("update_user")}
                            </Button>
                        </Box>
                    </form >
                </Box >
            </CustomModal >
        </>
    )

}
export default CreateEditUser
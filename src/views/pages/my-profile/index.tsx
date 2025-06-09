"use client"

import { NextPage } from 'next'
//** Mui
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
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
import { useRouter } from 'next/router'

// ** translation 
import { t } from "i18next"
import { useTranslation } from 'react-i18next';
// ** Components
import WrapperFileUpload from 'src/components/wrap-file-upload'
import { useAuth } from 'src/hooks/useAuth'
// ** Services
import { getAuthMe } from 'src/services/auth'
// types
import { UserDataType } from 'src/contexts/types'
import { convertBase64, separationFullName, toFullName } from 'src/utils'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from 'src/stores'
import { updateAuthMeAsync } from 'src/stores/auth/action'
import { resetInitialState } from 'src/stores/auth'
// toast
import toast from 'react-hot-toast'
import { Router } from 'next/router'
import FallbackSpinner from 'src/components/fall-back'
import Spinner from 'src/components/spinner'
import CustomSelect from 'src/components/custom-select'
import { getAllRole } from 'src/services/role'


type TProps = {}

type TDefaultValues = {
  email: string,
  address: string,
  fullName: string,
  city: string,
  phoneNumber: string,
  role: string,
}

const MyProfilePage: NextPage<TProps> = () => {
  // ** hooks
  // const { setUser } = useAuth();

  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<UserDataType | null>(null)
  const [avatar, setAvatar] = useState("")
  // const [roleId, setRoleId] = useState("")
  const [optionRoles, setOptionRoles] = useState<{ label: string, value: string }[]>([])
  const [isDisableRole, setIsDisableRole] = useState(false)




  // ** Theme
  const theme = useTheme();

  //** Translation */
  const { i18n } = useTranslation();

  const router = useRouter()

  // **redux Dispatch
  const dispatch: AppDispatch = useDispatch();

  const { isLoading, isErrorUpdateMe, messageUpdateMe, isSuccessUpdateMe } = useSelector((state: RootState) => state.auth);

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required').matches(EMAIL_REG, 'The fail email format'),
      fullName: yup.string().notRequired(),
      phoneNumber: yup.string().required('Phone number is required').min(8, 'Phone number must be at least 8 digits').max(15, 'Phone number must be at most 15 digits'),
      role: isDisableRole ? yup.string().notRequired() : yup.string().required('Role is required'),
      city: yup.string().notRequired(),
      address: yup.string().notRequired(),
    })


  const defaultValues: TDefaultValues = {
    email: "",
    address: "",
    fullName: "",
    city: "",
    phoneNumber: "",
    role: "",
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const fetchGetAuthMe = async () => {
    setLoading(true)
    await getAuthMe()
      .then(async response => {
        setLoading(false)
        const data = response?.data
        // setUser({ ...response.data.data })
        // console.log("data11", { data, response });
        // console.log("role222", data?.role?.name);

        if (data) {
          setIsDisableRole(!data?.role?.permissions?.length)
          // setAvatar(data?.avatar)
          reset({
            email: data?.email,
            address: data?.address,
            city: data?.city,
            phoneNumber: data?.phoneNumber,
            role: data?.role?._id,
            fullName: toFullName(data?.lastName, data?.middleName, data?.firstName, i18n.language),
          })
          setAvatar(data?.avatar)
          // setUser({ ...data })
        }
      })
      .catch(() => {
        // setUser(null)
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
    fetchGetAuthMe();
  }, [i18n.language])

  useEffect(() => {
    if (messageUpdateMe) {
      if (isErrorUpdateMe) {
        toast.error(messageUpdateMe)
      } else if (isSuccessUpdateMe) {
        toast.success(messageUpdateMe)
        fetchGetAuthMe()
      }
      dispatch(resetInitialState())
    }
  }, [isErrorUpdateMe, isSuccessUpdateMe, messageUpdateMe])

  useEffect(() => {
    fetAllRoles()
  }, [])

  const onSubmit = (data: any) => {
    const { firstName, middleName, lastName } = separationFullName(data.fullName, i18n.language)
    dispatch(updateAuthMeAsync({
      email: data?.email,
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      role: data.role,
      phoneNumber: data?.phoneNumber,
      avatar,
      address: data?.address,
      // city: data?.city,
    }))
  }

  const handleUpLoadAvatar = async (file: File) => {
    const base65 = await convertBase64(file)
    setAvatar(base65 as string)
  }
  return (
    <>
      {loading || (isLoading && <Spinner />)}
      <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
        <Grid container  >
          <Grid container item md={6} xs={12} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "15px", py: 5, px: 4 }} >
            <Box sx={{ height: "100%", width: "100%" }}>
              <Grid container spacing={4}>
                <Grid item md={12} xs={12} >
                  <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", }}>
                    <Box sx={{ position: "relative" }}>
                      {
                        avatar && (
                          <IconButton edge="start" color="inherit" sx={{ position: "absolute", bottom: -4, right: -6, zIndex: 2, color: theme.palette.error.main }} onClick={() => setAvatar('')}>
                            <Icon icon="material-symbols-light:delete-outline" />
                          </IconButton>
                        )
                      }
                      {
                        avatar ? (
                          <Avatar src={avatar} sx={{ width: 100, height: 100 }}>
                            <Icon icon="ph:user-thin" fontSize={70} />
                          </Avatar>
                        ) : (
                          <Avatar src='' sx={{ width: 100, height: 100 }}>
                            <Icon icon="ph:user-thin" fontSize={70} />
                          </Avatar>
                        )
                      }
                    </Box>
                    <WrapperFileUpload uploadFunc={handleUpLoadAvatar} objectAcceptFile={{
                      "image/*": [".png", ".jpg", ".jpeg", ".gif"]
                    }} >
                      <Button variant='contained' sx={{ width: "auto", display: "flex", alignItems: "center", gap: 1 }} >
                        <Icon icon="ph:camera-thin" />
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
                        disabled
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
                  {!isDisableRole && (
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
                            {t("Role")}
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
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid container md={6} xs={12} mt={{ md: 0, xs: 5 }}>
            <Box sx={{ height: "100%", width: "100%", backgroundColor: theme.palette.background.paper, borderRadius: "15px", py: 5, px: 4 }} marginLeft={{ md: 5, xs: 0 }}>
              <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <CustomTextField
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
                <Grid item md={6} xs={12}>
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
                </Grid>
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

        <Box sx={{ width: "100 %", height: "100%", display: "flex", justifyContent: "flex-end" }}>
          <Button sx={{ mt: 5, mb: 5 }} type='submit' variant='contained' color='primary'>
            {t('Update')}
          </Button>
        </Box>
      </form >
    </>
  )
}

export default MyProfilePage;



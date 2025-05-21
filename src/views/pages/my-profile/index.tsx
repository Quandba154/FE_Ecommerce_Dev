// "use client"
import Image from 'next/image'
import { NextPage } from 'next'
import Link from 'next/link'
//** Mui
import {
  Avatar,
  Box,
  Button,
  Grid,
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

import IconifyIcon from "src/components/Icon"
import { useTranslation } from 'react-i18next';
import WrapperFileUpload from 'src/components/wrap-file-upload'
import { useAuth } from 'src/hooks/useAuth'


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
  const { user } = useAuth();

  // ** Theme
  const theme = useTheme();

  //** Translation */
  const { t } = useTranslation()

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required').matches(EMAIL_REG, 'The fail email format'),
      address: yup.string().required('Address is required'),
      fullName: yup.string().required('Full name is required'),
      city: yup.string().required('City is required'),
      phoneNumber: yup.string().required('Phone number is required'),
      role: yup.string().required('Role is required'),
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
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  console.log('data11', { user })
  useEffect(() => {
    if (user) {
      reset({
        email: user?.email,
        role: user?.role?.name,
      })
    }
  }, [user])

  const onSubmit = (data: any) => {
    console.log('data1111', { data, errors })
  }
  const handleUpLoadAvatar = (file: File) => {
    // console.log('file', file)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate >
      <Grid container  >
        <Grid container item md={6} xs={12} sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "15px", py: 5, px: 4 }} >
          <Box sx={{ height: "100%", width: "100%" }}>
            <Grid container spacing={4}>
              <Grid item md={12} xs={12} >
                <Box sx={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "8px", }}>
                  <Avatar src='' sx={{ width: 100, height: 100 }}>
                    {/* {user?.avatar ? (
                  <Image src={user?.avatar || ""} alt="avatar" style={{
                    height: "auto",
                    width: "auto"
                  }} />
                ) : ( */}
                    <IconifyIcon icon="ph:user-thin" fontSize={70} />
                    {/* )} */}
                  </Avatar>
                  <WrapperFileUpload uploadFunc={handleUpLoadAvatar} objectAcceptFile={{
                    "image/*": [".png", ".jpg", ".jpeg", ".gif"]

                  }} >
                    <Button variant='contained' sx={{ width: "auto", display: "flex", alignItems: "center", gap: 1 }} >
                      <IconifyIcon icon="ph:camera-thin" />
                      {t("upload_avatar")}
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
                      value={value}
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
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      disabled
                      label={t("Role")}
                      placeholder={t("enter_your_role")}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.role)}
                      helperText={errors?.role ? errors?.role?.message : ''}
                    />
                  )}
                  name='role'
                />
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
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t("Address")}
                      placeholder={t('enter_your_address')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.address)}
                      helperText={errors?.address ? errors?.address?.message : ''}
                    />
                  )}
                  name='address'
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label={t("City")}
                      placeholder={t('enter_your_city')}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.city)}
                      helperText={errors?.city ? errors?.city?.message : ''}
                    />
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
                      onChange={onChange}
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
      </Grid>

      <Box sx={{ width: "100 %", height: "100%", display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mt: 5, mb: 5 }} type='submit' variant='contained' color='primary'>
          {t('Update')}
        </Button>
      </Box>
    </form >
  )
}

export default MyProfilePage;



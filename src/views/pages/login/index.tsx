"use client"

import Image from 'next/image'
import { NextPage } from 'next'
import Link from 'next/link'
//** Mui
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  FormControlLabel,
  IconButton,
  InputAdornment,
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
import { useState } from 'react'
// ** Icon
import Icon from 'src/components/Icon'
// ** Images
import loginDark from '/public/images/login-dark.png'
import loginLight from '/public/images/login-light.png'
import GoogleSvg from '/public/svgs/google.svg'
import facebookSvg from '/public/svgs/facebook.svg'

// ** Hooks 
import { useAuth } from 'src/hooks/useAuth'
import toast from 'react-hot-toast'

// ** translation 
import { t } from "i18next"
import { useTranslation } from 'react-i18next';


type TProps = {}

type TDefaultValues = {
  email: string,
  password: string,
}

const LoginPage: NextPage<TProps> = () => {
  // ** State
  const [showPassWord, setShowPassWord] = useState(false)
  const [isRemember, setIsRemember] = useState(true)

  // ** Context 
  const { login } = useAuth();

  // ** Theme
  const theme = useTheme();

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required').matches(EMAIL_REG, 'The fail email format'),
      password: yup
        .string()
        .required('Password is required')
        .matches(PASSWORD_REG, 'The password format is content characters , special characters, numbers')
    })

  const defaultValues: TDefaultValues = {
    email: "admin@gmail.com",
    password: "123456789Quandba@"
  }

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })


  const onSubmit = (data: { email: string; password: string }) => {
    if (!Object.keys(errors)?.length) {
      login(
        { ...data, rememberMe: isRemember },
        (err) => {
          if (typeof err === 'object' && err !== null && 'response' in err && (err as any).response?.data?.typeError === 'INVALID') {
            toast.error(t("the_email_or_password_is_incorrect"));
          }
        }
      );
    }
    console.log("data", { data, errors });
  };


  return (
    <>
      <Box sx={{ height: '100vh', width: '100vw', backgroundColor: theme.palette.background.paper, display: "flex", alignItems: "center", padding: "20px" }}>
        <Box display={{
          xs: "none",
          sm: "flex"
        }} sx={{
          justifyContent: 'center', alignItems: 'center', borderRadius: '40px',
          backgroundColor: theme.palette.customColors.bodyBg,
          height: "100%", minWidth: "50vw",
        }}>
          <Image src={theme.palette.mode === "light" ? loginLight : loginDark} alt='loginImage' style={{ height: 'auto', width: 'auto' }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: 1 }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component='h1' variant='h5'>
              {t("Sign_In")}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
              <Box sx={{ mt: 2, width: "300px" }}>
                <Controller
                  control={control}
                  rules={{
                    required: true
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomTextField
                      required
                      fullWidth
                      label='Email'
                      placeholder='Input email'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.email)}
                      helperText={errors?.email ? errors?.email?.message : ''}
                    />
                  )}
                  name='email'
                />
              </Box>
              <Box sx={{ mt: 2, width: "300px" }}>
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
                                <Icon icon='material-symbols:visibility-outline' />
                              ) : (
                                <Icon icon='material-symbols:visibility-off-outline-rounded' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                  name='password'
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name='Remember me'
                      value='remember'
                      color='primary'
                      checked={isRemember}
                      onChange={e => setIsRemember(e.target.checked)}
                    />
                  }
                  label={t("Remember_me")}
                />
                <Typography variant='body2'>
                  {t("Forgot_password?")}
                </Typography>
              </Box>
              <Button sx={{ mb: 5 }} type='submit' fullWidth variant='contained' color='primary'>
                Sign In
              </Button>
              <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', gap: "4px" }}>
                <Typography >
                  {t("Don't have an account?")}
                </Typography>
                <Link style={{ color: theme.palette.primary.main }} href='/register'>
                  {t("Sign_up")}
                </Link>
              </Box>
              <Typography sx={{ textAlign: "center", mt: 2, mb: 2 }}>{t("Or")}</Typography>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
                <IconButton sx={{ color: theme.palette.error.main }}>
                  <Image
                    src={facebookSvg}
                    style={{
                      width: "30px",
                      height: "30px",
                      filter: "brightness(0) saturate(100%) invert(48%) sepia(16%) saturate(2567%) hue-rotate(197deg) brightness(91%) contrast(91%)"
                    }}
                    alt="facebook"
                  />
                </IconButton>

                <IconButton sx={{ color: theme.palette.error.main }}>
                  <Image
                    src={GoogleSvg}
                    style={{
                      width: "30px",
                      height: "30px",
                      filter: "brightness(0) saturate(100%) invert(17%) sepia(99%) saturate(7471%) hue-rotate(1deg) brightness(102%) contrast(107%)"
                    }}
                    alt="google"
                  />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default LoginPage

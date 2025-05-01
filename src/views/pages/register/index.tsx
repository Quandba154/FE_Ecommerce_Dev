// "use client"
import Image from 'next/image'
import { NextPage } from 'next'
import Link from 'next/link'
//** Mui
import {
  Box,
  Button,
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
import RegisterDark from '/public/images/register-dark.png'
import RegisterLight from '/public/images/register-light.png'
import GoogleSvg from '/public/svgs/google.svg'
import facebookSvg from '/public/svgs/facebook.svg'


type TProps = {}

type TDefaultValues = {
  email: string,
  password: string,
  confirmPassword: string
}

const RegisterPage: NextPage<TProps> = () => {
  // ** State
  const [showPassWord, setShowPassWord] = useState(false)
  const [showConfirmPassWord, setShowConfirmPassWord] = useState(false)

  // ** Theme
  const theme = useTheme();

  const schema = yup
    .object()
    .shape({
      email: yup.string().required('Email is required').matches(EMAIL_REG, 'The fail email format'),
      password: yup
        .string()
        .required('Password is required')
        .matches(PASSWORD_REG, 'The password format is content characters , special characters, numbers'),
      confirmPassword: yup
        .string()
        .required('ConfirmPassword is required')
        .matches(PASSWORD_REG, 'The password and confirm password must be the same').oneOf([yup.ref("password"), ""], "The confirm password must be the same password')")
    })


  const defaultValues: TDefaultValues = {
    email: '',
    password: '',
    confirmPassword: ''
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
  //   console.log('errors', { errors })

  const onSubmit = (data: { email: string; password: string }) => {
    console.log('data', { data, errors })
  }
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
          <Image src={theme.palette.mode === "light" ? RegisterLight : RegisterDark} alt='loginImage' style={{ height: 'auto', width: 'auto' }} />
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
              Register
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
                      label='Confirm Password'
                      placeholder='Input confirm password'
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.confirmPassword)}
                      helperText={errors?.confirmPassword ? errors?.confirmPassword?.message : ''}
                      type={showConfirmPassWord ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setShowConfirmPassWord(!showConfirmPassWord)}
                              aria-label='toggle password visibility'
                            >
                              {showConfirmPassWord ? (
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
                  name='confirmPassword'
                />
              </Box>


              <Button sx={{ mt: 5, mb: 5 }} type='submit' fullWidth variant='contained' color='primary'>
                Register
              </Button>
              <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', gap: "4px" }}>
                <Typography >
                  {"Do you have already account ?"}
                </Typography>
                <Link style={{ color: theme.palette.primary.main }} href='/login'>
                  {"Sign In"}
                </Link>
              </Box>
              <Typography sx={{ textAlign: "center", mt: 2, mb: 2 }}>Or</Typography>
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

export default RegisterPage;



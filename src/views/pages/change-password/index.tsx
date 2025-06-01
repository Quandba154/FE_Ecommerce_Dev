// "use client"
import Image from 'next/image'
import { NextPage } from 'next'
import Link from 'next/link'
//** Mui
import {
  Box,
  Button,
  CssBaseline,
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
import { resetInitialState } from 'src/stores/auth'
import { useRouter } from 'next/router'
import { ROUTE_CONFIG } from 'src/configs/route'
// ** Other
import toast from 'react-hot-toast'
// ** translation 
import { t } from "i18next"
import { useTranslation } from 'react-i18next';
import { useAuth } from 'src/hooks/useAuth'





type TProps = {}

type TDefaultValues = {
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
}

const ChangePasswordPage: NextPage<TProps> = () => {
  // ** State
  const [showCurrentPassWord, setShowCurrentPassWord] = useState(false)
  const [showNewPassWord, setNewShowPassWord] = useState(false)
  const [showConfirmNewPassWord, setShowConfirmNewPassWord] = useState(false)

  // ** redux
  const dispatch: AppDispatch = useDispatch()

  //** router */
  const router = useRouter()

  const { logout } = useAuth();

  const { isLoading, isErrorChangePassword, isSuccessChangePassword, messageChangePassword } = useSelector((state: RootState) => state.auth)

  // ** Theme
  const theme = useTheme();

  const schema = yup
    .object()
    .shape({
      currentPassword: yup
        .string()
        .required('Password is required')
        .matches(PASSWORD_REG, 'The password format is content characters , special characters, numbers'),
      newPassword: yup
        .string()
        .required('Password is required')
        .matches(PASSWORD_REG, 'The password format is content characters , special characters, numbers'),
      confirmNewPassword: yup
        .string()
        .required('ConfirmPassword is required')
        .matches(PASSWORD_REG, 'The password and confirm password must be the same').oneOf([yup.ref("newPassword"), ""], "The confirm password must be the same password')")
    })


  const defaultValues: TDefaultValues = {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
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

  const onSubmit = (data: { currentPassword: string; newPassword: string }) => {
    if (!Object.keys(errors)?.length) {
      dispatch(changePasswordMeAsync({ currentPassword: data.currentPassword, newPassword: data.newPassword }))
    }
  }

  useEffect(() => {
    if (messageChangePassword) {
      if (isErrorChangePassword) {
        toast.error(messageChangePassword)
      } else if (isSuccessChangePassword) {
        toast.success(messageChangePassword)
        setTimeout(() => {
          logout()
        }, 500)
      }
      dispatch(resetInitialState())
    }
  }, [isErrorChangePassword, isSuccessChangePassword, messageChangePassword])

  return (
    <>
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
              {t("Change_password")}
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
                      label={t("Current_password")}
                      placeholder={t("Enter_current_password")}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.currentPassword)}
                      helperText={errors?.currentPassword ? errors?.currentPassword?.message : ''}
                      type={showCurrentPassWord ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setShowCurrentPassWord(!showCurrentPassWord)}
                              aria-label='toggle password visibility'
                            >
                              {showCurrentPassWord ? (
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
                  name='currentPassword'
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
                      label={t("New_password")}
                      placeholder={t("Enter_new_password")}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.newPassword)}
                      helperText={errors?.newPassword ? errors?.newPassword?.message : ''}
                      type={showNewPassWord ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setNewShowPassWord(!showNewPassWord)}
                              aria-label='toggle password visibility'
                            >
                              {showNewPassWord ? (
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
                  name='newPassword'
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
                      label={t("Confirm_new_password")}
                      placeholder={t("Enter_confirm_new_password")}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      error={Boolean(errors?.confirmNewPassword)}
                      helperText={errors?.confirmNewPassword ? errors?.confirmNewPassword?.message : ''}
                      type={showConfirmNewPassWord ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              edge='end'
                              onClick={() => setShowConfirmNewPassWord(!showConfirmNewPassWord)}
                              aria-label='toggle password visibility'
                            >
                              {showConfirmNewPassWord ? (
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
                  name='confirmNewPassword'
                />
              </Box>


              <Button sx={{ mt: 5, mb: 5 }} type='submit' fullWidth variant='contained' color='primary'>
                {t("Change_password")}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default ChangePasswordPage;



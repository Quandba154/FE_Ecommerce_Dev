// ** React
import React, { useEffect, useState } from 'react';

//Mui
import { Box, useTheme, Button, Typography, IconButton, Grid, Switch, styled } from '@mui/material';

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

// ** Service

//**User */
import { useAuth } from 'src/hooks/useAuth';

//**Icon */
import Iconfy from 'src/components/Icon'

//**Other */
import { createDeliveryTypeAsync, updateDeliveryTypeAsync } from 'src/stores/delivery-type/action';
import { getDetailsDelivery } from 'src/services/delivery-type';




interface TCreateEditDeliveryType {
    open: boolean,
    onClose: () => void,
    idDelivery?: string
}

type TDefaultValues = {
    name: string
}

// Styled Switch component
const StyledSwitch = styled(Switch)(({ theme, value }) => ({
    width: 56, // Overall width of the switch
    height: 32, // Overall height of the switch
    padding: '9px', // Padding around the switch for a larger clickable area
    '& .MuiSwitch-switchBase': {
        padding: '9px',
        color: '#fff', // Color of the thumb (circle) when unchecked
        '&.Mui-checked': {
            transform: 'translateX(24px)', // Position of the thumb when checked
            color: '#fff', // Color of the thumb when checked
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main, // Track color when checked
                opacity: 1,
                border: 'none', // No border when checked for a cleaner look
            },
        },
    },
    '& .MuiSwitch-thumb': {
        width: 22, // Size of the thumb
        height: 22,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2)', // Shadow for the thumb
        backgroundColor: '#fff', // Always white thumb for contrast
    },
    '& .MuiSwitch-track': {
        borderRadius: 32 / 2, // Border-radius for the track
        backgroundColor: theme.palette.error.main, // Track color when unchecked
        opacity: 1,
        border: '2px solid',
        // Border color changes with state based on the passed `value` prop
        borderColor: Boolean(value) ? theme.palette.primary.main : theme.palette.error.main,
    },
}));

const CreateEditDeliveryType = (props: TCreateEditDeliveryType) => {
    // ** State
    const [isLoading, setLoading] = useState(false)

    const dispatch: AppDispatch = useDispatch();

    //**Hook */
    const { user } = useAuth()

    const theme = useTheme()

    const { t, i18n } = useTranslation()

    const schema = yup
        .object()
        .shape({
            name: yup.string().required('Name is required'),
        })


    const defaultValues: TDefaultValues = {
        name: ""
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

    const onSubmit = (data: any) => {
        if (!Object.keys(errors)?.length) {
            if (idDelivery) {
                dispatch(updateDeliveryTypeAsync({
                    id: idDelivery,
                    name: data?.name,
                }))
            } else {
                dispatch(createDeliveryTypeAsync({
                    name: data?.name
                }))
            }
        }
    }

    const { open, onClose, idDelivery } = props;

    const fetchDetailDelivery = async (id: string) => {
        setLoading(true)
        await getDetailsDelivery(id).then((res) => {
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
            reset({
                ...defaultValues
            })
        } else if (idDelivery && open) {
            fetchDetailDelivery(idDelivery)
        }
    }, [open, idDelivery])


    return (
        <>
            {isLoading && <Spinner></Spinner>}
            <CustomModal open={open} onClose={onClose}>
                <Box sx={{ backgroundColor: theme.palette.customColors.bodyBg, padding: "20px", borderRadius: "15px" }}
                    minWidth={{ md: "500px", xs: "80vw" }}
                    maxWidth={{ md: "50vw", xs: "80vw" }}
                >
                    <Box sx={{ display: "flex", justifyContent: "center", position: "relative", paddingBottom: "20px" }}>
                        <Typography variant='h4' sx={{ fontWeight: 600 }}>{idDelivery ? t("Chỉnh sửa city") : t("Tạo city")}</Typography>
                        <IconButton sx={{ position: "absolute", top: "-4px", right: "-10px" }} onClick={onClose} >
                            <Iconfi icon="material-symbols-light:close" fontSize={"30px"} />
                        </IconButton>
                    </Box>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate>
                        <Box sx={{ backgroundColor: theme.palette.background.paper, borderRadius: "15px", py: 5, px: 4 }}  >
                            <Grid container md={12} xs={12} >
                                <Grid item md={12} xs={12}>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <CustomTextField
                                                required
                                                fullWidth
                                                label={t("name-city")}
                                                placeholder={t('enter-name')}
                                                onChange={onChange}
                                                onBlur={onBlur}
                                                value={value}
                                                error={Boolean(errors?.name)}
                                                helperText={errors?.name ? errors?.name?.message : ''}
                                            />
                                        )}
                                        name='name'
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button sx={{ color: "white !important", padding: "2px 8px !important", mt: 2, mb: 2, height: "40px", borderRadius: "10px !important", backgroundColor: "gray !important" }} type='submit' variant='contained' >
                                {!idDelivery ? t("create_city") : t("update_city")}
                            </Button>
                        </Box>
                    </form >
                </Box >
            </CustomModal >
        </>
    )

}
export default CreateEditDeliveryType
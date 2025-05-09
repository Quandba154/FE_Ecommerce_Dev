// React 
import React from 'react';
// ** Mui Imports
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
//**    Next */
import Image from 'next/image';
// ** components
import IconifyIcon from "src/components/Icon"
// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import { useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { ROUTE_CONFIG } from 'src/configs/route';



type TProps = {

}

const UserDropdown = (props: TProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const { user, logout } = useAuth();

    const open = Boolean(anchorEl);

    const router = useRouter();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigateMyProfile = () => {
        router.push(`/${ROUTE_CONFIG.MY_PROFILE}`)
        handleClose()
    }

    // ** Theme
    const theme = useTheme();

    //** Translation */
    const { t } = useTranslation()

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title={t("Account")}>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >

                        <Avatar sx={{ width: 32, height: 32 }}>
                            {user?.avatar ? (
                                <Image src={user?.avatar || ""} alt="avatar" style={{
                                    height: "auto",
                                    width: "auto"
                                }} />
                            ) : (
                                <IconifyIcon icon="ph:user-thin" />
                            )}
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box sx={{ backgroundColor: theme.palette.mode === "light" ? theme.palette.customColors.dark : theme.palette.customColors.dark }}>
                    <MenuItem onClick={handleClose}>
                        {/* {user?.firstName} {user?.middleName} {user?.lastName} */}
                        {user?.email}
                    </MenuItem>
                    <MenuItem onClick={handleNavigateMyProfile}>
                        <Avatar />{t("my_profile")}
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            {/* <Logout fontSize="small" /> */}
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Box>
            </Menu>
        </React.Fragment >
    )
}

export default UserDropdown


// sx={{ backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900] }}
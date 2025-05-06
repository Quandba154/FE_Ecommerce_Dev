// React 
import React from 'react';
// ** Mui Imports
import { Box, BoxProps, Menu, styled } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
//**    Next */
import { useTranslation } from 'react-i18next';
// ** components
import Icon from "src/components/Icon"
// config
import { LANGUAGE_OPTIONS } from 'src/configs/i18n';


type TProps = {}

interface TStyledItem extends BoxProps {
    selected: boolean
}

const StyledItemLanguage = styled(Box)<TStyledItem>(({ theme, selected }) => {
    console.log("selected", { selected });

    return ({
        cursor: "pointer",
        ".MuiTypography-root": {
            padding: "8px 20px",
            margin: "2px 10px"

        },
        "&:hover": {
            backgroundColor: theme.palette.mode === "light" ? theme.palette.primary.light : theme.palette.primary.dark,
            borderRadius: "10px",
            margin: "2px 10px"
        }
    })
})

const LanguageDropdown = (props: TProps) => {
    // ** state
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    //** hook */
    const { i18n } = useTranslation();

    console.log("i18n", i18n.language);


    const open = Boolean(anchorEl);

    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnchangeLanguage = (lang: string) => {
        i18n.changeLanguage(lang)
    }



    return (
        <>
            <IconButton color='inherit' id="language-dropdown" onClick={handleOpen}>
                <Icon icon="material-symbols-light:translate"></Icon>
            </IconButton >
            <Menu
                anchorEl={anchorEl}
                id={"language-dropdown"}
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
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                {
                    LANGUAGE_OPTIONS.map(lang => (
                        <MenuItem selected={lang.value === i18n.language} key={lang.value} onClick={() => handleOnchangeLanguage(lang.value)}>
                            {lang?.lang}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    )
}

export default LanguageDropdown



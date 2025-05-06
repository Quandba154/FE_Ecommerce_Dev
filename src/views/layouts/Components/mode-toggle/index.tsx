// React 
import React from 'react';
// ** Mui Imports
import IconButton from '@mui/material/IconButton';
//**    Next */
import Image from 'next/image';
// ** components
import Icon from "src/components/Icon"
// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import { useSettings } from 'src/hooks/useSettings';
import { Mode } from 'src/types/layouts';


type TProps = {}

const ModeToggle = (props: TProps) => {

    const { settings, saveSettings } = useSettings()

    const handleModeChange = (mode: Mode) => {
        saveSettings({ ...settings, mode })
    }

    const handleToggleMode = () => {
        if (settings.mode === "dark") {
            handleModeChange("light")
        } else {
            handleModeChange("dark")
        }
    }


    return (
        <IconButton color='inherit' onClick={handleToggleMode}>
            <Icon icon={settings.mode === "light" ? "material-symbols:dark-mode-outline" : "iconamoon:mode-light"}></Icon>
        </IconButton>
    )
}

export default ModeToggle

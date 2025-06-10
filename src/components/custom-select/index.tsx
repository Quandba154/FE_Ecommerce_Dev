import {
    Select,
    SelectProps,
    MenuItem,
    MenuItemProps,
    styled,
    InputLabel,
    Box,
    InputLabelProps,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface OptionType {
    label: string;
    value: string | number;
}

type TCustomSelect = SelectProps & {
    label?: string;
    options: OptionType[];
    id?: string;
};


const StyleSelect = styled(Select)(({ theme }) => ({
    "& .MuiSelect-select.MuiSelect-outlined.MuiInputBase-input": {
        padding: "8px 8px 8px 8px !important",
        height: "38px",
        boxSizing: "border-box",
    },
    "legend": {
        display: "none"
    },
    "svg": {
        bottom: "calc(50% - .6em) !important"
    },
    ".MuiOutlinedInput-notchedOutline": {
        top: "0px !important",
        bottom: "4px !important",
    }
}));

const CustomPlaceholder = styled(InputLabel)<InputLabelProps>(({ theme }) => ({
    position: "absolute",
    top: "8px",
    left: "10px",
    zIndex: 2
}));

const StyleMenuItem = styled(MenuItem)<MenuItemProps>(({ theme }) => ({}));

const CustomSelect = (props: TCustomSelect) => {
    const { t } = useTranslation();
    const {
        value,
        label,
        onChange,
        options,
        placeholder,
        id = "custom-select",
        fullWidth,
        ...rest
    } = props;

    const labelId = `${id}-label`;

    return (

        <Box sx={{ width: "100%", position: "relative" }}>
            {((Array.isArray(value) && !value.length) || value === "") && (
                <CustomPlaceholder>{placeholder}</CustomPlaceholder>
            )}

            <StyleSelect
                fullWidth={fullWidth}
                labelId={labelId}
                id={id}
                value={value}
                label={label}
                onChange={onChange}
                MenuProps={{
                    PaperProps: {
                        sx: {
                            zIndex: 9999,
                            maxHeight: 224,
                            overflowY: 'auto',
                        },
                    },
                }}
                {...rest}
            >
                {options.length > 0 ? (
                    options.map((opt) => (
                        <StyleMenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </StyleMenuItem>
                    ))
                ) : (
                    <StyleMenuItem value="">{t("no_data")}</StyleMenuItem>
                )}
            </StyleSelect>
        </Box>
    );
};

export default CustomSelect;

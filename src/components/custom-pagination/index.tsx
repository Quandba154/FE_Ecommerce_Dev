import { Box, Select, MenuItem, Pagination, styled, PaginationProps } from "@mui/material";
import React, { Ref } from "react";
import { useTranslation } from "react-i18next";


const StylePagination = styled(Pagination)<PaginationProps>(({ theme }) => ({
    ".MuiDataGrid-footerContainer": {
        ".MuiBox-root": {
            flex: 1,
            width: "100% !important"
        }
    }
}))

type TProps = {
    page: number;
    pageSize: number;
    rowLength: number;
    pageSizeOption: number[];
    onChangePagination: (page: number, pageSize: number) => void;
};

const CustomPagination = React.forwardRef((props: TProps, ref: Ref<any>) => {
    const { page, pageSize, rowLength, pageSizeOption, onChangePagination, ...rests } = props;

    const { t } = useTranslation()


    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", paddingLeft: "8px" }}>
            {rowLength > 0 ? (
                <Box>
                    <span>{t('is showing')}</span>
                    <span style={{ fontWeight: "bold" }}>
                        {page === 1 ? page : 1 + pageSize}
                    </span>
                    <span style={{ fontWeight: "bold" }}>{page * pageSize}</span>
                    <span>{t('trên')}</span>
                    <span style={{ fontWeight: "bold" }}>{rowLength}</span>
                </Box>
            ) : (
                <Box></Box>
            )}
            <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
                <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
                    <span>{t("Number of lines displayed")}</span>
                    <Select
                        size="small"
                        sx={{
                            width: "80px", padding: 0,
                            "& .MuiSelect-select.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": {
                                minWidth: "unset !important ", padding: '8.5px 12px 8.5px 24px !important'
                            }
                        }}
                        value={pageSize}
                        onChange={(e) => onChangePagination(1, +e.target.value)}
                    >
                        {pageSizeOption.map(opt => {
                            return (
                                <MenuItem value={opt} key={opt}>
                                    {opt}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </Box>
                <StylePagination color="primary" {...rests} />
            </Box>
        </Box>
    );
});

export default CustomPagination;

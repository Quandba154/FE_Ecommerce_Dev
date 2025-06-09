// ** MUI Imports
import { Box, Button, IconButton, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles'
import { useTranslation } from 'react-i18next';
import Iconfi from "src/components/Icon"




const StyledTableHeader = styled(Box)(({ theme }) => ({
  borderRadius: "15px",
  border: `1px solid ${theme.palette.primary.main}`,
  padding: "8px 10px",
  width: "100%",
  marginBottom: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}))

type TProps = {
  numRow: number
  onClear: () => void
  actions: { label: string, value: string, disabled?: boolean }[]
  handleAction: (type: string) => void
}

const TableHeader = (props: TProps) => {
  //**Hook */
  const theme = useTheme()
  const { t } = useTranslation()

  //**Props */
  const { numRow, onClear, actions, handleAction } = props

  return (
    <StyledTableHeader>
      <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Typography>{t("Rows_selected")}</Typography>
        <Typography sx={{
          backgroundColor: theme.palette.primary.main,
          height: "20px",
          width: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          color: theme.palette.customColors.lightPaperBg,
          fontWeight: 600,
          fontSize: "12px !important"
        }}>
          <span>{numRow}</span>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {actions?.map((action) => {
          return (
            <Button disabled={action?.disabled} sx={{ borderRadius: "5px !important" }} key={action.value} variant='contained' onClick={() => handleAction(action.value)}>
              {action.label}
            </Button>
          )
        })}
        <IconButton onClick={onClear}>
          <Iconfi icon="material-symbols-light:close" fontSize={"20px"} />
        </IconButton>
      </Box>
    </StyledTableHeader>
  );

};

export default TableHeader

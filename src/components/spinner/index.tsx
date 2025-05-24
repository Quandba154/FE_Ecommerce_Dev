// ** MUI Imports
import { styled, useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import { Modal, ModalProps } from '@mui/material'
// ** Custom Imports
import CircularWithValueLabel from '../custom-circular-process'

const CustomModule = styled(Modal)<ModalProps>(({ theme }) => ({
  "&.MuiModal-root": {
    window: "100%",
    height: '100%',
    zIndex: 2000,
    ".MuiModal-backdrop": {
      backgroundColor: `rgba(${theme.palette.customColors.main} , 0.2)`,
    }
  }
}))


const Spinner = ({ sx }: { sx?: BoxProps['sx'] }) => {

  return (
    <CustomModule open={true}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <CircularWithValueLabel />
      </Box>
    </CustomModule>
  )
}

export default Spinner

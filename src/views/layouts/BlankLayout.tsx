import React from 'react';
import { NextPage } from 'next';
import { Box, BoxProps, styled } from '@mui/material';



type TProps = {
    children: React.ReactNode;
}

const BankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
    height: "100vh",
}));


const BankLayout: NextPage<TProps> = ({ children }) => {
    return (
        <BankLayoutWrapper>
            <Box sx={{ overflow: "hidden", minHeight: "100vh" }}>
                {children}
            </Box>
        </BankLayoutWrapper >
    )
}

export default BankLayout;
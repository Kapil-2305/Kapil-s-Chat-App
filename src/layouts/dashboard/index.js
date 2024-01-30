import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Stack, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Logo from "../../assets/Images/logo.ico";
import Nav_Buttons from "../../data";

const DashboardLayout = () => {
    const theme = useTheme();

    return (
        <>
            <Box p={2} sx={{background: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: "100vh", width: 100}}>
                <Stack direction="column" alignItems={"center"} sx={{width: "100%"}}>
                    <Box sx={{
                        backgroundColor: theme.palette.primary.main,
                        height: 64,
                        width: 64,
                        borderRadius: 1.5,
                    }}>
                        <img src={Logo} alt="Chat App Logo"/>
                    </Box>

                    {
                        Nav_Buttons.map((el) => <IconButton key={el.index}>
                            {el.icon}
                        </IconButton>)
                    }
                </Stack>
            </Box>
            <Outlet />
        </>
    );
};

export default DashboardLayout;

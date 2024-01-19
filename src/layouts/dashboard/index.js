import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const DashboardLayout = () => {
    const theme = useTheme();

    console.log(theme);

    return (
        <>
            <Box sx={{background: "black", height: "100vh", width: 100}}>

            </Box>
            <Outlet />
        </>
    );
};

export default DashboardLayout;

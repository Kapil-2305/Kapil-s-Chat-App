import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";

const GeneralApp = () => {
    const theme = useTheme();
    return (
        <Stack direction={"row"} sx={{width: "100%"}}>
            {/* Chats */}
            <Chats />

            {/* Conversation */}
            <Box sx={{height: "100%", width: "calc(100vw - 716px)", backgroundColor: theme.palette.mode === "light" ? "#f0f4fa" : theme.palette.background.paper}}>
                <Conversation />
            </Box>

            {/* Contact */}
            <Contact />
        </Stack>
    );
};

export default GeneralApp;

import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import Media from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

const GeneralApp = () => {
    const theme = useTheme();
    const { sideBar, room_id, chat_type } = useSelector((state) => state.app);

    return (
        <Stack direction={"row"} sx={{width: "100%"}}>
            {/* Chats */}
            <Chats />

            {/* Conversation */}
            <Box sx={{height: "100%", width: sideBar.open  ? `calc(100vw - 740px )`  : "calc(100vw - 416px )", backgroundColor: theme.palette.mode === "light" ? "#f0f4fa" : theme.palette.background.paper}}>
                <Conversation />
            </Box>

            {/* Contact */}
            {sideBar.open &&
                (() => {
                    switch (sideBar.type) {
                    case "CONTACT":
                        return <Contact />;

                    case "STARRED":
                        return <StarredMessages />;

                    case "SHARED":
                        return <Media />;

                    default:
                        break;
                    }
                })()
            }
        </Stack>
    );
};

export default GeneralApp;

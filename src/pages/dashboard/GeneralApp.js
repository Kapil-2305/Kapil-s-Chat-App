import React from "react";
import Chats from "./Chats";
import { Stack, Box } from "@mui/material";
import Conversation from "../../components/Conversation";
import { useTheme } from "@mui/material/styles";
import Contact from "../../components/Contact";
import { useSelector } from "react-redux";
import Media from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import NoChat from "../../assets/Illustration/NoChat"

const GeneralApp = () => {
    const theme = useTheme();
    const { sideBar, room_id, chat_type } = useSelector((state) => state.app);

    return (
        <Stack direction={"row"} sx={{width: "100%"}}>
            {/* Chats */}
            <Chats />

            {/* Conversation */}
            <Box sx={{height: "100%", width: sideBar.open  ? `calc(100vw - 740px )`  : "calc(100vw - 416px )", backgroundColor: theme.palette.mode === "light" ? "#f0f4fa" : theme.palette.background.paper}}>
                {chat_type === "individual" && room_id !== null ? (
                    <ChatComponent />
                ) : (
                    <Stack
                        spacing={2}
                        sx={{ height: "100%", width: "100%" }}
                        alignItems="center"
                        justifyContent={"center"}
                    >
                        <NoChat />
                        <Typography variant="subtitle2">
                            Select a conversation or start a{" "}
                            <Link
                                style={{
                                    color: theme.palette.primary.main,
                                    textDecoration: "none",
                                }}
                                to="/"
                            >
                                new one
                            </Link>
                        </Typography>
                    </Stack>
                )} 
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

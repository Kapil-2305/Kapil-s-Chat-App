import React, { useState } from "react";
import { Box, Stack, Typography, IconButton, Button, Divider, Avatar, Badge } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles"
import { CircleDashed, MagnifyingGlass, ArchiveBox, Users } from "phosphor-react";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";
import { ChatList } from "../../data";
import { SimpleBarStyle } from "../../components/Scrollbar"
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/dashboard/Friends";

const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
    const theme = useTheme();
    const isDesktop = useResponsive("up", "md");

    const dispatch = useDispatch();

    const {conversations} = useSelector((state) => state.conversation.direct_chat);

    useEffect(() => {
        socket.emit("get_direct_conversations", { user_id }, (data) => {
            console.log(data); // this data is the list of conversations
            // dispatch action

            dispatch(FetchDirectConversations({ conversations: data }));
        });
    }, []);

    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    return (
        <>
            <Box
            sx={{
                position: "relative",
                width: 320,
                backgroundColor: theme.palette.mode === "light" ? "#F8FAFF" : theme.palette.background.default,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
            >
                <Stack p={3} spacing={2} sx={{height: "100vh"}}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5">
                            Chats
                        </Typography>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton 
                                onClick={() => {
                                    handleOpenDialog();
                                }}
                                sx={{ width: "max-content" }}
                            >
                                <Users />
                            </IconButton>
                            <IconButton sx={{ width: "max-content" }}>
                                <CircleDashed />
                            </IconButton>
                        </Stack>
                    </Stack>

                    <Stack sw={{width: "100%"}}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder="Search..." inputProps={{ "aria-label": "search" }} />
                        </Search>
                    </Stack>

                    <Stack spacing={1}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                            <ArchiveBox size={24}/>
                            <Button>Archive</Button>
                        </Stack>
                        <Divider />
                    </Stack>

                    <Stack direction={"column"} sx={{flexGrow: 1, overflow: "scroll", height: "100%"}}>
                        <SimpleBarStyle timeout={500} clickOnTrack={false}>
                            <Stack spacing={2.4}>
                                <Typography variant="subtitle2" sx={{color: "#676767"}}>
                                    Pinned
                                </Typography>
                                {
                                    ChatList.filter((el) => el.pinned).map((el) => {
                                        return (<ChatElement {...el}/>)
                                    })
                                }

                                <Typography variant="subtitle2" sx={{color: "#676767"}}>
                                    All Chats
                                </Typography>
                                {
                                    conversations.filter((el) => !el.pinned).map((el) => {
                                        return (<ChatElement {...el}/>)
                                    })
                                }
                            </Stack>
                        </SimpleBarStyle>
                    </Stack>
                </Stack>
            </Box>
            {openDialog && (
                <Friends open={openDialog} handleClose={handleCloseDialog} />
            )}
        </>
    );
};

export default Chats;

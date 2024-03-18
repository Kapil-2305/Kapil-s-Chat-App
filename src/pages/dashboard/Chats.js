import React from "react";
import { Box, Stack, Typography, IconButton, Button, Divider, Avatar } from "@mui/material";
import { CircleDashed, MagnifyingGlass, ArchiveBox } from "phosphor-react";
import { Search, SearchIconWrapper, StyledInputBase } from "../../components/Search";

const ChatElement = () => {
    return (
        <Box sx={{
            width: "100%",
            height: 60,
            borderRadius: 1,
            backgroundColor: "#FFF",
        }}>

        </Box>
    );

}

const Chats = () => {
    return (
        <>
            <Box
            sx={{
                position: "relative",
                height: "100vh",
                width: 320,
                backgroundColor: "#F8FAFF",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
            >
                <Stack p={3} spacing={2}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h5">
                            Chats
                        </Typography>
                        <IconButton>
                            <CircleDashed />
                        </IconButton>
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

                    <Stack direction={"column"}>
                        <ChatElement />
                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default Chats;

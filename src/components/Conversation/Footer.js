import React from "react";
import {
  Box,
  Stack,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { LinkSimple, Smiley, PaperPlaneTilt } from "phosphor-react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const StyledInput = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const ChatInput = () => {
    return (
        <StyledInput
            fullWidth
            placeholder="Write a message..."
            variant="filled"
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <InputAdornment>
                    <IconButton>
                        <LinkSimple />
                    </IconButton>
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment>
                    <IconButton>
                        <Smiley />
                    </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    )
};

const Footer = () => {
    const theme = useTheme();
    return (
        <Box
            p={2}
            sx={{
                width: "100%",
                backgroundColor:
                theme.palette.mode === "light"
                    ? "F8FAFF"
                    : theme.palette.background.paper,
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
                <Stack>
                    {/* Chat Input */}
                    <Box sx={{zIndex: 10, position: "fixed", bottom: 81, right: 100}}>
                        <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
                    </Box>
                    <ChatInput />
                </Stack>
                <Box
                sx={{
                    height: 48,
                    width: 48,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                }}
                >
                <Stack
                    sx={{ height: "100%", width: "100%" }}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <IconButton sx={{ color: "#fff" }}>
                    <PaperPlaneTilt />
                    </IconButton>
                </Stack>
                </Box>
            </Stack>
        </Box>
    );
};

export default Footer;

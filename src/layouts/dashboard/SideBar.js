import React, { useState } from "react";
import { Box, Stack, Avatar, IconButton, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { faker } from '@faker-js/faker';
import { Gear } from 'phosphor-react';
import { Nav_Buttons } from '../../data';
import AntSwitch from '../../components/AntSwitch';
import Logo from "../../assets/Images/logo.ico";
import useSettings from "../../hooks/useSettings";
import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";

const getPath = (index) => {
    switch (index) {
        case 0:
            return "/app";
    
        case 1:
            return "/group";
    
        case 2:
            return "/call";
    
        case 3:
            return "/settings";
    
        default:
            break;
    }
};

const SideBar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(0);
    const {onToggleMode} = useSettings();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box p={2} sx={{background: theme.palette.background.paper, boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)", height: "100vh", width: 100}}>
            <Stack direction="column" alignItems={"center"} justifyContent={"space-between"} sx={{height: "100%"}} spacing={3}>
                <Stack alignItems={"center"} spacing={4}>
                    <Box sx={{
                        backgroundColor: theme.palette.primary.main,
                        height: 64,
                        width: 64,
                        borderRadius: 1.5,
                    }}>
                        <img src={Logo} alt="Chat App Logo"/>
                    </Box>

                    <Stack sx={{width: "max-content"}} direction={"column"} alignItems={"center"} spacing={3}>
                        {
                            Nav_Buttons.map((el) => (
                                el.index === selected ? (
                                    <Box sx={{backgroundColor: theme.palette.primary.main, borderRadius: 1.5}}>
                                        <IconButton sx={{width: "max-content", color: "#fff"}} key={el.index}>
                                            {el.icon}
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <IconButton 
                                        onClick={()=>{
                                            setSelected(el.index);
                                            navigate(getPath(el.index));
                                        }} 
                                        sx={{width: "max-content", color: theme.palette.mode === "light" ? "#000" : "#fff"}} key={el.index}
                                    >
                                        {el.icon}
                                    </IconButton>
                                )
                            ))
                        }

                        <Divider sx={{width: "48px"}}/>
                        {
                            selected === 3 ? (
                                <Box sx={{backgroundColor: theme.palette.primary.main, borderRadius: 1.5}}>
                                    <IconButton sx={{width: "max-content", color: "#fff"}}>
                                        <Gear />
                                    </IconButton>
                                </Box>
                            ) : 
                            (
                                <IconButton 
                                    onClick={()=>{
                                        setSelected(3);
                                        navigate(getPath(3));
                                    }} 
                                    sx={{width: "max-content", color: theme.palette.mode === "light" ? "#000" : "#fff"}}
                                >
                                    <Gear />
                                </IconButton>
                            )
                        }
                    </Stack>
                </Stack>

                <Stack spacing={4}>
                    <AntSwitch onChange={()=> {onToggleMode()}} defaultChecked />
                    {/* Profile Menu */}
                    <ProfileMenu />
                </Stack>
            </Stack>
        </Box>
    )
}

export default SideBar
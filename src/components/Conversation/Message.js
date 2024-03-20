import React from 'react'
import { Box, Stack } from "@mui/material";
import { Chat_History } from '../../data';
import { Timeline, TextMsg, MediaMsg } from './MsgTypes';

const Message = () => {
    return (
        <Box p={3}>
            <Stack spacing={3}>
                {
                    Chat_History.map((el) => {
                        switch (el.type) {
                            case "divider" :
                                // Timeline
                                return <Timeline el={el}/>
                            case "msg" :
                                // Message
                                switch (el.subtype) {
                                    case "img" :
                                        // Image
                                        return <MediaMsg el={el} />
                                    case "doc" :
                                        // Document
                                        break;
                                    case "link" :
                                        // Link
                                        break;
                                    case "reply" :
                                        // Reply
                                        break;
                                    default :
                                        // Text msg
                                        return <TextMsg el={el}/>
                                }
                                break;
                            default :
                                return <></>
                        }
                    })
                }
            </Stack>
        </Box>
    )
}

export default Message
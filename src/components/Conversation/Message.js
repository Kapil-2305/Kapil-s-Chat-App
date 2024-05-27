import React from 'react'
import { Box, Stack } from "@mui/material";
import { Chat_History } from '../../data';
import { Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg } from './MsgTypes';

const Message = ({menu}) => {
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
                                        return <MediaMsg el={el} menu={menu}/>
                                    case "doc" :
                                        // Document
                                        return <DocMsg el={el} menu={menu}/>
                                    case "link" :
                                        // Link
                                        return <LinkMsg el={el} menu={menu}/>
                                    case "reply" :
                                        // Reply
                                        return <ReplyMsg el={el} menu={menu}/>
                                    default :
                                        // Text msg
                                        return <TextMsg el={el} menu={menu}/>
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
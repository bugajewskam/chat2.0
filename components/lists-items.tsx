import { IMessage } from "../interface/interface";

import { ListItem, ListItemText } from "@mui/material";
import { useRouter } from "next/router";

interface MessageListItemProps {
  message: IMessage;
}
export default function MessageListItem({ message }: MessageListItemProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemText
        style={{ textAlign: message.user ? "right" : "left" }}
        primary={message.text}
        secondary={message.user}
      />
    </ListItem>
  );
}

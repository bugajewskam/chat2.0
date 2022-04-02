
import { IMessage, IUser } from "../interface/interface";




// import { ListItem, ListItemButton, ListItemAvatar, Avatar, ListItemText } from "@mui/material";
// import { useRouter } from "next/router";
// import { PersonData } from "../pages/api/types";

// interface ItemProps {
//   item: PersonData;
// }

 export default function MessageListItem({  }: IMessage[]) {
  return <ListItem alignItems="flex-start">
      <ListItemText primary={message.message}/>

  </ListItem>;
}
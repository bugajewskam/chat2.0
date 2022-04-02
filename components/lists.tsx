import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { IMessage, IUser } from "../interface/interface";
import { bgcolor } from "@mui/system";

interface IListMessages {
  messages: IMessage[];
}
export default function messagesList( {messages}: IListMessages) {
  return(
  <List sx={{ width: "100%" , bgcolor : "background.paper" }}>
  
  </List>
  )
}

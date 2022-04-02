import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IMessage, IRoom, IUser } from "../interface/interface";
import { useState } from "react";
import { Box, Container, FormControl, Grid, TextField } from "@mui/material";
import { Message } from "../components/message";
import { moveMessagePortToContext } from "worker_threads";

const Index = () => {
  // pojedyńcza wiadomość
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const handleMessage = (e: any)=> setMessage(e.target.value)

  const handleSubmit = (e: any) =>{
    e.preventDefault();
    // zapobiegaj przeładowaniu
    addMessageToList({text: message, id: Math.random()});
    setMessage('')
  }

  const addMessageToList = (message: IMessage) => {
     setMessages((prevMessages:IMessage[])=> {
          return [...prevMessages, message]
     })

};
  return (
    <Container maxWidth="sm">
      <Grid container direction={"column"} sx={{ height: "70vh", borderColor: 'black'}}>
        
        
        <Grid item sx={{ flex: "1 1", overflow: "auto", border: 'solid 1px black' }}>
          <Box >
            

      {messages.map((item) => (
        <div key={item.id}>{item.text}</div>
      ))}
            
            
        </Box>
        </Grid>
        
        <Grid item>
        <FormControl
              onSubmit={handleSubmit}
              component="form"
              sx={{ marginTop: "10px", width: "100%" }}
            >
          <TextField
            fullWidth
            id="fullWidth"
            focused
            value={message}
            onChange={handleMessage}
          ></TextField>
          </FormControl>
        </Grid>

      </Grid>
    </Container>
  );
};
export default Index;

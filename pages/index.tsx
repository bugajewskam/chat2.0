import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { IMessage, IRoom, IUser, IChat } from "../interface/interface";
import { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  FormControl,
  Button,
  Grid,
  TextField,
  List,
} from "@mui/material";

import { io, Socket } from "socket.io-client";
import MessageListItem from "../components/lists-items";

const Index = () => {
  // pojedyńcza wiadomość
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [rooms, setRooms] = useState<string[]>(["General", "Test", "Help"]);
  const [activeRoom, setActiveRoom] = useState<string>("General");

  const handleMessage = (e: any) => setMessage(e.target.value);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // zapobiegaj przeładowaniu
    const messageObj = { text: message, id: Math.random(), type: "my" };
    addMessageToList(messageObj);
    socket?.emit("message", messageObj);
    setMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessageToList = (message: IMessage) => {
    setMessages((prevMessages: IMessage[]) => {
      return [...prevMessages, message];
    });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // dokumentacja
  useEffect(() => {
    const newSocket = io(`https://${window.location.hostname}`);
    newSocket.on("sendMessage", (message) => {
      addMessageToList(message);
    });
    setSocket(newSocket);
    () => socket?.close();
  }, []);

  useEffect(() => {
    if (socket) {
      setMessages([]);
      rooms.forEach((room) =>
        room === activeRoom
          ? socket.emit("join", activeRoom)
          : socket.emit("leave", room)
      );
    }
  }, [socket, activeRoom]);

  return (
    <Container maxWidth="sm" sx={{ marginTop: 2 }}>
      <Grid container sx={{ height: "70vh" }} spacing={1}>
        <Grid
          item
          xs={3}
          sx={{ flex: "1 1", overflow: "auto", border: "solid 1px black" }}
        >
          {rooms.map((room) => (
            <Button
              variant={room === activeRoom ? "contained" : "outlined"}
              sx={{ width: 100 }}
              onClick={() => setActiveRoom(room)}
            >
              {room}
            </Button>
          ))}
        </Grid>
        <Grid item xs={9}>
          <Grid
            container
            direction={"column"}
            sx={{ height: "72vh", borderColor: "black" }}
          >
            <Grid
              item
              sx={{ flex: "1 1", overflow: "auto", border: "solid 1px black" }}
            >
              <List>
                {messages.map((item) =>
                  <MessageListItem message={item}/>
                )}
                <div ref={messagesEndRef} />
              </List>
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
        </Grid>
      </Grid>
    </Container>
  );
};
export default Index;

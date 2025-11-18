import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";

export const getNotification = (email) => {
  return axios.get(`http://localhost:8080/api/notifications/${email}`,
    {headers:{"Content-Type":"application/json"}}
);
};

export const MarkRead=(id)=>{
  return(
    axios.put(`http://localhost:8080/api/notifications/${id}`,
      {headers:{"Content-Type":"application/json"}}
    )
  );
}

export const connectWebSocket = (onMessage) => {
  const socket = new SockJS("http://localhost:8080/ws"); 
  const client = new Client({
    webSocketFactory: () => socket,
    reconnectDelay: 5000,
    onConnect: () => {
      console.log("Connected to WebSocket");

      client.subscribe("/topic/notifications", (msg) => {
        const body = JSON.parse(msg.body);
        onMessage(body);
      });
    },
  });

  client.activate();
  return client;
};

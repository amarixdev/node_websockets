import { IncomingMessage } from "http";
import Websocket, { WebSocketServer } from "ws";

export default class SocketServer {
  private PORT: number;
  clients: Map<String | undefined, Websocket> = new Map();
  constructor(port: number) {
    this.PORT = port;
  }
  start() {
    const wss = new WebSocketServer({ port: this.PORT });

    wss.on("connection", (ws: Websocket, req: IncomingMessage) => {
      //use websocket key to distinguish clients
      let clientID = req.headers["sec-websocket-key"]

      this.clients.set(clientID, ws);
      console.log(`client ${clientID} has connected`);

      ws.on("message", (message: Websocket.RawData) => {
        console.log("Received message from client:", message.toString());
        this.broadcastMessage(message.toString(), clientID);
      });
    });

    console.log(`Server starting on port ${this.PORT}`);
  }

  private broadcastMessage(message: string, senderID: string | undefined) {
    //broadcast to everyone except sender
    this.clients.forEach((client, id) => {
      if (senderID !== id) {
        client.send(`${senderID?.substring(0,5)}: ${message.toString()}`);
      } else {
        client.send(`user: ${message.toString()} `)
          }
    });
  }
}

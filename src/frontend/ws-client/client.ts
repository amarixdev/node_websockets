import UIFactory from "../ui-factory.js";

export default class WebsocketClient {
  private HOSTNAME: string = "localhost";
  private PORT: number;
  private socket: WebSocket;

  constructor(port: number) {
    //establish a new websocket connection for the client
    this.PORT = port;
    this.socket = new WebSocket(`ws://${this.HOSTNAME}:${this.PORT}/`);

    //set up event listeners
    this.socket.addEventListener("open", () => {
      console.log("successfully connected to ws server");
    });
    this.socket.addEventListener("message", (message: MessageEvent) => {
      UIFactory.createChatBubble(message.data);
      console.log(message.data);
    });
    this.socket.addEventListener("error", () => {
      console.error("failed to connect to ws server");
    });
  }

  send(message: string): void {
    this.socket.send(message);
  }
}

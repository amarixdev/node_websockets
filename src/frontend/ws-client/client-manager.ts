import { Config } from "../../backend/config.js";
import UIFactory from "../ui-factory.js";
import WebsocketClient from "./client.js";
import Client from "./client.js";

export default class ClientManager {
  private clients: Map<Number, WebsocketClient> = new Map();

  //create and store new client connections
  add() {
    const clientID = this.clients.size;
    this.clients.set(clientID, new Client(Config.SOCKET_PORT));
    UIFactory.createClientUI(clientID, this.clients);
  }
}

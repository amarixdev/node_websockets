import SocketServer from "./network/websocket-server.js";
import HTTPServer from "./network/http-server.js";
import { Config } from "./config.js";

const http = new HTTPServer(Config.HTTP_PORT);
const socket = new SocketServer(Config.SOCKET_PORT);

enum Server {
    sockets,
    http
}

function startServer(server: Server) {
    switch (server) {
        case Server.sockets: {
            socket.start();
            break
        }
        case Server.http: {
            http.start();
            break
        }
    }
}

startServer(Server.sockets)


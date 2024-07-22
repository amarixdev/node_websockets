import http, { IncomingMessage, ServerResponse } from "http";

export default class HTTPServer {
  private hostname = "localhost";
  private port: number;
  private dummyText = "Hello world"
  constructor(port: number) {
    this.port = port
  }
  start() {
    const server = http.createServer(
      (req: IncomingMessage, res: ServerResponse) => {
        console.log("REQ: " + req.headers.host)
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.setHeader("Content-Length", this.dummyText.length)
        res.end(this.dummyText);
      }
    );
    server.listen(this.port, this.hostname, () => {
      console.log(`Server running at http://${this.hostname}:${this.port}/`);
    });
  }
}

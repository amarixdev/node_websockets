import WebsocketClient from "./ws-client/client.js";

export default class UIFactory {
  static createChatBubble(message: string) {
    const chatBubbleId =
      message.split(":")[0] === "user" ? "chat-bubble-user" : "chat-bubble";

    let incomingMessage = document.getElementById("chat-window");
    let chatBubble = `
              <p id= ${chatBubbleId} >${message}</p>
            `;

    if (incomingMessage != null) {
      incomingMessage.insertAdjacentHTML("beforeend", chatBubble);
    }
  }

  static createClientUI(
    clientId: number,
    clients: Map<Number, WebsocketClient>
  ) {
    const element = `
        <div id=${clientId} class="client">
        <textarea
          id="messageInput"
          rows="10"
          cols="50"
          placeholder="Type your message here..."
        ></textarea>
        <button id="sendButton">Send Message</button>
      </div>
        `;

    let clientContainer = document.getElementById("client-container");
    if (clientContainer != null) {
      clientContainer.insertAdjacentHTML("beforeend", element);
    }

    let client = document.getElementById(`${clientId}`);
    const sendButton = client?.children[1];

    sendButton?.addEventListener("click", () => {
      console.log(clients);
      const textArea: HTMLTextAreaElement = client
        ?.children[0] as HTMLTextAreaElement;
      clients.get(Number(client?.id))?.send(textArea.value);
      textArea.value = "";
    });
  }
}

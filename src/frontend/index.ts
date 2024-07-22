import ClientManager from "./ws-client/client-manager.js";

const clientManger = new ClientManager();

const newClientButton = document.getElementById("new-client-button");
newClientButton?.addEventListener("click", () => {
    clientManger.add();
});

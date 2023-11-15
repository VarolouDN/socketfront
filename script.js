const socket = io("https://socketback-gray.vercel.app");
const messageContainer = document.getElementById("message");
const messageForm = document.getElementById("send");
const messageInput = document.getElementById("input");

const name = prompt("What is your name?");
appendMessage("You Joined");

socket.emit("new-user", name);

socket.on("chat-message", (data) => {
  console.log(data);
  appendMessage(`${data.name}:${data.message}`);
});
socket.on("user-connected", (name) => {
  console.log(name);
  appendMessage(`${name} connected`);
});
socket.on("user-disconnected", (name) => {
  console.log(name);
  appendMessage(`${name}: disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You:${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");

  messageElement.innerText = message;

  messageContainer.append(messageElement);
}

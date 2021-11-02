// eslint-disable-next-line no-undef
const socket = io("/");

socket.on("hello", () => console.log("Somebody said Hello"));

function handleMessageNoti(data) {
  const { message, nickname } = data;
  console.log(`${nickname} said ${message}`);
}

socket.on("messageNoti", handleMessageNoti);

function sendMessage(message) {
  socket.emit("newMessage", { message });
}

function setNickname(nickname) {
  socket.emit("setNickname", { nickname });
}

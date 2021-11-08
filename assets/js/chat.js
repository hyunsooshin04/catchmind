import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

// "유저이름 : 메세지 내용" UI에 띄워주기
const appendMsg = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `<span class="author ${nickname ? "notMe" : "me"}" >${
    nickname ? nickname : "You"
  }: </span> ${text}`;
  messages.appendChild(li);
};

const handleSendMsg = (event) => {
  //새로고침 방지
  event.preventDefault();
  //유저가 입력한 값 받아오기
  const input = sendMsg.querySelector("input");
  const { value } = input; // value = input.value
  // 실제로 소켓통신하기
  // sendMsg라는 이벤트를 발생시켜서, 유저가 입력한 내용 전달

  getSocket().emit(window.events.sendMsg, { message: value });

  //입력값을 UI에 표시
  appendMsg(value);
};

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}

export const handleNewMsg = ({ message, nickname }) =>
  appendMsg(message, nickname);

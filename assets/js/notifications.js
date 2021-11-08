// 다른 유저가 나간 경우

const noti = document.querySelector("body");

// 메세지를 div에 띄워주려고 함
const fireNoti = (text, color) => {
  const n = document.createElement("div");
  n.innerText = text;
  n.style.backgroundColor = color;
  n.className = "notification";
  noti.appendChild(n);
};

export const handleNewUser = ({ nickname }) => {
  fireNoti(`${nickname} is joined!`, "rgb(0,122,255)");
};

export const handleDisconnected = ({ nickname }) => {
  fireNoti(`${nickname} is left!`, "rgb(255,149,0)");
};

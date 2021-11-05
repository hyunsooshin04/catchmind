const noti = document.getElementById("jsNotifications");

const fireNoti = (text) => {
  const n = document.createElement("div");
  n.innerText = text;
  n.className = "notification";
  noti.appendChild(n);
};

export const handleNewUser = ({ nickname }) => {
  fireNoti(`${nickname} is joined!`);
};

export const handleDisconnected = ({ nickname }) => {
  fireNoti(`${nickname} is left!`);
};

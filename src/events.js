const events = {
  setNickname: "setNickname",
  newUser: "newUser",
  disconnect: "disconnect", // connection 과 동일한 부류
  disconnected: "disconnected",
  sendMsg: "sendMsg", // 채팅 보냈을 때
  newMsg: "newMsg", // 채팅 받을 때
};

export default events;

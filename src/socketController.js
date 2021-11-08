import events from "./events";

const socketController = (socket) => {
  socket.on(events.setNickname, ({ nickname }) => {
    console.log(nickname);
    socket.nickname = nickname;
    socket.broadcast.emit(events.newUser, { nickname });
  });

  socket.on(events.disconnect, () => {
    socket.broadcast.emit(events.disconnected, { nickname: socket.nickname });
  });

  // sendMsg 이벤트를 받고, 그 값(채팅)을
  // 모든 유저에게 전달 (broadcast)하는 이벤트
  // newMsg 발생
  socket.on(events.sendMsg, ({ message }) => {
    socket.broadcast.emit(events.newMsg, {
      message,
      nickname: socket.nickname,
    });
  });
};

export default socketController;

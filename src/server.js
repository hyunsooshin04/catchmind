import express from "express";
import { join } from "path";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const app = express();
const PORT = 4000;

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(logger("dev"));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);
app.use(express.static(join(__dirname, "static")));

const handleListener = () => {
  console.log(`Server Running : http://localhost:${PORT}`);
};
const server = app.listen(PORT, handleListener);

const io = socketIO(server);

io.on("connection", (socket) => {
  socketController(socket);
});

// eslint-disable-next-line no-unused-vars
function send(Message) {
  console.log(Message);
}

io.on("connection", (socket) => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNoti", {
      message,
      nickname: socket.nickname || "Anonymous",
    });
  });
  socket.on(events, ({ nickname }) => {
    socket.nickname = nickname;
  });
});
//npm run dev:server

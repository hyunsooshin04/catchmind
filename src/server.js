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
  res.render("home", { backend_delivered_events: JSON.stringify(events) })
);
app.use(express.static(join(__dirname, "static")));

const handleListener = () => {
  console.log(`✅ Server Running : http://localhost:${PORT}`);
};
const server = app.listen(PORT, handleListener);
const io = socketIO(server);

io.on("connection", (socket) => {
  socketController(socket);
});

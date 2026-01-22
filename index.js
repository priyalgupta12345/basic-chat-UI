const express = require("express");
const { createServer } = require("http");


const { Server } = require("socket.io");
const { join } = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server);

// ⭐ allow serving style.css
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);

  });
  socket.on("typing", user => {
  console.log(user + " is typing...");
});

  // socket.on("chat message", msg => console.log("Message:", msg));
 // socket.on("typing", user => console.log(" is typing..."));
  //socket.on("user joined", user => console.log(" joined the chat"));

});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

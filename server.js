const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(express.static(path.join(__dirname, "public")));

const lobbies = new Map();

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code;
  do {
    code = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  } while (lobbies.has(code));
  return code;
}

function playerList(lobby) {
  return Array.from(lobby.players.values());
}

io.on("connection", (socket) => {
  let myCode = null;

  const getLobby = () => (myCode ? lobbies.get(myCode) : null);
  const getMe = () => getLobby()?.players.get(socket.id);

  socket.on("createLobby", ({ nickname, characterId }) => {
    const code = generateCode();
    const player = {
      id: socket.id,
      nickname: (nickname || "لاعب").trim().slice(0, 14),
      characterId: characterId || "ofah",
      ready: false,
      alive: true,
      x: 0,
      rank: null,
    };
    lobbies.set(code, {
      code,
      hostId: socket.id,
      players: new Map([[socket.id, player]]),
      state: "waiting",
      finishCount: 0,
    });
    myCode = code;
    socket.join(code);
    socket.emit("lobbyCreated", { code, playerId: socket.id, players: [player] });
  });

  socket.on("joinLobby", ({ code, nickname, characterId }) => {
    const norm = (code || "").trim().toUpperCase();
    const lobby = lobbies.get(norm);
    if (!lobby) return socket.emit("lobbyError", "الغرفة غير موجودة");
    if (lobby.state !== "waiting") return socket.emit("lobbyError", "اللعبة بدأت بالفعل");
    if (lobby.players.size >= 10) return socket.emit("lobbyError", "الغرفة ممتلئة (10/10)");

    const player = {
      id: socket.id,
      nickname: (nickname || "لاعب").trim().slice(0, 14),
      characterId: characterId || "ofah",
      ready: false,
      alive: true,
      x: 0,
      rank: null,
    };
    lobby.players.set(socket.id, player);
    myCode = norm;
    socket.join(norm);
    socket.emit("lobbyJoined", { code: norm, playerId: socket.id, hostId: lobby.hostId, players: playerList(lobby) });
    socket.to(norm).emit("playerJoined", player);
  });

  socket.on("setReady", (ready) => {
    const lobby = getLobby();
    const me = getMe();
    if (!lobby || !me) return;
    me.ready = !!ready;
    io.to(myCode).emit("readyChanged", { id: socket.id, ready: me.ready });
  });

  socket.on("startGame", () => {
    const lobby = getLobby();
    if (!lobby || lobby.hostId !== socket.id) return;
    lobby.state = "playing";
    io.to(myCode).emit("gameStarted");
  });

  socket.on("playerUpdate", ({ x, y, flipX, animKey }) => {
    const lobby = getLobby();
    const me = getMe();
    if (!lobby || !me || lobby.state !== "playing") return;
    me.x = x;
    socket.to(myCode).emit("playerMoved", { id: socket.id, x, y, flipX, animKey });
  });

  socket.on("playerDied", () => {
    const me = getMe();
    if (me) me.alive = false;
    socket.to(myCode).emit("playerDied", { id: socket.id });
  });

  socket.on("playerFinished", () => {
    const lobby = getLobby();
    const me = getMe();
    if (!lobby || !me) return;
    lobby.finishCount += 1;
    me.alive = false;
    me.rank = lobby.finishCount;
    io.to(myCode).emit("playerFinished", { id: socket.id, rank: lobby.finishCount });
  });

  socket.on("disconnect", () => {
    const lobby = getLobby();
    if (!lobby) return;
    lobby.players.delete(socket.id);
    socket.to(myCode).emit("playerLeft", { id: socket.id });
    if (lobby.players.size === 0) {
      lobbies.delete(myCode);
    } else if (lobby.hostId === socket.id) {
      const newHost = lobby.players.values().next().value;
      lobby.hostId = newHost.id;
      io.to(myCode).emit("hostChanged", { id: newHost.id });
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => console.log(`Server :${PORT}`));

// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {});

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// let userCount = 0;
// io.on("connection", (socket) => {
//     userCount++;
//     console.log("a user connected");
//     io.emit("userCount", userCount);

//     socket.on("join", (param) => {
//         console.log("user join");
//         io.emit("user", userCount);
//     });

//     socket.on("message", (param) => {
//         console.log("user mengirim pesan");
//         io.emit("message", param);
//     });

//     socket.on("disconnect", () => {
//         console.log("user keluar");
//         if (userCount > 0) {
//             userCount--;
//         }
//         io.emit("userCount", userCount);
//     });
// });

// server.listen(3000, () => {
//     console.log(`Server running at http://localhost:3000`);
// });




// const express = require("express");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {});

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index02.html");
// });

// let userCount = 0;
// io.on("connection", (socket) => {
//     userCount++;
//     console.log("a user connected");
//     io.emit("userCount", userCount);

//     socket.on("join", (param) => {
//         console.log(`${param.user} joined`);
//         io.emit("user", userCount);
//     });

//     socket.on("message", (param) => {
//         console.log(`${param.user} mengirim pesan`);
//         io.emit("message", param);
//     });

//     socket.on("disconnect", () => {
//         console.log("user keluar");
//         if (userCount > 0) {
//             userCount--;
//         }
//         io.emit("userCount", userCount);
//     });
// });

// server.listen(3000, () => {
//     console.log(`Server running at http://localhost:3000`);
// });



const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index02.html");
});

let userCount = 0;
let messageHistory = []; // Array untuk menyimpan riwayat pesan

io.on("connection", (socket) => {
    userCount++;
    console.log("a user connected");
    io.emit("userCount", userCount);

    // Kirim riwayat pesan ke pengguna baru
    socket.emit("messageHistory", messageHistory);

    socket.on("join", (param) => {
        console.log(`${param.user} joined`);
        io.emit("user", userCount);
    });

    socket.on("message", (param) => {
        console.log(`${param.user} mengirim pesan`);
        messageHistory.push(param); // Simpan pesan ke riwayat
        io.emit("message", param);
    });

    socket.on("disconnect", () => {
        console.log("user keluar");
        if (userCount > 0) {
            userCount--;
        }
        io.emit("userCount", userCount);
    });
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});

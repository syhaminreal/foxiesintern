const http = require("http");
const express = require("express");
const { Server} = require("socket.io")


const path = require("path"); // Import path module
const app = express();

const server = http.createServer(app);

const io = new Server(server)

// Handle socket.io connection
io.on("connection", (socket) => {
    console.log("A new user joined or connected");
});

// Corrected static files path
app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) =>{
    return res.sendFile("/public/index.html")
})

app.get
server.listen(9000, () => console.log(`Server started at port 9000`));

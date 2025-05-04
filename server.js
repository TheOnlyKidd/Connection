const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

let servers = [];

app.get("/api/servers", (req, res) => {
    res.json({ servers });
});

app.post("/api/servers", (req, res) => {
    const server = req.body;
    servers.push(server);
    res.status(201).json({ message: "Server registered" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Matchmaker running on port ${PORT}`));

const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

let serverList = [];

// Register new server
app.post('/api/servers', (req, res) => {
  const server = req.body;
  const id = `${server.ip}:${server.port}`;

  if (!serverList.some(s => `${s.ip}:${s.port}` === id)) {
    serverList.push(server);
    return res.status(201).json({ message: 'Server registered' });
  }

  return res.status(409).json({ message: 'Server already exists' });
});

// 🔧 Update player count (your new route)
app.put('/api/servers/update', (req, res) => {
  const { ip, port, playerCount, maxPlayers } = req.body;

  const id = `${ip}:${port}`;
  const index = serverList.findIndex(s => `${s.ip}:${s.port}` === id);

  if (index !== -1) {
    serverList[index] = { ip, port, playerCount, maxPlayers };
  } else {
    serverList.push({ ip, port, playerCount, maxPlayers });
  }

  return res.sendStatus(200);
});

// Get all servers
app.get('/api/servers', (req, res) => {
  res.json(serverList);
});

app.listen(PORT, () => {
  console.log(`Matchmaker running on port ${PORT}`);
});

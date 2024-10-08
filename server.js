const WebSocket = require("ws");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    console.log("Received:", message);

    const query = "SELECT * FROM user WHERE email = ?";
    db.query(query, [message], (err, results) => {
      if (err) {
        console.error("Error querying database:", err);
        ws.send("Error");
        return;
      }
      if (results.length > 0) {
        ws.send("Yes");
      } else {
        ws.send("No");
      }
    });
  });
});

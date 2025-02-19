const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { LowSync } = require("lowdb");
const { JSONFileSync } = require("lowdb/node");

const PORT = process.env.PORT || 4000;

// Setup LowDB
const adapter = new JSONFileSync("db.json");
const db = new LowSync(adapter);

// Set default values if db.json is empty
db.read();
db.data ||= { books: [] };
db.write();

const app = express();
app.db = db;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

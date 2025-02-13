require("dotenv").config();

const http = require("http");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};

http.createServer(requestHandler).listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
///.env
DATABASE_URL='postgresql://neondb_owner:npg_tisPmzyMc1o5@ep-plain-glitter-a8hvtlf5-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
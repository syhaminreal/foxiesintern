
//Redis (Remote Dictionary Server) is an open-source, in-memory data store used as a database, cache, and message broker. It is blazingly fast because it keeps data in RAM (Random Access Memory) instead of traditional disk storage.
 import { createClient } from "redis";

// Create a Redis client
const client = createClient();

client.on("error", (err) => console.error("Redis Client Error", err));

// Connect to Redis
await client.connect();

// Set and Get example
await client.set("key", "value");
const value = await client.get("key");

console.log(value); // Output: "value"

// Close the connection when done
await client.quit();


// import { createClient } from "redis";

// const client = createClient();

// client.on("error", (err) => console.error("Redis Error:", err));

// await client.connect();

// await client.set("username", "shyamin");
// const username = await client.get("username");

// console.log(username); // Output: shyamin

// await client.quit();

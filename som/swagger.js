const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My API",
    description: "API Documentation",
  },
  host: "localhost:5000", // Ensure this matches your server's port
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const routes = ["./routes.js"];

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log("Swagger documentation generated successfully!");
});

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");

const app = express();

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A simple API documentation",
    },
    servers: [
      {
        url: "http://localhost:5000", // Change based on your API URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Specify the path to your API route files
};

// Generate Swagger documentation
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
  console.log("Swagger UI available at http://localhost:5000/api-docs");
});

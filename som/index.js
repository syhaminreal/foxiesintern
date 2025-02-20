require("dotenv").config();
const express = require("express");
const connectDB = require("./dbconnect");
const router = require("./routes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

const app = express();

// Connect to MongoDB once at the start
connectDB();

app.use(express.json());
app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});

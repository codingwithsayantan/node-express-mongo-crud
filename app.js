import express from "express";
import bodyParser from "body-parser";

import router from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes
app.use(router);

app.listen(PORT, () => {
  console.log(`Server connected at ${PORT}`);
});

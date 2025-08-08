import express from "express";
import db from "./conn/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createTables } from "./models/setupTables.js";
import authRoutes from "./routes/auth.js";
import listRoutes from "./routes/lists.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());


createTables();

app.use("/auth", authRoutes);
app.use("/lists", listRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

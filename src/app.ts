import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({
    limit: "16kb"
}))

// ROUTES IMPORT HERE
import fileRoutes from "./routes/file.route.js"

app.use("/api/files", fileRoutes);

export default app;
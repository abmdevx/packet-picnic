import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({
    limit: "16kb"
}))

// ROUTES IMPORT HERE
import fileRoutes from "./routes/file.route.js"
import healthRoutes from "./routes/health.route.js"

app.use("/api/v1/files", fileRoutes);

app.use("/api/v1/health", healthRoutes);
export default app;
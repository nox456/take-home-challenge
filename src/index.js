import express from "express";
import morgan from "./middlewares/morgan.js";
import job from "./cron/job.js";
import { HOST, PORT } from "./config/env.js";

// Initialize app
const app = express();

// Middlewares
app.use(morgan);
app.use(express.json());

// Routes

// Start Server
app.listen(PORT, HOST, () => {
    console.clear();
    console.log(`Server running at http://${HOST}:${PORT}`);
    job.start();
    console.log(`Cron job running`);
});

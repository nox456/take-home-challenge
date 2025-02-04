import express from "express";
import morgan from "./middlewares/morgan.js";
import job from "./cron/job.js";

// Initialize app
const app = express();

// Middlewares
app.use(morgan);
app.use(express.json());

// Routes

// Start Server
app.listen(4000, () => {
    console.clear();
    console.log(`Server running at http://${"localhost"}:${4000}`);
    job.start();
    console.log(`Cron job running`);
});

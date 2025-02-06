import { Pool } from "pg";
import {
    DB_PASSWORD,
    DB_USER,
    DB_NAME,
    DB_PORT,
    DB_HOST
} from "../config/env.js";

const db = new Pool({
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
});

export default db;

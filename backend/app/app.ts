import express from "express";
import { corsConfig } from "./config/cors";

export const app = express();

app.use(express.json());
app.use(corsConfig);

// express-rate-limit configuration - proxy issue:
// app.set('trust proxy', 1)

import express from "express";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getData, getDateDiff, getMainPage } from "./client_routes.js";
import cors from 'cors' 
import dotenv from "dotenv";

dotenv.config();

const app = express()

// Permite consulta entre domínios diferentes
if (process.env.ENABLE_CORS === "true") {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
    app.use(cors({ origin: allowedOrigins.length > 0 ? allowedOrigins : "*" }));
    console.warn("\n\x1b[33mWarning\x1b[0m Cross-Origin Resource Sharing: true\n\x1b[33mWarning\x1b[0m Allowed origins:", allowedOrigins, "\n");
} 

// pega a rota absoluta 
export const __dirname = dirname(fileURLToPath(import.meta.url));


app.get('/', getMainPage)

app.get('/api/:date?', getData)

app.get('/api/diff/:date1/:date2', getDateDiff)

app.listen('3000', () => console.log('Ouvindo na porta 3000'))
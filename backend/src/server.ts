import cors from "cors";
import 'dotenv/config';
import express from "express";
import path from "path";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(router);


const PORT = process.env.PORT! || 3333;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})
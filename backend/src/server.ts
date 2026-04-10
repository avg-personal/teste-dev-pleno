import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import operationRoutes from './routes/operationRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/operations', operationRoutes);

// Rotas de Autenticação
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
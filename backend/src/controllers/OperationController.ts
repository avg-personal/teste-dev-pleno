import { Request, Response } from 'express';
import prisma from '../database/prisma';
import { calculateUpdatedValue } from '../services/TaxService';

export const createOperation = async (req: Request, res: Response) => {
  try {
    const { type, product, date, quantity } = req.body;
    const userId = (req as any).userId; // token via middleware

    const operation = await prisma.operation.create({
      data: {
        type, // BUY ou SELL
        product, // GASOLINE, ETHANOL ou DIESEL
        date: new Date(date),
        quantity: parseFloat(quantity),
        userId
      }
    });

    // Calcular o valor atualizado para exibir na resposta
    const updatedValue = calculateUpdatedValue(type, product, date, quantity);

    return res.status(201).json({
      message: 'Operação registrada!',
      operation,
      updatedValue: updatedValue.toFixed(2)
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao registrar operação.' });
  }
};

export const getSummary = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;

    // 1. Procurar todas as operações deste utilizador
    const operations = await prisma.operation.findMany({
      where: { userId }
    });

    let totalBuy = 0;
    let totalSell = 0;

    // 2. Percorrer as operações e calcular os valores com impostos e Selic
    operations.forEach((op: { type: string; product: string; date: Date; quantity: number; }) => {
      const updatedValue = calculateUpdatedValue(
        op.type as 'BUY' | 'SELL',
        op.product as 'GASOLINE' | 'ETHANOL' | 'DIESEL',
        op.date,
        op.quantity
      );

      if (op.type === 'BUY') {
        totalBuy += updatedValue;
      } else {
        totalSell += updatedValue;
      }
    });

    // 3. Calcular a diferença (Créditos Tributários)
    const difference = totalSell - totalBuy;

    return res.json({
      totalOperations: operations.length,
      totalBuy: totalBuy.toFixed(2),
      totalSell: totalSell.toFixed(2),
      taxCreditDifference: difference.toFixed(2),
      status: difference >= 0 ? 'Lucro/Crédito Positivo' : 'Crédito Negativo'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao gerar o resumo.' });
  }
};

export const getOperations = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const operations = await prisma.operation.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  });
  return res.json(operations);
};
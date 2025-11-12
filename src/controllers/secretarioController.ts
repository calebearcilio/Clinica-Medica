import { Request, Response } from "express";
import { Secretario } from "../generated/prisma/client";
import * as secretarioService from "../services/secretarioService";

// Busca todos os secretários
export const getAllSecretarios = async (req: Request, res: Response) => {
  try {
    const secretarios = await secretarioService.getAll();
    return res.status(200).json(secretarios);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

// Busca um secretário pelo ID
export const getSecretarioById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      res
        .status(400)
        .json({ error: "O ID deve ser um número inteiro positivo." });
    }

    const secretario: Secretario = await secretarioService.getById(id);
    return res.status(200).json(secretario);
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

// Cria um novo secretário
export const createSecretario = async (req: Request, res: Response) => {
  try {
    const secretario: Secretario = await secretarioService.create(req.body);

    return res.status(201).json(secretario);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateSecretario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      res
        .status(400)
        .json({ error: "O ID deve ser um número inteiro positivo." });
    }

    const secretario = await secretarioService.update(id, req.body);
    return res.status(200).json(secretario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSecretario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id) || id <= 0) {
      res
        .status(400)
        .json({ error: "O ID deve ser um número inteiro positivo." });
    }
    await secretarioService.remove(id);

    return res.status(204).send();
  } catch (error: any) {
    return res.status(404).json({ error: error.message });
  }
};

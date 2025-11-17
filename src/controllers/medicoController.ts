import { Request, Response } from "express";
import * as medicoService from "../services/medicoService";

// Buscar todos os médicos
export const getAllMedicos = async (req: Request, res: Response) => {
  try {
    const medicos = await medicoService.getAll();
    return res.status(200).json(medicos);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno no servidor.",
    });
  }
};

// Buscar um médico pelo CRM
export const getById = async (req: Request, res: Response) => {
  try {
    const medico = await medicoService.getById(Number(req.params.id));

    if (!medico) {
      return res.status(404).json({
        message: "Médico(a) não encontrado(a).",
      });
    }

    return res.status(200).json(medico);
  } catch (error: any) {
    return res.status(500).json({
      message: "Erro interno no servidor.",
    });
  }
};

// Criar um novo médico
export const createMedico = async (req: Request, res: Response) => {
  try {
    const medico = await medicoService.create(req.body);
    return res.status(200).json(medico);
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: `${error.meta.target} já está em uso.`,
      });
    }

    return res.status(500).json({
      message: "Erro interno no servidor.",
    });
  }
};

// Atualizar informações do médico
export const updateMedico = async (req: Request, res: Response) => {
  try {
    const medico = await medicoService.update(Number(req.params.id), req.body);
    return res.status(200).json(medico);
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Médico(a) não encontrado(a).",
      });
    }

    if (error.code === "P2002") {
      return res.status(409).json({
        message: `${error.meta.target} já está em uso.`,
      });
    }

    return res.status(500).json({
      message: "Erro interno no servidor.",
    });
  }
};

// Deletar um médico
export const deleteMedico = async (req: Request, res: Response) => {
  try {
    await medicoService.remove(Number(req.params.id));
    return res.status(204).send();
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Médico(a) não encontrado(a).",
      });
    }

    return res.status(500).json({
      message: "Erro interno no servidor.",
    });
  }
};

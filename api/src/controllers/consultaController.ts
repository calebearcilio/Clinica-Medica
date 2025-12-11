import { Request, Response } from "express";
import consultaService from "../services/consultaService";

const consultaController = {
  async getAllConsultas(req: Request, res: Response) {
    try {
      const consultas = await consultaService.getAll();
      res.status(200).json(consultas);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  async getConsultaById(req: Request, res: Response) {
    try {
      const consulta = await consultaService.getById(Number(req.params.id));

      if (!consulta) {
        return res.status(404).json({
          message: "Consulta não encontrada.",
        });
      }

      return res.status(200).json(consulta);
    } catch (error: any) {
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  async createConsulta(req: Request, res: Response) {
    try {
      const consulta = await consultaService.create(req.body);
      return res.status(201).json(consulta);
    } catch (error: any) {
      if (error.message) {
        return res.status(400).json({
          message: error.message,
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  async updateConsulta(req: Request, res: Response) {
    try {
      const consulta = await consultaService.update(
        Number(req.params.id),
        req.body
      );
      return res.status(204).json(consulta);
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Consulta não encontrada.",
        });
      }
      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },

  async deleteConsulta(req: Request, res: Response) {
    try {
      await consultaService.remove(Number(req.params.id));
      return res.status(204).send();
    } catch (error: any) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Consulta não encontrada.",
        });
      }

      return res.status(500).json({
        message: "Erro interno no servidor.",
      });
    }
  },
};
export default consultaController;

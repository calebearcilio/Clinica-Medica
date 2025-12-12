import { Router } from "express";
import consultaController from "../controllers/consultaController";
import { validateBody, validateParams } from "../middlewares/schemaValidation";
import {
  createConsultaSchema,
  updateConsultaSchema,
} from "../schemas/consultaSchema";
import { idParamSchema } from "../schemas/idParamSchema";
import { validateAuth } from "../middlewares/authValidation";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Consultas
 *   description: Gerenciamento de consultas
 */

/**
 * @swagger
 * /consultas:
 *   get:
 *     summary: Retorna todas as consultas cadastradas no banco
 *     tags: [Consultas]
 *     responses:
 *       200:
 *         description: Lista de consultas
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/consultas", validateAuth, consultaController.getAllConsultas);

/**
 * @swagger
 * /consultas/{id}:
 *   get:
 *     summary: Retorna uma consulta pelo ID
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Consulta encontrada
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/consultas/:id",
  validateAuth,
  validateParams(idParamSchema),
  consultaController.getConsultaById
);

/**
 * @swagger
 * /consultas:
 *   post:
 *     summary: Cria uma nova consulta no sistema
 *     tags: [Consultas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pacienteId
 *               - medicoId
 *               - dataHora
 *             properties:
 *               pacienteId:
 *                 type: integer
 *               medicoId:
 *                 type: integer
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *               descricao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Consulta criada com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/consultas",
  validateAuth,
  validateBody(createConsultaSchema),
  consultaController.createConsulta
);

/**
 * @swagger
 * /consultas/{id}:
 *   put:
 *     summary: Atualiza uma consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pacienteId:
 *                 type: integer
 *               medicoId:
 *                 type: integer
 *               dataHora:
 *                 type: string
 *                 format: date-time
 *               descricao:
 *                 type: string
 *     responses:
 *       204:
 *         description: Consulta atualizada com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/consultas/:id",
  validateAuth,
  validateParams(idParamSchema),
  validateBody(updateConsultaSchema),
  consultaController.updateConsulta
);

/**
 * @swagger
 * /consultas/{id}:
 *   delete:
 *     summary: Deleta uma consulta
 *     tags: [Consultas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Consulta deletada com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Consulta não encontrada
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/consultas/:id",
  validateAuth,
  validateParams(idParamSchema),
  consultaController.deleteConsulta
);

export default router;

import { Router } from "express";
import medicoController from "../controllers/medicoController";
import { validateBody, validateParams } from "../middlewares/schemaValidation";
import {
  createMedicoSchema,
  updateMedicoSchema,
} from "../schemas/medicoSchemas";
import { idParamSchema } from "../schemas/idParamSchema";
import { validateAuth } from "../middlewares/authValidation";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Médicos
 *   description: Gerenciamento de médicos
 */

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Retorna todos os médicos cadastrados no sistema
 *     tags: [Médicos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de médicos
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/medicos", validateAuth, medicoController.getAllMedicos);

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Retorna um médico pelo ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/medicos/:id",
  validateAuth,
  validateParams(idParamSchema),
  medicoController.getMedicoById
);

/**
 * @swagger
 * /medicos:
 *   post:
 *     summary: Adiciona um novo médico no sistema
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - crm
 *               - especialidade
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               crm:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Médico criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/medicos",
  validateAuth,
  validateBody(createMedicoSchema),
  medicoController.createMedico
);

/**
 * @swagger
 * /medicos/{id}:
 *   put:
 *     summary: Atualiza informações de um médico
 *     tags: [Médicos]
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               crm:
 *                 type: string
 *               especialidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Médico atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/medicos/:id",
  validateAuth,
  validateParams(idParamSchema),
  validateBody(updateMedicoSchema),
  medicoController.updateMedico
);

/**
 * @swagger
 * /medicos/{id}:
 *   delete:
 *     summary: Remove um médico do sistema
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Médico deletado com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/medicos/:id",
  validateAuth,
  validateParams(idParamSchema),
  medicoController.deleteMedico
);

export default router;

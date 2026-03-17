import { Router } from "express";
import pacienteController from "../controllers/pacienteController";
import { validateBody, validateParams } from "../middlewares/schemaValidation";
import {
  createPacienteSchema,
  updatePacienteSchema,
} from "../schemas/pacienteSchema";
import { idParamSchema } from "../schemas/idParamSchema";
import { validateAuth } from "../middlewares/authValidation";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Gerenciamento de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Retorna todos os pacientes cadastrados no sistema
 *     tags: [Pacientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.get("/pacientes", validateAuth, pacienteController.getAllPacientes);

/**
 * @swagger
 * /pacientes/{id}:
 *   get:
 *     summary: Retorna um paciente pelo ID
 *     tags: [Pacientes]
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
 *         description: Paciente encontrado
 *       400:
 *         description: ID inválido
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get(
  "/pacientes/:id",
  validateAuth,
  validateParams(idParamSchema),
  pacienteController.getPacienteById
);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Adiciona um novo paciente no sistema
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - cpf
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               cpf:
 *                 type: string
 *               telefone:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token inválido ou expirado
 *       500:
 *         description: Erro interno do servidor
 */
router.post(
  "/pacientes",
  validateAuth,
  validateBody(createPacienteSchema),
  pacienteController.createPaciente
);

/**
 * @swagger
 * /pacientes/{id}:
 *   put:
 *     summary: Atualiza informações de um paciente
 *     tags: [Pacientes]
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
 *               cpf:
 *                 type: string
 *               telefone:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put(
  "/pacientes/:id",
  validateAuth,
  validateParams(idParamSchema),
  validateBody(updatePacienteSchema),
  pacienteController.updatePaciente
);

/**
 * @swagger
 * /pacientes/{id}:
 *   delete:
 *     summary: Remove um paciente do sistema
 *     tags: [Pacientes]
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
 *         description: Paciente deletado com sucesso
 *       401:
 *         description: Token inválido ou expirado
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete(
  "/pacientes/:id",
  validateAuth,
  validateParams(idParamSchema),
  pacienteController.deletePaciente
);

export default router;

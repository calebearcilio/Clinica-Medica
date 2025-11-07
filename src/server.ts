import express from "express";
import { Express, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./swagger";
import { prisma } from "./db/prisma";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Minha API</h1> <a href='/doctors'>Todos os médicos</a> <br> <a href='/api-docs'>Documentação (Swagger)</a>");
});

/**
 * @swagger
 * tags:
 *  name: Médicos
 *  description: Gerenciamento de Médicos
 */

/**
 * @swagger
 * /doctors:
 *   get:
 *     summary: Listar todos os médicos
 *     tags: [Médicos]
 *     responses:
 *       200:
 *         description: Lista de médicos
 *       500:
 *         description: Erro interno no servidor
 */
app.get("/doctors", async (req: Request, res: Response) => {
  try {
    const data = await prisma.medico.findMany();
    const total = data.length;
    res.json({ total, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar médicos" });
  }
});

/**
 * @swagger
 * /doctor/{crm}:
 *   get:
 *     summary: Buscar médico por CRM
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: crm
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico não encontrado
 *       500:
 *         description: Erro interno no servidor
 */
app.get("/doctor/:crm", async (req: Request, res: Response) => {
  const searchCRM: string = String(req.params.crm);

  if (!searchCRM || searchCRM.trim() === "") {
    return res.status(400).json({ error: "CRM inválido" });
  }

  try {
    const medico = await prisma.medico.findUnique({
      where: { crm: searchCRM },
    });
    if (!medico) {
      return res.status(404).json({ message: "Médico não encontrado" });
    }
    res.json(medico);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao buscar médico" });
  }
});

/**
 * @swagger
 * /doctors:
 *   post:
 *     summary: Criar um novo médico
 *     tags: [Médicos]
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
 *     responses:
 *       201:
 *         description: Médico criado
 *       400:
 *         description: Erro na requisição
 *       409:
 *         description: Médico já existente
 *       500:
 *         description: Erro interno no servidor
 */
app.post("/doctors", async (req: Request, res: Response) => {
  const { nome, email, crm, especialidade } = req.body;

  if (!crm || typeof crm !== "string") {
    return res
      .status(400)
      .json({ message: "O CRM é obrigatório e deve ser uma string." });
  }
  if (!nome || typeof nome !== "string" || nome.trim() === "") {
    return res.status(400).json({ message: "O nome é obrigatório." });
  }
  if (
    !especialidade ||
    typeof especialidade !== "string" ||
    especialidade.trim() === ""
  ) {
    return res.status(400).json({ message: "A especialidade é obrigatória." });
  }
  if (!email || typeof email !== "string") {
    return res.status(400).json({ message: "O email é obrigatório." });
  }

  try {
    const existing = await prisma.medico.findUnique({ where: { crm } });
    if (existing) {
      return res
        .status(409)
        .json({ message: "Já existe um médico com esse CRM." });
    }

    const created = await prisma.medico.create({
      data: { nome, email, crm, especialidade },
    });
    res.status(201).json({ message: "Médico criado", medico: created });
  } catch (error: any) {
    console.error(error);
    // tratar erros de constraint (e.g., email único)
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Campo único em conflito" });
    }
    res.status(500).json({ message: "Erro ao criar médico" });
  }
});

/**
 * @swagger
 * /doctors/{crm}:
 *   put:
 *     summary: Atualizar médico por CRM
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: crm
 *         required: true
 *         schema:
 *           type: string
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
 *               especialidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Médico atualizado
 *       400:
 *         description: CRM inválido
 *       404:
 *         description: Médico não encontrado
 *       409:
 *         description: Conflito em algum campo
 *       500:
 *         description: Erro interno no servidor
 */
app.put("/doctors/:crm", async (req: Request, res: Response) => {
  const { crm } = req.params;
  const { nome, email, especialidade } = req.body;

  if (!crm || typeof crm !== "string") {
    return res.status(400).json({ message: "CRM inválido." });
  }

  try {
    const medico = await prisma.medico.findUnique({ where: { crm } });
    if (!medico)
      return res.status(404).json({ message: "Médico não encontrado." });

    const updated = await prisma.medico.update({
      where: { crm },
      data: {
        nome: nome ?? medico.nome,
        email: email ?? medico.email,
        especialidade: especialidade ?? medico.especialidade,
      },
    });

    res.json({ message: "Médico atualizado", medico: updated });
  } catch (error: any) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Campo único em conflito" });
    }
    res.status(500).json({ message: "Erro ao atualizar médico" });
  }
});

/**
 * @swagger
 * /doctors/{crm}:
 *   delete:
 *     summary: Remover médico por CRM
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: crm
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Médico removido
 *       404:
 *         description: Médico não encontrato
 *       500:
 *         description: Erro interno no 
 */
app.delete("/doctors/:crm", async (req: Request, res: Response) => {
  const { crm } = req.params;

  if (!crm || typeof crm !== "string") {
    return res.status(400).json({ message: "CRM inválido." });
  }

  try {
    await prisma.medico.delete({ where: { crm } });
    return res.status(204).send();
  } catch (error: any) {
    console.error(error);
    // Se não existir, Prisma lança P2025
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Médico não encontrado." });
    }
    res.status(500).json({ message: "Erro ao remover médico" });
  }
});

//INICIAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
  console.log(`Documentação: http://localhost:${PORT}/api-docs`);
});

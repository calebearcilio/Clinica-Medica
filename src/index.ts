import express from "express";
import { Express, Request, Response } from "express";

const app: Express = express();
const PORT: number = 3000;

app.use(express.json());

type Doctor = {
  crm: number;
  name: string;
  specialty: string;
};

const doctors: Doctor[] = [
  { crm: 298432, name: "Heitor", specialty: "Neurocirurgião" },
  { crm: 498753, name: "Calebe", specialty: "Cardiologista" },
  { crm: 765345, name: "Camily", specialty: "Enfermeira" },
];

//ENDPOINTS
app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Minha API</h1> <a href='/doctors'>Todos os médicos</a>");
});

//ENDPOINTS GET USERS
app.get("/doctors", (req: Request, res: Response) => {
  res.json({
    total: doctors.length,

    data: doctors,
  });
});

//ENDPOINT GET USER
app.get("/doctor/:crm", (req: Request, res: Response) => {
  const searchCRM: number = Number(req.params.crm);

  //Verificação do CRM da url
  if (isNaN(searchCRM) || searchCRM <= 0) {
    return res.status(400).json({
      error: "CRM Inválido",

      message: "O CRM tem que ser um número positivo",
    });
  }

  //Procurando o médico na lista
  const findUser = doctors.find((doctor) => doctor.crm === searchCRM);

  if (!findUser) {
    return res.status(404).json({
      message: "Médico não encontrado",
    });
  }

  res.json(findUser);
});

//ENDPOINT POST
app.post("/doctors", (req: Request, res: Response) => {
  const newDoctor: Doctor = req.body;

  //Verificação do CRM
  if (!newDoctor.crm || newDoctor.crm <= 0 || isNaN(newDoctor.crm)) {
    return res.status(400).json({
      message: "O CRM é obrigatório e tem que ser um número inteiro positivo.",
    });
  }

  //Validação do campo nome
  if (
    !newDoctor.name ||
    typeof newDoctor.name !== "string" ||
    newDoctor.name.trim() === ""
  ) {
    return res.status(400).json({
      message: "O nome é obrigatório e não pode estar vazio.",
    });
  }

  //Validação da especialização
  if (
    !newDoctor.specialty ||
    typeof newDoctor.specialty !== "string" ||
    newDoctor.specialty.trim() === ""
  ) {
    return res.status(400).json({
      message: "A especialização é obrigatória e não pode estar vazia.",
    });
  }

  //Verificação de médico existente
  const existingDoctor: Doctor | undefined = doctors.find(
    (doctor) => doctor.crm === newDoctor.crm
  );

  if (existingDoctor) {
    return res.status(409).json({
      message: "Já existe um Médico com esse CRM cadastrado.",
    });
  }

  doctors.push(newDoctor);

  res.status(201).json({
    message: "Médico adicionado com sucesso",

    doctor: newDoctor,
  });
});

//ENDPOINT PUT
app.put("/doctors/:crm", (req: Request, res: Response) => {
  const searchCRM: number = parseInt(req.params.crm, 10);

  //Validação do CRM
  if (isNaN(searchCRM) || searchCRM <= 0) {
    return res.status(400).json({
      error: "ID inválido",

      message: "O ID tem que ser um número inteiro positivo.",
    });
  }

  //Verifica se médico existe
  const doctorIndex: number = doctors.findIndex(
    (doctor) => doctor.crm === searchCRM
  );

  if (doctorIndex === -1) {
    return res.status(404).json({
      message: "Usuário não encontrado.",
    });
  }

  //Verificação do CRM
  const updatedDoctor: Doctor = req.body;

  if (updatedDoctor.crm !== searchCRM) {
    res.status(400).json({
      message: "O CRM não pode ser alterado.",
    });
  }

  //Validação do campo nome
  if (
    !updatedDoctor.name ||
    typeof updatedDoctor.name !== "string" ||
    updatedDoctor.name.trim() === ""
  ) {
    return res.status(400).json({
      message: "O nome não pode estar vazio.",
    });
  }

  //Validação da especialização
  if (
    !updatedDoctor.specialty ||
    typeof updatedDoctor.specialty !== "string" ||
    updatedDoctor.specialty.trim() === ""
  ) {
    return res.status(400).json({
      message: "A especialização é obrigatória e não pode estar vazia.",
    });
  }

  doctors[doctorIndex] = updatedDoctor;

  res.json({
    message: "Dados do médico atualizados com sucesso",

    user: doctors[doctorIndex],
  });
});

//ENDPOINT DELETE
app.delete("/doctors/:crm", (req: Request, res: Response) => {
  const searchCRM: number = parseInt(req.params.crm, 10);

  //Validação do CRM
  if (isNaN(searchCRM) || searchCRM <= 0) {
    return res.status(400).json({
      error: "CRM inválido",

      message: "O CRM tem que ser um número inteiro positivo.",
    });
  }

  //Verificação de médico existente
  const doctorIndex: number = doctors.findIndex(
    (doctor) => doctor.crm === searchCRM
  );

  if (doctorIndex === -1) {
    return res.status(404).json({
      message: "Usuário não encontrado",
    });
  }

  doctors.splice(doctorIndex, 1);

  return res.status(204).send();
});

//INICIAR O SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

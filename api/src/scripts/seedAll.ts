import { Medico, Paciente } from "@prisma/client";
import { prisma } from "../db/prisma";
import medicoService from "../services/medicoService";
import pacienteService from "../services/pacienteService";
import secretarioService from "../services/secretarioService";
import consultaService from "../services/consultaService";
import { CreateConsultaData } from "../schemas/consultaSchema";
import { CreateSecretarioData } from "../schemas/secretarioSchemas";
import { CreatePacientedata } from "../schemas/pacienteSchema";
import { CreateMedicoData } from "../schemas/medicoSchemas";

const medicos: CreateMedicoData[] = [
  {
    nome: "Dr. João Silva",
    email: "joao.silva@curaeclinic.com",
    crm: "SP-0001",
    especialidade: "Cardiologia",
    telefone: "5511991110001",
  },
  {
    nome: "Dra. Maria Oliveira",
    email: "maria.oliveira@curaeclinic.com",
    crm: "RJ-0002",
    especialidade: "Pediatria",
    telefone: "5511991110002",
  },
  {
    nome: "Dr. Carlos Pereira",
    email: "carlos.pereira@curaeclinic.com",
    crm: "MG-0003",
    especialidade: "Ortopedia",
    telefone: "5511991110003",
  },
  {
    nome: "Dra. Ana Souza",
    email: "ana.souza@curaeclinic.com",
    crm: "BA-0004",
    especialidade: "Dermatologia",
    telefone: "5511991110004",
  },
  {
    nome: "Dr. Felipe Costa",
    email: "felipe.costa@curaeclinic.com",
    crm: "PR-0005",
    especialidade: "Ginecologia",
    telefone: "5511991110005",
  },
];

const pacientes: CreatePacientedata[] = [
  {
    nome: "Pedro Alves",
    email: "pedro.alves@gmail.com",
    cpf: "12345678901",
    telefone: "5511988880001",
    dataNascimento: new Date("1985-03-12").toISOString(),
  },
  {
    nome: "Mariana Lima",
    email: "mariana.lima@gmail.com",
    cpf: "23456789012",
    telefone: "5511988880002",
    dataNascimento: new Date("1990-07-01").toISOString(),
  },
  {
    nome: "Rafael Gomes",
    email: "rafael.gomes@gmail.com",
    cpf: "34567890123",
    telefone: "5511988880003",
    dataNascimento: new Date("1978-11-20").toISOString(),
  },
  {
    nome: "Beatriz Rocha",
    email: "beatriz.rocha@gmail.com",
    cpf: "45678901234",
    telefone: "5511988880004",
    dataNascimento: new Date("1995-02-14").toISOString(),
  },
  {
    nome: "Lucas Mendes",
    email: "lucas.mendes@gmail.com",
    cpf: "56789012345",
    telefone: "5511988880005",
    dataNascimento: new Date("1982-09-05").toISOString(),
  },
  {
    nome: "Carla Martins",
    email: "carla.martins@gmail.com",
    cpf: "67890123456",
    telefone: "5511988880006",
    dataNascimento: new Date("2000-12-30").toISOString(),
  },
  {
    nome: "Thiago Fernandes",
    email: "thiago.fernandes@gmail.com",
    cpf: "78901234567",
    telefone: "5511988880007",
    dataNascimento: new Date("1970-06-17").toISOString(),
  },
  {
    nome: "Juliana Carvalho",
    email: "juliana.carvalho@gmail.com",
    cpf: "89012345678",
    telefone: "5511988880008",
    dataNascimento: new Date("1988-10-09").toISOString(),
  },
  {
    nome: "Gabriel Ribeiro",
    email: "gabriel.ribeiro@gmail.com",
    cpf: "90123456789",
    telefone: "5511988880009",
    dataNascimento: new Date("1992-04-22").toISOString(),
  },
  {
    nome: "Natália Santos",
    email: "natalia.santos@gmail.com",
    cpf: "01234567890",
    telefone: "5511988880010",
    dataNascimento: new Date("1998-08-03").toISOString(),
  },
];

const secretarios: CreateSecretarioData[] = [
  {
    nome: "Paulo Henrique",
    email: "paulo.henrique@curaeclinic.com",
    senha: "senha12345",
    telefone: "5511977770001",
  },
  {
    nome: "Fernanda Silva",
    email: "fernanda.silva@curaeclinic.com",
    senha: "senha12345",
    telefone: "5511977770002",
  },
  {
    nome: "Marcelo Teixeira",
    email: "marcelo.teixeira@curaeclinic.com",
    senha: "senha12345",
    telefone: "5511977770003",
  },
];

const seedAll = async () => {
  console.log("Iniciando seed...\n");
  let medicoCount = 0;
  let pacienteCount = 0;
  let secretarioCount = 0;

  try {
    //========================= MEDICOS =========================//
    console.log(" 👨‍⚕️ Adicionando médicos");
    for (const medico of medicos) {
      try {
        await medicoService.create(medico);
        medicoCount++;
        console.log(` ✅ ${medico.nome} adicionado`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(` ⚠️ ${medico.nome} já está cadastrado`);
        }
        console.log(` ❌ Erro ao adicionar ${medico.nome}:\n${error}`);
      }
    }
    console.log(`Total de medicos adicionados: ${medicoCount}\n`);

    //========================= Pacientes =========================//
    console.log(" 🤒 Adicionando pacientes");
    for (const paciente of pacientes) {
      try {
        await pacienteService.create(paciente);
        pacienteCount++;
        console.log(` ✅ ${paciente.nome} adicionado`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(` ⚠️ ${paciente.nome} já está cadastrado`);
        }
        console.log(` ❌ Erro ao adicionar ${paciente.nome}:\n${error}`);
      }
    }
    console.log(`Total de pacientes adicionados: ${pacienteCount}\n`);

    //========================= Secretários =========================//
    console.log(" 👨‍💼 Adicionando secretários");
    for (const secretario of secretarios) {
      try {
        await secretarioService.create(secretario);
        secretarioCount++;
        console.log(` ✅ ${secretario.nome} adicionado`);
      } catch (error: any) {
        if (error.code === "P2002") {
          console.log(` ⚠️ ${secretario.nome} já está cadastrado`);
        }
        console.log(` ❌ Erro ao adicionar ${secretario.nome}:\n${error}`);
      }
    }
    console.log(`Total de secretários adicionados: ${secretarioCount}\n`);

    //========================= Consultas =========================//
    console.log(" 📅 Criando consultas");

    const medicosDB = await prisma.medico.findMany();
    const pacientesDB = await prisma.paciente.findMany();

    if (medicosDB.length === 0 || pacientesDB.length === 0) {
      console.log(" ⚠️ Sem médicos ou pacientes no banco. Pulando consultas");
    } else {
      await seedConsultas(medicosDB, pacientesDB);
    }

    console.log("\nSeed finalizado!");
  } catch (error: any) {
    console.log(" ❌ Erro no seed: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const seedConsultas = async (
  medicos: Array<Medico>,
  pacientes: Array<Paciente>,
): Promise<void> => {
  let consultaCount = 0;
  const motivos = [
    "Dor de barriga.",
    "Dor de cabeça.",
    "Febre alta, dor de cabeça.",
    "Inchaço nos olhos, falta de ar, rouquidão e garganta ruim.",
    "Perda de apetite, dor de cabeça, náuseas, diarreia passageira.",
    "Falta de ar e cansaço que pioram com o esforço.",
    "Febre, calafrios, dor de cabeça e confusão mental.",
    "Inchaço nos olhos, falta de ar, rouquidão e garganta ruim.",
    "Resfriado, febre.",
    "Dor de garganta.",
  ];

  for (let i = 0; i < motivos.length || i < pacientes.length; i++) {
    const consultaData = new Date();
    consultaData.setDate(consultaData.getDate() + (i + 1));
    consultaData.setHours(9 + (i % 8), 0, 0, 0);

    const motivo = motivos[i % motivos.length];
    const paciente = pacientes[i % pacientes.length];
    const medico = medicos[i % medicos.length];

    const consulta: CreateConsultaData = {
      dataHora: consultaData,
      descricao: motivo,
      pacienteId: paciente.id,
      medicoId: medico.id,
    };

    try {
      await consultaService.create(consulta);
      consultaCount++;
      console.log(
        ` ✅ Paciente: ${paciente.nome} - Médico: ${medico.nome} - Descrição: ${motivo}`,
      );
    } catch (error: any) {
      if (error.code === "P2002") {
        console.log(` ⚠️ Consulta já existe`);
      }
      console.log(` ❌ Erro ao criar consulta:\n${error}`);
    }
  }
  console.log(`Total de consultas criadas: ${consultaCount}`);
};

(async () => {
  await seedAll();
})().catch((error) => {
  console.log(` ❌ Error no seed: ${error}`);
  process.exit(1);
});

import { Consulta, Medico, Paciente } from "@prisma/client";
import { prisma } from "../db/prisma";
import medicoService from "../services/medicoService";
import pacienteService from "../services/pacienteService";
import secretarioService from "../services/secretarioService";
import consultaService from "../services/consultaService";

const medicos = [
  {
    nome: "Dr. João Silva",
    email: "joao.silva@clinicamedica.com",
    crm: "CRMj-001",
    especialidade: "Cardiologia",
    telefone: "+55 (11) 99111-0001",
  },
  {
    nome: "Dra. Maria Oliveira",
    email: "maria.oliveira@clinicamedica.com",
    crm: "CRMj-002",
    especialidade: "Pediatria",
    telefone: "+55 (11) 99111-0002",
  },
  {
    nome: "Dr. Carlos Pereira",
    email: "carlos.pereira@clinicamedica.com",
    crm: "CRMj-003",
    especialidade: "Ortopedia",
    telefone: "+55 (11) 99111-0003",
  },
  {
    nome: "Dra. Ana Souza",
    email: "ana.souza@clinicamedica.com",
    crm: "CRMj-004",
    especialidade: "Dermatologia",
    telefone: "+55 (11) 99111-0004",
  },
  {
    nome: "Dr. Felipe Costa",
    email: "felipe.costa@clinicamedica.com",
    crm: "CRMj-005",
    especialidade: "Ginecologia",
    telefone: "+55 (11) 99111-0005",
  },
];

const pacientes = [
  {
    nome: "Pedro Alves",
    email: "pedro.alves@gmail.com",
    cpf: "123.456.789-01",
    telefone: "+55 (11) 98888-0001",
    dataNascimento: new Date("1985-03-12"),
  },
  {
    nome: "Mariana Lima",
    email: "mariana.lima@gmail.com",
    cpf: "234.567.890-12",
    telefone: "+55 (11) 98888-0002",
    dataNascimento: new Date("1990-07-01"),
  },
  {
    nome: "Rafael Gomes",
    email: "rafael.gomes@gmail.com",
    cpf: "345.678.901-23",
    telefone: "+55 (11) 98888-0003",
    dataNascimento: new Date("1978-11-20"),
  },
  {
    nome: "Beatriz Rocha",
    email: "beatriz.rocha@gmail.com",
    cpf: "456.789.012-34",
    telefone: "+55 (11) 98888-0004",
    dataNascimento: new Date("1995-02-14"),
  },
  {
    nome: "Lucas Mendes",
    email: "lucas.mendes@gmail.com",
    cpf: "567.890.123-45",
    telefone: "+55 (11) 98888-0005",
    dataNascimento: new Date("1982-09-05"),
  },
  {
    nome: "Carla Martins",
    email: "carla.martins@gmail.com",
    cpf: "678.901.234-56",
    telefone: "+55 (11) 98888-0006",
    dataNascimento: new Date("2000-12-30"),
  },
  {
    nome: "Thiago Fernandes",
    email: "thiago.fernandes@gmail.com",
    cpf: "789.012.345-67",
    telefone: "+55 (11) 98888-0007",
    dataNascimento: new Date("1970-06-17"),
  },
  {
    nome: "Juliana Carvalho",
    email: "juliana.carvalho@gmail.com",
    cpf: "890.123.456-78",
    telefone: "+55 (11) 98888-0008",
    dataNascimento: new Date("1988-10-09"),
  },
  {
    nome: "Gabriel Ribeiro",
    email: "gabriel.ribeiro@gmail.com",
    cpf: "901.234.567-89",
    telefone: "+55 (11) 98888-0009",
    dataNascimento: new Date("1992-04-22"),
  },
  {
    nome: "Natália Santos",
    email: "natalia.santos@gmail.com",
    cpf: "012.345.678-90",
    telefone: "+55 (11) 98888-0010",
    dataNascimento: new Date("1998-08-03"),
  },
];

const secretarios = [
  {
    nome: "Paulo Henrique",
    email: "paulo.henrique@clinicamedica.com",
    senha: "senha12345",
    telefone: "+55 (11) 97777-0001",
  },
  {
    nome: "Fernanda Silva",
    email: "fernanda.silva@clinicamedica.com",
    senha: "senha12345",
    telefone: "+55 (11) 97777-0002",
  },
  {
    nome: "Marcelo Teixeira",
    email: "marcelo.teixeira@clinicamedica.com",
    senha: "senha12345",
    telefone: "+55 (11) 97777-0003",
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
  pacientes: Array<Paciente>
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

    const consulta: Omit<Consulta, "id" | "createdAt" | "updatedAt"> = {
      dataHora: consultaData,
      descricao: motivo,
      pacienteId: paciente.id,
      medicoId: medico.id,
    };

    try {
      await consultaService.create(consulta);
      consultaCount++;
      console.log(
        ` ✅ Paciente: ${paciente.nome} - Médico: ${medico.nome} - Descrição: ${motivo}`
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

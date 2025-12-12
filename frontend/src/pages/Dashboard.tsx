import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import type { Paciente } from "../types/paciente";
import type { Medico } from "../types/medico";
import type { Consulta } from "../types/consulta";
import pacienteService from "../services/pacienteService";
import medicoService from "../services/medicoService";
import consultaService from "../services/consultaService";
import {
  amountItens,
  sortConsultasByData,
  sortPacientesByCreateData,
} from "../utils/dashboardUtils";
import DashboardSkeleton from "../components/dashboard/DeshboardSkeleton";
import type { Secretario } from "../types/secretario";
import secretarioService from "../services/secretarioService";
import StaticMessage from "../components/StaticMessage";

const Dashboard: React.FC = () => {
  // Dados do banco
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [secretarios, setSecretarios] = useState<Secretario[]>([]);

  // Carregamento dos dados
  const [loading, setLoading] = useState<boolean>(true);
  const [msgError, setMsgError] = useState<string | null>(null);

  // Paginador de consultas e pacientes
  const [showAllConsultas, setShowAllConsultas] = useState<boolean>(false);
  const [showAllPacientes, setShowAllPacientes] = useState<boolean>(false);
  const [pageConsultas, setPageConsultas] = useState<number>(0);
  const limitConsultas = 5;
  const [pagePacientes, setPagePacientes] = useState<number>(0);
  const limitPacientes = 5;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!msgError) return;

    const intervalId = setInterval(() => {
      loadData();
    }, 120000);

    return () => clearInterval(intervalId);
  }, [msgError]);

  // Função de carregamento dos dados do servidor
  const loadData = async (): Promise<void> => {
    if (secretarios.length === 0) setLoading(true);

    try {
      const [pacientesDB, medicosDB, consultasDB, secretariosDB] =
        await Promise.all([
          pacienteService.get(),
          medicoService.get(),
          consultaService.get(),
          secretarioService.get(),
        ]);
      setPacientes(pacientesDB);
      setMedicos(medicosDB);
      setConsultas(consultasDB);
      setSecretarios(secretariosDB);
      setMsgError(null);
    } catch (error: any) {
      setMsgError("Falha ao carregar dados do sistema");
    } finally {
      setLoading(false);
    }
  };

  // Status de quantidades
  const statusAmount = [
    { label: "Pacientes", value: amountItens(pacientes) },
    { label: "Médicos", value: amountItens(medicos) },
    { label: "Consultas", value: amountItens(consultas) },
    { label: "Secretários", value: amountItens(secretarios) },
  ];

  // Ordenação de entidades
  const consultasSort = sortConsultasByData(consultas);
  const recentPatientes = sortPacientesByCreateData(pacientes);

  // Paginação de consultas
  const consultasPaginadas = consultas.slice(
    pageConsultas * limitConsultas,
    pageConsultas * limitConsultas + limitConsultas
  );
  // Paginação de pacientes
  const pacientesPaginados = recentPatientes.slice(
    pagePacientes * limitPacientes,
    pagePacientes * limitPacientes + limitPacientes
  );

  // Carregando dados do servidor
  if (loading) {
    return <DashboardSkeleton />;
  }

  // Erro ao carregar dados do servidor
  if (!!msgError) {
    return (
      <StaticMessage
        alertMessage={msgError}
        message="Não conseguimos carregar os dados. Isso pode ser temporário."
        functionReload={loadData}
        severity="error"
        buttonColor="error"
      />
    );
  }

  // Conteúdo principal
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Conteúdo principal */}
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Dashboard
          </Typography>

          {/* Cards de estatísticas */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 2,
              mb: 2,
            }}
          >
            {statusAmount.map((sa) => (
              <Card key={sa.label} elevation={2}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {sa.label}
                  </Typography>
                  <Typography variant="h6">{sa.value}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "400px 1fr" },
              gap: 2,
            }}
          >
            {/* Próximas consultas */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Próximas Consultas
              </Typography>
              <List>
                {(showAllConsultas ? consultas : consultasPaginadas).map(
                  (consulta, index) => (
                    <React.Fragment key={consulta.id}>
                      <ListItem>
                        <Avatar sx={{ mr: 2 }}>
                          {Number(consulta.dataHora.slice(8, 10))}
                        </Avatar>
                        <ListItemText
                          primary={`${consulta.dataHora.slice(11, 16)} — ${
                            consulta.paciente.nome
                          }`}
                          secondary={consulta.medico.nome}
                        />
                        <Chip label="Agendada" size="small" />
                      </ListItem>
                      {index < consultasSort.length && <Divider />}
                    </React.Fragment>
                  )
                )}

                {!showAllConsultas && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      mt: 2,
                      justifyContent: "space-around",
                    }}
                  >
                    <Button
                      variant="outlined"
                      disabled={pageConsultas === 0}
                      onClick={() => setPageConsultas(pageConsultas - 1)}
                    >
                      {"< voltar"}
                    </Button>
                    <Button
                      variant="outlined"
                      disabled={
                        (pageConsultas + 1) * limitConsultas >= consultas.length
                      }
                      onClick={() => setPageConsultas(pageConsultas + 1)}
                    >
                      {"Avançar >"}
                    </Button>
                  </Box>
                )}
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => setShowAllConsultas(!showAllConsultas)}
                >
                  {showAllConsultas ? "Mostrar menos" : "Mostrar mais"}
                </Button>
              </List>
            </Paper>

            {/* Pacientes recentes */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Pacientes Recentes
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>CPF</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Telefone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(showAllPacientes
                    ? recentPatientes
                    : pacientesPaginados
                  ).map((paciente) => (
                    <TableRow key={paciente.id} hover>
                      <TableCell>{paciente.cpf}</TableCell>
                      <TableCell>{paciente.nome}</TableCell>
                      <TableCell>{paciente.telefone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!showAllPacientes && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    mt: 2,
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="outlined"
                    disabled={pagePacientes === 0}
                    onClick={() => setPagePacientes(pagePacientes - 1)}
                  >
                    {"< voltar"}
                  </Button>
                  <Button
                    variant="outlined"
                    disabled={
                      (pagePacientes + 1) * limitConsultas >= consultas.length
                    }
                    onClick={() => setPagePacientes(pagePacientes + 1)}
                  >
                    {"Avançar >"}
                  </Button>
                </Box>
              )}
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => setShowAllPacientes(!showAllPacientes)}
              >
                {showAllPacientes ? "Mostrar menos" : "Mostrar mais"}
              </Button>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

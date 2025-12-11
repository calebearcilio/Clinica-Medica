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
} from "@mui/material";
import type { Paciente } from "../types/paciente";
import type { Medico } from "../types/medico";
import type { Consulta } from "../types/consulta";
import pacienteService from "../services/pacienteService";
import medicoService from "../services/medicoService";
import consultaService from "../services/consultaService";
import {
  amountConsultas,
  amountMedicos,
  amountPacientes,
  amountSecretarios,
  sortConsultasByData,
  sortPacientesByCreateData,
} from "../utils/dashboardUtils";
import DashboardSkeleton from "../components/dashboard/DeshboardSkeleton";
import type { Secretario } from "../types/secretario";
import secretarioService from "../services/secretarioService";

const Dashboard: React.FC = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [secretario, setSecretarios] = useState<Secretario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (): Promise<void> => {
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
      console.log(consultasDB);
    } catch (error: any) {
      console.log("Erro ao carregar informações do servidor.");
    } finally {
      setLoading(false);
    }
  };

  const statusAmount = [
    { label: "Pacientes", value: amountPacientes(pacientes) },
    { label: "Médicos", value: amountMedicos(medicos) },
    { label: "Consultas", value: amountConsultas(consultas) },
    { label: "Secretários", value: amountSecretarios(secretario) },
  ];

  const consultasSort = sortConsultasByData(consultas);
  const recentPatientes = sortPacientesByCreateData(pacientes);

  if (loading) {
    return <DashboardSkeleton />;
  }

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
              gridTemplateColumns: { xs: "1fr", md: "380px 1fr" },
              gap: 2,
            }}
          >
            {/* Próximas consultas */}
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Próximas Consultas
              </Typography>
              <List>
                {consultasSort.map((consulta) => (
                  <React.Fragment key={consulta.id}>
                    <ListItem>
                      <Avatar sx={{ mr: 2 }}>{Number(consulta.dataHora.slice(8,10))}</Avatar>
                      <ListItemText
                        primary={`${consulta.dataHora.slice(11,16)} — ${consulta.paciente.nome}`}
                        secondary={consulta.medico.nome}
                      />
                      <Chip label="Agendada" size="small" />
                    </ListItem>
                    {consulta.id < consultasSort.length && <Divider />}
                  </React.Fragment>
                ))}
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
                  {recentPatientes.map((paciente) => (
                    <TableRow key={paciente.id} hover>
                      <TableCell>{paciente.cpf}</TableCell>
                      <TableCell>{paciente.nome}</TableCell>
                      <TableCell>{paciente.telefone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

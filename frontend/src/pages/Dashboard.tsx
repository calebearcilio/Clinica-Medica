import React from "react";
import Menu from "../components/Menu";
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

const sampleStats = [
  { label: "Pacientes", value: 124 },
  { label: "Médicos", value: 18 },
  { label: "Consultas", value: 47 },
  { label: "Secretários", value: 5 },
];

const upcoming = [
  { time: "09:00", patient: "João Silva", doctor: "Dra. Maria" },
  { time: "10:30", patient: "Ana Costa", doctor: "Dr. Pedro" },
  { time: "11:00", patient: "Carlos Souza", doctor: "Dra. Paula" },
];

const recentPatients = [
  { id: "P-001", name: "João Silva", phone: "(11) 99999-0000" },
  { id: "P-002", name: "Ana Costa", phone: "(11) 98888-1111" },
  { id: "P-003", name: "Carlos Souza", phone: "(11) 97777-2222" },
];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Menu lateral */}
        <Box component="aside" sx={{ width: 220, p: 2 }}>
          <Menu />
        </Box>

        {/* Conteúdo principal */}
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Painel de Controle
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
            {sampleStats.map((s) => (
              <Card key={s.label} elevation={2}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {s.label}
                  </Typography>
                  <Typography variant="h6">{s.value}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "340px 1fr" },
              gap: 2,
            }}
          >
            {/* Próximas consultas */}
            <Paper elevation={1} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Próximas Consultas
                </Typography>
                <List>
                  {upcoming.map((u, i) => (
                    <React.Fragment key={i}>
                      <ListItem>
                        <Avatar sx={{ mr: 2 }}>{u.time.split(":")[0]}</Avatar>
                        <ListItemText
                          primary={`${u.time} — ${u.patient}`}
                          secondary={u.doctor}
                        />
                        <Chip label="Agendada" size="small" />
                      </ListItem>
                      {i < upcoming.length - 1 && <Divider />}
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
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Telefone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentPatients.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>{p.id}</TableCell>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.phone}</TableCell>
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

import { useEffect, useState } from "react";
import { Button, Box, Typography, Paper, Stack } from "@mui/material";
import type { Consulta } from "../types/consulta";
import consultaService from "../services/consultaService";
import DefaultTable, { type Column } from "../components/DefaultTable";

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedConsulta, setSelectedConsulta] = useState<Consulta | null>(
    null,
  );

  const columnsTable: Column<Consulta>[] = [
    {
      id: "dataHora",
      label: "Data",
      format: (_, row) => <Typography >{row.dataHora.slice(0, 10)}</Typography>,
    },
    { id: "descricao", label: "Descrição" },
    { id: "medico", label: "Médico", format: (_, row) => row.medico.nome },
    {
      id: "paciente",
      label: "Paciente",
      format: (_, row) => row.paciente.nome,
    },
    // { id: "status", label: "Status" },
  ];

  async function loadConsultas() {
    setLoading(true);
    const data = await consultaService.get();
    setConsultas(data);
    setLoading(false);
  }

  useEffect(() => {
    loadConsultas();
  }, []);

  function handleCreate() {
    setSelectedConsulta(null);
    setOpenModal(true);
  }

  function handleEdit(consulta: Consulta) {
    setSelectedConsulta(consulta);
    setOpenModal(true);
  }

  async function handleDelete(id: number) {
    await consultaService.delete(id);
    loadConsultas();
  }

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Consultas</Typography>
        <Button variant="contained" color="primary">
          Nova consulta
        </Button>
      </Stack>

      <Paper elevation={2}>
        <DefaultTable
          getRowId={(m) => m.id}
          rows={consultas}
          columns={columnsTable}
        />
      </Paper>
      {/* 
      <ConsultaFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        consulta={selectedConsulta}
        onSuccess={loadConsultas}
      /> */}
    </Box>
  );
}

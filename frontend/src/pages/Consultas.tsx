import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Consulta, CreateConsultaData } from "../types/consulta";
import consultaService from "../services/consultaService";
import DefaultTable, { type Column } from "../components/DefaultTable";
import ConsultaFormModal from "../components/formsModal/ConsultaFormModal";

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [consultaToEdit, setConsultaToEdit] = useState<Consulta | null>(null);
  const [consultaToDelete, setConsultaToDelete] = useState<Consulta | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);

  const columnsTable: Column<Consulta>[] = [
    {
      id: "dataHora",
      label: "Data",
      format: (_, row) => <Typography>{row.dataHora.slice(0, 10)}</Typography>,
    },
    { id: "descricao", label: "Descrição" },
    { id: "medico", label: "Médico", format: (_, row) => row.medico.nome },
    {
      id: "paciente",
      label: "Paciente",
      format: (_, row) => row.paciente.nome,
    },
    // { id: "status", label: "Status" },
    {
      id: "id",
      label: "Ações",
      align: "right",
      format: (_, row) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => {
              setConsultaToEdit(row);
              setOpenModal(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setConsultaToDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  async function loadConsultas() {
    setLoading(true);
    try {
      const consultasDB = await consultaService.get();
      setConsultas(consultasDB);
    } catch (error: any) {
      // tratamento de erros
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!consultaToDelete) return;

    try {
      await consultaService.delete(consultaToDelete.id);
      setConsultaToDelete(null);
    } catch (error: any) {
      // tratamento de erros
    } finally {
      loadConsultas();
    }
  }

  async function handleSubmit(dataForm: CreateConsultaData) {
    try {
      if (consultaToEdit) {
        await consultaService.update(consultaToEdit.id, dataForm);
      } else {
        await consultaService.create(dataForm);
      }
    } catch (error: any) {
      // tratamento de erros
    } finally {
      loadConsultas();
    }
  }

  useEffect(() => {
    loadConsultas();
  }, []);

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Consultas</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setConsultaToEdit(null);
            setOpenModal(true);
          }}
        >
          Nova consulta
        </Button>
      </Stack>

      <Paper elevation={2}>
        <DefaultTable
          getRowId={(m) => m.id}
          rows={consultas}
          columns={columnsTable}
          isLoading={loading}
        />
      </Paper>

      {/* Confirmação de exclusão */}
      <Dialog
        open={!!consultaToDelete}
        onClose={() => setConsultaToDelete(null)}
      >
        <DialogTitle>Excluir paciente</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir a consulta de{" "}
          <strong>{consultaToDelete?.paciente.nome}</strong> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConsultaToDelete(null)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <ConsultaFormModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleSubmit}
        consulta={consultaToEdit}
      />
    </Box>
  );
}

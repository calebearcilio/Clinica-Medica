import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import type { Paciente } from "../types/paciente";
import pacienteService from "../services/pacienteService";
import PacienteFormModal from "../components/formsModal/PacienteFormModal";
import DefaultTable, { type Column } from "../components/DefaultTable";
import { sortPacientesByCreateData } from "../utils/dashboardUtils";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteToDelete, setPacienteToDelete] = useState<Paciente | null>(
    null,
  );
  const [pacienteEdit, setPacienteEdit] = useState<Paciente | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const recentPatientes = sortPacientesByCreateData(pacientes);
  
  const columnsTable: Column<Paciente>[] = [
    { id: "nome", label: "Nome" },
    { id: "cpf", label: "CPF" },
    { id: "telefone", label: "Telefone" },
    { id: "email", label: "Email" },
    {
      id: "id",
      label: "Ações",
      align: "right",
      format: (_, row) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => {
              setPacienteEdit(row);
              setOpenForm(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setPacienteToDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const loadPacientes = async () => {
    setLoading(true);
    try {
      const pacientesDB = await pacienteService.get();
      setPacientes(pacientesDB);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!pacienteToDelete) return;

    await pacienteService.delete(pacienteToDelete.id);
    setPacienteToDelete(null);
    loadPacientes();
  };

  const handleSubmit = async (dataForm: any) => {
    if (pacienteEdit) {
      await pacienteService.update(pacienteEdit.id, dataForm);
    } else {
      await pacienteService.create(dataForm);
    }
    loadPacientes();
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Gerenciamento de Pacientes</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setPacienteEdit(null);
            setOpenForm(true);
          }}
        >
          Adicionar Paciente
        </Button>
      </Stack>

      <Paper elevation={2}>
        {loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={20} color="inherit" />
            Carregando...
          </Box>
        ) : (
          <DefaultTable
            columns={columnsTable}
            rows={recentPatientes}
            getRowId={(m) => m.id}
          />
        )}
      </Paper>
      
      {/* Confirmação de exclusão */}
      <Dialog
        open={!!pacienteToDelete}
        onClose={() => setPacienteToDelete(null)}
      >
        <DialogTitle>Excluir paciente</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir{" "}
          <strong>{pacienteToDelete?.nome}</strong> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPacienteToDelete(null)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <PacienteFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        paciente={pacienteEdit}
      />
    </Box>
  );
};

export default Pacientes;

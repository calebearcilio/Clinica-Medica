import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import type { Paciente } from "../types/paciente";
import pacienteService from "../services/pacienteService";
import PacienteFormModal from "../components/pacientes/PacienteFormModal";

const Pacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [pacienteToDelete, setPacienteToDelete] = useState<Paciente | null>(
    null,
  );
  const [pacienteEdit, setPacienteEdit] = useState<Paciente | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const loadPacientes = async () => {
    setLoading(true);
    try {
      const pacientesDB = await pacienteService.get();
      setPacientes(pacientesDB);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  const handleDelete = async () => {
    if (!pacienteToDelete) return;

    await pacienteService.delete(pacienteToDelete.id);
    setPacienteToDelete(null);
    loadPacientes();
  };

  const handleSubmitPaciente = async (dataForm: any) => {
    if (pacienteEdit) {
      console.log("Update: ", dataForm)
      await pacienteService.update(pacienteEdit.id, dataForm);
    } else {
      console.log("Create: ", dataForm)
      await pacienteService.create(dataForm);
    }
    loadPacientes();
  };

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>CPF</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pacientes.map((paciente) => (
              <TableRow key={paciente.id} hover>
                <TableCell>{paciente.cpf}</TableCell>
                <TableCell>{paciente.nome}</TableCell>
                <TableCell>{paciente.telefone}</TableCell>
                <TableCell>{paciente.email}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setPacienteEdit(paciente);
                      setOpenForm(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setPacienteToDelete(paciente)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {!loading && pacientes.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Nenhum paciente cadastrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
      {/* Confirmação de exclusão */}
      <Dialog
        open={!!pacienteToDelete}
        onClose={() => setPacienteToDelete(null)}
      >
        <DialogTitle>Excluir paciente</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir{" "}
          <strong>{pacienteToDelete?.nome}</strong>
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
        onSubmit={handleSubmitPaciente}
        paciente={pacienteEdit}
      />
    </Box>
  );
};

export default Pacientes;

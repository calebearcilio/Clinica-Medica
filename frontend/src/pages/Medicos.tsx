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
import DefaultTable, { type Column } from "../components/DefaultTable";
import type { Medico } from "../types/medico";
import { useEffect, useState } from "react";
import medicoService from "../services/medicoService";
import MedicoFormModal from "../components/formsModal/MedicoFormModal";
import { sortMedicosByCreateData } from "../utils/dashboardUtils";

const Medicos = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [medicoToDelete, setMedicoToDelete] = useState<Medico | null>(null);
  const [medicoEdit, setMedicoEdit] = useState<Medico | null>(null);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const recentsMedicos = sortMedicosByCreateData(medicos);

  const columnsTable: Column<Medico>[] = [
    { id: "nome", label: "Nome" },
    { id: "especialidade", label: "Especialidade" },
    { id: "crm", label: "CRM" },
    { id: "email", label: "Email" },
    { id: "telefone", label: "Telefone" },
    {
      id: "id",
      label: "Ações",
      align: "right",
      format: (_, row) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => {
              setMedicoEdit(row);
              setOpenForm(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => setMedicoToDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  const loadMedicos = async () => {
    setLoading(true);
    try {
      const medicosDB = await medicoService.get();
      setMedicos(medicosDB);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!medicoToDelete) return;

    await medicoService.delete(medicoToDelete.id);
    setMedicoToDelete(null);
    loadMedicos();
  };

  const handleSubmit = async (dataForm: any) => {
    if (medicoEdit) {
      await medicoService.update(medicoEdit.id, dataForm);
    } else {
      await medicoService.create(dataForm);
    }
    loadMedicos();
  };

  useEffect(() => {
    loadMedicos();
  }, []);

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">Gerenciamento de Médicos</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setMedicoEdit(null);
            setOpenForm(true);
          }}
        >
          Adicionar médico
        </Button>
      </Stack>

      <Paper elevation={2}>
        <DefaultTable
          columns={columnsTable}
          rows={recentsMedicos}
          getRowId={(m) => m.id}
        />
      </Paper>

      <Dialog open={!!medicoToDelete} onClose={() => setMedicoToDelete(null)}>
        <DialogTitle>Excluir médico</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir <strong>{medicoToDelete?.nome}</strong>{" "}
          ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMedicoToDelete(null)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      <MedicoFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        medico={medicoEdit}
      />
    </Box>
  );
};

export default Medicos;

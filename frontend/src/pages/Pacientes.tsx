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
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import type { CreatePacienteData, Paciente } from "../types/paciente";
import pacienteService from "../services/pacienteService";
import PacienteFormModal from "../components/formsModal/PacienteFormModal";
import DefaultTable, { type Column } from "../components/DefaultTable";
import { sortPacientesByCreateData } from "../utils/sortsUtils";
import StaticMessage from "../components/messages/StaticMessage";
import { usePopup } from "../components/messages/PopupProvider";
import { maskCPF, maskTelefone } from "../utils/inputMaskUtils";
import dayjs from "dayjs";

const Pacientes = () => {
  // informações dos pacientes
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  // paciente selecionado para deletar
  const [pacienteToDelete, setPacienteToDelete] = useState<Paciente | null>(
    null,
  );
  // paciente selecionado para editar
  const [pacienteEdit, setPacienteEdit] = useState<Paciente | null>(null);
  // controle do formulário modal
  const [openForm, setOpenForm] = useState<boolean>(false);
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(true);
  // mensagem de falha no carregamento dos dados
  const [msgError, setMsgError] = useState<string | null>(null);
  // contexto global da mensagem popup
  const { showPopup } = usePopup();
  // pacientes ordenados por data de criação
  const recentPatientes = sortPacientesByCreateData(pacientes);

  // formatação da tabela
  const columnsTable: Column<Paciente>[] = [
    { id: "nome", label: "Nome" },
    { id: "cpf", label: "CPF", format: (value) => maskCPF(value) },
    {
      id: "telefone",
      label: "Telefone",
      format: (value) => maskTelefone(value),
    },
    { id: "email", label: "Email" },
    {id: "dataNascimento", label: "Data de nascimento", format: (value, _row) => (
      <Typography>{dayjs(value).format("DD/MM/YYYY")}</Typography>
    )},
    {
      id: "id",
      label: "Ações",
      align: "center",
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

  // carregamento de dados
  const loadPacientes = async () => {
    setLoading(true);
    setMsgError(null);

    try {
      const pacientesDB = await pacienteService.get();
      setPacientes(pacientesDB);
      setMsgError(null);
    } catch {
      setMsgError("Falha ao carregar dados dos pacientes.");
    } finally {
      setLoading(false);
    }
  };

  // função deletar paciente
  const handleDelete = async () => {
    if (!pacienteToDelete) return;

    try {
      await pacienteService.delete(pacienteToDelete.id);
      setPacienteToDelete(null);
      showPopup("Paciente removido do sistema.", "success");
    } catch {
      showPopup("Falha ao remover paciente.", "error");
    } finally {
      loadPacientes();
    }
  };

  // função adicionar/atualizar paciente
  const handleSubmit = async (dataForm: CreatePacienteData) => {
    try {
      if (pacienteEdit) {
        await pacienteService.update(pacienteEdit.id, dataForm);
        showPopup("Informações do paciente atualizadas.", "success");
      } else {
        await pacienteService.create(dataForm);
        showPopup("Paciente cadastrado com sucesso.", "success");
      }
      loadPacientes();
      setOpenForm(false);
    } catch {
      showPopup("Falha no envio dos dados.", "error");
    }
  };

  useEffect(() => {
    loadPacientes();
  }, []);

  // Erro ao carregar dados do servidor
  if (!!msgError) {
    return (
      <StaticMessage
        alertMessage={msgError}
        message="Não conseguimos carregar os dados. Isso pode ser temporário."
        functionReload={loadPacientes}
        severity="error"
      />
    );
  }

  // Conteúdo principal
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

      {/* Tabela */}
      <Paper elevation={2}>
        <DefaultTable
          columns={columnsTable}
          rows={recentPatientes}
          getRowId={(p) => p.id}
          isLoading={loading}
        />
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

      {/* Formulário para adicionar/atualizar dados de um médico */}
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

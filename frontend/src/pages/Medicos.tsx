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
import type { CreateMedicoData, Medico } from "../types/medico";
import medicoService from "../services/medicoService";
import MedicoFormModal from "../components/formsModal/MedicoFormModal";
import DefaultTable, { type Column } from "../components/DefaultTable";
import { sortMedicosByCreateData } from "../utils/sortsUtils";
import { usePopup } from "../components/messages/PopupProvider";
import { maskTelefone } from "../utils/inputMaskUtils";
import StaticMessage from "../components/messages/StaticMessage";

const Medicos = () => {
  // informações dos médicos
  const [medicos, setMedicos] = useState<Medico[]>([]);
  // médico selecionado para deletar
  const [medicoToDelete, setMedicoToDelete] = useState<Medico | null>(null);
  // médico selecionado para editar
  const [medicoEdit, setMedicoEdit] = useState<Medico | null>(null);
  // controle do formulário modal
  const [openForm, setOpenForm] = useState<boolean>(false);
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(true);
  // mensagem de falha no carregamento dos dados
  const [msgError, setMsgError] = useState<string | null>(null);
  // contexto global da mensagem popup
  const { showPopup } = usePopup();
  // médicos ordenados por data de criação
  const recentsMedicos = sortMedicosByCreateData(medicos);

  // formatação da tabela
  const columnsTable: Column<Medico>[] = [
    { id: "nome", label: "Nome" },
    { id: "especialidade", label: "Especialidade" },
    { id: "crm", label: "CRM" },
    { id: "email", label: "Email" },
    {
      id: "telefone",
      label: "Telefone",
      format: (value) => maskTelefone(value),
    },
    {
      id: "id",
      label: "Ações",
      align: "center",
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

  // carregamento de dados
  const loadMedicos = async () => {
    setLoading(true);
    setMsgError(null);

    try {
      const medicosDB = await medicoService.get();
      setMedicos(medicosDB);
      setMsgError(null);
    } catch {
      setMsgError("Falha ao carregar dados dos médicos.");
    } finally {
      setLoading(false);
    }
  };

  // função deletar médico
  const handleDelete = async () => {
    if (!medicoToDelete) return;

    try {
      await medicoService.delete(medicoToDelete.id);
      setMedicoToDelete(null);
      showPopup("Médico removido do sistema.", "success");
    } catch (error) {
      showPopup("Falha ao remover médico.", "error");
    }
    loadMedicos();
  };

  // função adicionar/atualizar médico
  const handleSubmit = async (dataForm: CreateMedicoData) => {
    try {
      if (medicoEdit) {
        await medicoService.update(medicoEdit.id, dataForm);
        showPopup("Informações do médico atualizadas.", "success");
      } else {
        await medicoService.create(dataForm);
        showPopup("Médico cadastrado com sucesso.", "success");
      }
      loadMedicos();
      setOpenForm(false);
    } catch (error) {
      showPopup("Falha no envio dos dados.", "error");
    }
  };

  useEffect(() => {
    loadMedicos();
  }, []);

  // Erro ao carregar dados do servidor
  if (!!msgError) {
    return (
      <StaticMessage
        alertMessage={msgError}
        message="Não conseguimos carregar os dados. Isso pode ser temporário."
        functionReload={loadMedicos}
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

      {/* Tabela */}
      <Paper elevation={2}>
        <DefaultTable
          columns={columnsTable}
          rows={recentsMedicos}
          getRowId={(m) => m.id}
          isLoading={loading}
        />
      </Paper>

      {/* Confirmação de exclusão */}
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

      {/* Formulário para adicionar/atualizar dados de um médico */}
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

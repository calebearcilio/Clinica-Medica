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
import { useEffect, useState } from "react";
import type { Consulta, CreateConsultaData } from "../types/consulta";
import consultaService from "../services/consultaService";
import ConsultaFormModal from "../components/formsModal/ConsultaFormModal";
import DefaultTable, { type Column } from "../components/DefaultTable";
import { sortConsultasByData } from "../utils/sortsUtils";
import StaticMessage from "../components/messages/StaticMessage";
import { usePopup } from "../components/messages/PopupProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"

export default function ConsultasPage() {
  // informações das concultas
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  // consulta selecionada para deletar
  const [consultaToDelete, setConsultaToDelete] = useState<Consulta | null>(
    null,
  );
  // consulta selecionada para editar
  const [consultaToEdit, setConsultaToEdit] = useState<Consulta | null>(null);
  // controle do formulário modal
  const [openForm, setOpenForm] = useState<boolean>(false);
  // controle de carregamento
  const [loading, setLoading] = useState<boolean>(true);
  // mensagem de falha no carregamento dos dados
  const [msgError, setMsgError] = useState<string | null>(null);
  // contexto global da mensagem popup
  const { showPopup } = usePopup();
  // consultas ordenados por data, mais atual primeiro
  const recentConsultas = sortConsultasByData(consultas);

  // formatação das tabelas
  const columnsTable: Column<Consulta>[] = [
    {
      id: "dataHora",
      label: "Data",
      format: (value, _row) => (
        <Typography>
          {dayjs(value).locale("pt-br").format("HH:mm")} <br/>
          {dayjs(value).locale("pt-br").format("D [de] MMMM [de] YYYY")}
        </Typography>
      ),
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
      align: "center",
      format: (_, row) => (
        <Box>
          <IconButton
            color="primary"
            onClick={() => {
              setConsultaToEdit(row);
              setOpenForm(true);
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

  // carregamento dos dados
  const loadConsultas = async () => {
    setLoading(true);
    setMsgError(null);

    try {
      const consultasDB = await consultaService.get();      
      setConsultas(consultasDB);
      setMsgError(null);
    } catch {
      setMsgError("Falha ao carregar dados das consultas.");
    } finally {
      setLoading(false);
    }
  };

  // função deletar consulta
  const handleDelete = async () => {
    if (!consultaToDelete) return;

    try {
      await consultaService.delete(consultaToDelete.id);
      setConsultaToDelete(null);
      showPopup("Consulta removido do sistema.", "success");
    } catch {
      showPopup("Falha ao remover consulta.", "error");
    } finally {
      loadConsultas();
    }
  };

  // função adicionar/atualizar consulta
  const handleSubmit = async (dataForm: CreateConsultaData) => {
    try {
      if (consultaToEdit) {
        await consultaService.update(consultaToEdit.id, dataForm);
        showPopup("Informações da consulta atualizadas.", "success");
      } else {
        await consultaService.create(dataForm);
        showPopup("Consulta cadastrado com sucesso.", "success");
      }
      loadConsultas();
      setOpenForm(false);
    } catch {
      showPopup("Falha no envio dos dados.", "error");
    } finally {
      loadConsultas();
    }
  };

  useEffect(() => {
    loadConsultas();
  }, []);

  // Erro ao carregar dados do servidor
  if (!!msgError) {
    return (
      <StaticMessage
        alertMessage={msgError}
        message="Não conseguimos carregar os dados. Isso pode ser temporário."
        functionReload={loadConsultas}
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
        <Typography variant="h5">Consultas</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setConsultaToEdit(null);
            setOpenForm(true);
          }}
        >
          Nova consulta
        </Button>
      </Stack>

      {/* Tabela */}
      <Paper elevation={2}>
        <DefaultTable
          columns={columnsTable}
          rows={recentConsultas}
          getRowId={(m) => m.id}
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
          <strong>{consultaToDelete?.paciente.nome}</strong> com{" "}
          <strong>{consultaToDelete?.medico.nome}</strong> ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConsultaToDelete(null)}>Cancelar</Button>
          <Button color="error" onClick={handleDelete}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Formulário para adicionar/atualizar dados de um médico */}
      <ConsultaFormModal
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSubmit}
        consulta={consultaToEdit}
      />
    </Box>
  );
}

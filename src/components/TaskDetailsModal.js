import React from "react";
import {
  Box,
  Modal,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  Divider,
  AppBar,
  Toolbar,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DoneIcon from "@mui/icons-material/Done";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { downloadFile } from "../api/downloadFile";

const TaskDetailsModal = ({ open, onClose, task, onBack }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };

  const priorityColors = {
    low: "#4caf50", // Green
    high: "#ff9800", // Orange
    critical: "#f44336", // Red
  };

  const mapExecutionLocation = {
    remote: "Remoto",
    office: "Escritório",
    client_site: "Do lado do cliente",
    hybrid: "Híbrido",
  };

  const mapPriority = {
    low: "Baixa",
    high: "Alta",
    critical: "Crítica",
  };

  const mapStatus = {
    to_do: "A Fazer",
    in_progress: "Em Andamento",
    finished: "Concluído",
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <AppBar position="static" sx={{ backgroundColor: priorityColors[task?.priority] }}>
          <Toolbar>
            <Tooltip title="Voltar" arrow>
              <IconButton edge="start" color="inherit" onClick={onBack} aria-label="back">
                <ArrowBackIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {task?.name || "Detalhes da Tarefa"}
            </Typography>
            <IconButton color="inherit" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Divider sx={{ marginBottom: 2 }} />

        <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
          <Chip
            label={`Prioridade: ${mapPriority[task?.priority] || "N/A"}`}
            icon={<PriorityHighIcon />}
          />
          <Chip
            label={`Status: ${mapStatus[task?.status] || "N/A"}`}
            icon={<DoneIcon />}
          />
        </Stack>

        <Box>
          <Typography variant="h6" gutterBottom>
            Data de Execução
          </Typography>
          <Typography variant="subtitle1">{task?.executionDate}</Typography>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Local de Execução
          </Typography>
          <Typography variant="subtitle1">
            {mapExecutionLocation[task?.executionLocation] || "N/A"}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            Descrição
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              padding: 2,
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: 1,
              color: "rgb(82, 82, 82)",
              wordBreak: "break-word",
            }}
          >
            {task?.description || "Sem descrição disponível."}
          </Typography>
        </Box>

        <Divider sx={{ marginBottom: 2 }} />

        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Arquivos Anexos:
        </Typography>

        {task?.files?.length > 0 ? (
          <List>
            {task.files.map((file, index) => (
              <ListItem key={index} sx={{ padding: "8px 0" }}>
                <ListItemIcon>
                  <DownloadIcon color="action" />
                </ListItemIcon>
                <ListItemText primary={file.filename} />
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => downloadFile(file.url, file.filename)}
                >
                  Baixar
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Nenhum anexo disponível.
          </Typography>
        )}
      </Box>
    </Modal>
  );
};

export default TaskDetailsModal;
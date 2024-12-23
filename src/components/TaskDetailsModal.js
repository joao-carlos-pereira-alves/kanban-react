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
import {
  priorityColors as getPriorityColor, 
  mapPriority as getPriorityLabel, 
  mapExecutionLocation as getExecutionLocationLabel, 
  getStatusLabel,
  taskDetailsStyle as style
} from "../utils/mappings";

const TaskDetailsModal = ({ open, onClose, task, onBack }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <AppBar position="static" sx={{ backgroundColor: getPriorityColor[task?.priority] }}>
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
            label={`Prioridade: ${getPriorityLabel[task?.priority] || "N/A"}`}
            icon={<PriorityHighIcon />}
          />
          <Chip
            label={`Status: ${getStatusLabel[task?.status] || "N/A"}`}
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
            {getExecutionLocationLabel[task?.executionLocation] || "N/A"}
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
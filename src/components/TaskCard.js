import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import Chip from "@mui/material/Chip";
import DownloadIcon from "@mui/icons-material/Download"; // Ícone de download
import { downloadFile } from "../api/downloadFile";

const TaskCard = ({ task, onClickEvent }) => {
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

  const truncateText = (text, maxLength) => {
    return text?.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderLeft: `8px solid ${priorityColors[task.priority]}`,
        borderRadius: 2,
        padding: 1, // Reduzi o padding
        marginBottom: 1, // Reduzi o espaçamento entre os cards
        boxShadow: 2, // Reduzi a sombra para suavizar o design
        backgroundColor: "#f9f9f9",
        position: "relative",
        alignSelf: "center", // Centraliza o card horizontalmente
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s", // Suaviza transformações
        "&:hover": {
          filter: "brightness(95%)", // Aplica o efeito de blur
        },
        "&:active": {
          top: '1px'
        }
      }}
      onClick={() => onClickEvent(task)}
    >
      <CardContent sx={{ padding: "0px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" fontWeight="bold" noWrap>
                {task.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {mapExecutionLocation[task.executionLocation]}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                wordBreak: "break-word",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              {truncateText(task.description, 100)}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              Data de Execução: {task.executionDate}
            </Typography>
          </Grid>

          <Grid item xs={12} sx={{ marginTop: "auto" }}>
            <Box>
              <Chip
                label={mapPriority[task.priority]}
                sx={{
                  backgroundColor: priorityColors[task.priority],
                  color: "white",
                  fontWeight: "bold",
                  marginRight: "5px",
                }}
              />
              {task?.files.map((file) => {
                return (
                  <Chip
                    icon={
                      <DownloadIcon fontSize="small" sx={{ padding: "3px" }} />
                    }
                    label={file.filename}
                    variant="outlined"
                    clickable
                    onClick={() => downloadFile(file.url, file.filename)}
                  />
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TaskCard;

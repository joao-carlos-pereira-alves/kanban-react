import React from "react";
import useTasks from "./hooks/useTasks";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import { Box, Typography } from "@mui/material";

const App = () => {
  const {
    tasks,
    pagination,
    loading,
    handlePageChange,
    handleFilterChange,
  } = useTasks();

  return (
    <div>
      <Header />
      <Box
        sx={{
          textAlign: "left",
          marginBottom: 1,
          padding: 2,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Gerenciamento de Tarefas
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Visualize, organize e acompanhe o progresso das suas atividades em um
          só lugar.
        </Typography>
      </Box>
      <KanbanBoard
        tasks={tasks}
        onFilterChange={handleFilterChange}
        pagination={pagination}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default App;
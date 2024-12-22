import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "./api/tasksApi";
import Header from "./components/Header";
import KanbanBoard from "./components/KanbanBoard";
import { Box, Typography } from "@mui/material";

const App = () => {
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    totalItems: 0,
  });
  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: { pageSize: pagination.perPage, page: pagination.page },
  });

  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    name: "",
    executionLocation: "",
    executionDate: "",
  });
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Atualiza o estado de tasks quando os dados do GraphQL mudam
  useEffect(() => {
    if (data) {
      if (data?.tasks?.tasks) setTasks(data.tasks.tasks);
      if (data?.tasks?.pagination) setPagination(data.tasks.pagination);
    }
  }, [data]);

  const handlePageChange = (page) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Cria um novo timer de debounce
    const timer = setTimeout(() => {
      refetch({
        page: page,
      });
    }, 1000); // 500ms de debounce, você pode ajustar conforme necessário

    // Armazena o timer
    setDebounceTimer(timer);
  };

  // Função para aplicar os filtros
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    // Limpa o timer anterior (caso haja um) e cria um novo para aplicar o debounce
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Cria um novo timer de debounce
    const timer = setTimeout(() => {
      refetch({
        priority: newFilters.priority,
        executionLocation: newFilters.location,
        executionDate: newFilters.date,
        searchText: newFilters.query,
        page: pagination.page,
        pageSize: pagination.pageSize
      });
    }, 500); // 500ms de debounce, você pode ajustar conforme necessário

    // Armazena o timer
    setDebounceTimer(timer);
  };

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

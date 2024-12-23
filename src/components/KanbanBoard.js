import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Divider,
  Skeleton,
} from "@mui/material";
import TaskCard from "./TaskCard";
import Filter from "./Filter";
import PaginatedComponent from "./Pagination";
import TaskDetailsModal from "./TaskDetailsModal";
import { applyFilters, groupTasksByStatus } from "../utils/taskUtils";

const KanbanBoard = ({
  tasks,
  onFilterChange,
  pagination,
  onPageChange,
  loading,
}) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filters, setFilters] = useState({
    status: null,
    priority: null,
    name: null,
  });
  const [showTaskDialog, setShowTaskDialog] = useState({
    open: false,
    task: null,
  });

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const updateFilters = (newFilters) => {
    const { filteredTasks, filteredNewFilters } = applyFilters(tasks, newFilters);
    setFilteredTasks(filteredTasks);
    setFilters((prevFilters) => ({ ...prevFilters, ...filteredNewFilters }));

    onFilterChange(Object.keys(filteredNewFilters).length > 0 ? filteredNewFilters : {});
  };

  const taskColumns = groupTasksByStatus(filteredTasks);

  const handleOpenModal = (task) =>
    setShowTaskDialog({ open: true, task: task });
  const handleCloseModal = () => setShowTaskDialog({ open: false, task: null });

  return (
    <Card sx={{ padding: "10px" }}>
      <CardContent>
        <Filter onSearch={updateFilters} />
        <TaskDetailsModal
          open={showTaskDialog.open}
          onClose={handleCloseModal}
          task={showTaskDialog.task}
        />
        <Box
          sx={{
            marginTop: "64px",
            overflowY: "auto",
          }}
        >
          <Grid container spacing={3}>
            {["A fazer", "Em andamento", "Concluído"].map((column) => (
              <Grid item xs={12} md={4} key={column}>
                <Paper
                  sx={{
                    padding: 2,
                    backgroundColor: "#f4f6f8",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: 2 }}>
                    {column}
                  </Typography>
                  <Divider />
                  <Box
                    sx={{
                      flexGrow: 1,
                      maxHeight: "400px",
                      overflowY: "auto",
                      paddingTop: 3,
                      backgroundColor: "#f4f6f8",
                      borderRadius: 2,
                    }}
                  >
                    {loading ? (
                      <>
                        <Skeleton />
                        <Skeleton
                          variant="rectangular"
                          width={"100%"}
                          height={118}
                        />
                      </>
                    ) : (
                      taskColumns[column].map((task, index) => (
                        <TaskCard
                          task={task}
                          key={index}
                          onClickEvent={(task) => handleOpenModal(task)}
                        />
                      ))
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        <PaginatedComponent
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.perPage}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
};

export default KanbanBoard;
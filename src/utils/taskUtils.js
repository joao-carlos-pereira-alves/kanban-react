export const applyFilters = (tasks, filters) => {
  const filteredNewFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => value !== null && value !== ""
    )
  );

  return {
    filteredTasks: tasks.filter((task) =>
      Object.entries(filteredNewFilters).every(([key, value]) =>
        task[key]?.toString().includes(value)
      )
    ),
    filteredNewFilters,
  };
};

export const groupTasksByStatus = (tasks) => ({
  "A fazer": tasks.filter((task) => task.status === "to_do"),
  "Em andamento": tasks.filter((task) => task.status === "in_progress"),
  Concluído: tasks.filter((task) => task.status === "finished"),
});

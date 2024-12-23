import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "../api/tasksApi";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
    totalItems: 0,
  });
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    name: "",
    executionLocation: "",
    executionDate: "",
  });
  const [debounceTimer, setDebounceTimer] = useState(null);

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: { pageSize: 5, page: 1 },
  });

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

    const timer = setTimeout(() => {
      const filtersToSend = Object.fromEntries(
        Object.entries(filters).filter(([key, value]) => value && value !== "")
      );

      filtersToSend.page = page;
      filtersToSend.pageSize = 5;

      refetch(filtersToSend);
    }, 500);

    setDebounceTimer(timer);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
     refetch({
      priority: newFilters.priority,
      executionLocation: newFilters.location,
      executionDate: newFilters.date,
      searchText: newFilters.query,
      page: pagination.page,
      pageSize: pagination.perPage,
    });
    }, 500);

    setDebounceTimer(timer);
  };

  return {
    tasks,
    pagination,
    loading,
    error,
    handlePageChange,
    handleFilterChange,
  };
};

export default useTasks;

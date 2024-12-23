import React, { useState } from "react";
import { Pagination, Box } from "@mui/material";

const PaginatedComponent = ({ totalItems, itemsPerPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    onPageChange(page);
  };
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: 2,
      }}
    >

      <Pagination
        count={totalPages || 1}
        page={totalPages == 1 ? 1 : currentPage}
        onChange={handlePageChange}
        color="primary"
        variant="outlined"
        size="large"
        key={currentPage}
      />
    </Box>
  );
};

export default PaginatedComponent;

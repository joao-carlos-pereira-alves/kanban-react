export const mapExecutionLocation = {
  remote: "Remoto",
  office: "Escritório",
  client_site: "Do lado do cliente",
  hybrid: "Híbrido",
};

export const mapPriority = {
  low: "Baixa",
  high: "Alta",
  critical: "Crítica",
};

export const priorityColors = {
  low: "#4caf50",
  high: "#ff9800",
  critical: "#f44336",
};

export const taskDetailsStyle = {
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

export const getStatusLabel = {
  to_do: "A Fazer",
  in_progress: "Em Andamento",
  finished: "Concluído",
};
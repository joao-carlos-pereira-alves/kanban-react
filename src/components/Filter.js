import React, { useState } from 'react';
import { Card, CardContent, TextField, MenuItem, Select, InputLabel, FormControl, Box, Button, Grid } from '@mui/material';

const Filter = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('');

  const handleSubmit = () => {
    onSearch({ query, date, location, priority });
  };

  const handleResetFilter = () => {
    setQuery('');
    setDate('');
    setLocation('');
    setPriority('');
    handleSubmit()
  }

  return (
    <Card sx={{ marginBottom: 3 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Campo de busca */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Buscar Tarefa"
              variant="outlined"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </Grid>

          {/* Filtro de data */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Data de Execução"
              type="date"
              format="M/D/YYYY"
              variant="outlined"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>

          {/* Filtro de local de execução */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Local de Execução</InputLabel>
              <Select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                label="Local de Execução"
              >
                <MenuItem value="office">Escritório</MenuItem>
                <MenuItem value="remote">Remoto</MenuItem>
                <MenuItem value="client_site">Do lado do cliente</MenuItem>
                <MenuItem value="hybrid">Híbrido</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Filtro de prioridade */}
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Prioridade</InputLabel>
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                label="Prioridade"
              >
                <MenuItem value="low">Baixa</MenuItem>
                <MenuItem value="high">Alta</MenuItem>
                <MenuItem value="critical">Crítica</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Botão para submeter o filtro */}
          <Grid item xs={12}>
            <Box textAlign="right">
              <Button variant="outlined" onClick={handleResetFilter} sx={{ marginRight: 1 }}>Limpar Filtro</Button>
              <Button variant="contained" onClick={handleSubmit}>Aplicar Filtro</Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Filter;
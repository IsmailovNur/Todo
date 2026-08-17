import { Box, Container, Typography } from '@mui/material';
import AppHeader from "./widgets/AppHeader/AppHeader.tsx";
import { TodoItem } from "./entities/Todo/TodoItem.tsx";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store.ts";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();


  const todoItemData = {
    _id: '1',
    title: 'TOdo Item',
    description: 'description',
    status: 'in_progress'
  }

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg">
        <Typography variant="h3">
          TODOS
        </Typography>


        <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
          <TodoItem todo={todoItemData} />

        </Box>
      </Container>
    </>
  );
};

export default App;
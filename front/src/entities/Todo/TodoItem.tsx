import {
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import type { FC } from "react";
import type { ITodo } from "./types.ts";
import DeleteIcon from '@mui/icons-material/Delete';
import type { AppDispatch } from "../../app/store.ts";
import { useDispatch } from "react-redux";

interface TodoItemProps {
  todo: ITodo
}

export const TodoItem: FC<TodoItemProps> = ({todo}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card key={todo._id}>
      <CardContent sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Box>
          <Typography variant="h6">{todo.title}</Typography>
          {todo.description &&
            <Typography color="textSecondary">{todo.description}</Typography>}
        </Box>
        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
          <Select value={todo.status}>
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="in_progress">In process</MenuItem>
            <MenuItem value="complete">Completed</MenuItem>
          </Select>
          <IconButton color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};


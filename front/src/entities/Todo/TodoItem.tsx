import {
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select, type SelectChangeEvent,
  Typography
} from "@mui/material";
import type { FC } from "react";
import type { ITodo } from "./types";
import DeleteIcon from '@mui/icons-material/Delete';
import type { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodoStatus } from "./todosThunk";

interface TodoItemProps {
  todo: ITodo
}

const statusColors: Record<ITodo['status'], { border: string; bg: string }> = {
  new: { border: '#2196f3', bg: '#2196F314' },
  in_progress: { border: '#4caf50', bg: '#4CAF5014' },
  complete: { border: '#ffeb3b', bg: '#FFEB3B14' },
};

export const TodoItem: FC<TodoItemProps> = ({todo}) => {
  const dispatch = useDispatch<AppDispatch>();


  const handleStatusChange = (e: SelectChangeEvent) => {
    dispatch(updateTodoStatus({ id: todo._id, status: e.target.value as ITodo['status'] }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo._id));
  };

  const currentColor = statusColors[todo.status] || statusColors.new;

  return (
    <Card
      sx={{
        borderLeft: `6px solid ${currentColor.border}`,
        backgroundColor: currentColor.bg,
        transition: 'all 0.3s ease',
      }}
    >
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select
            value={todo.status}
            onChange={handleStatusChange}
            size="small"
            sx={{
              borderColor: currentColor.border,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: currentColor.border,
              }
            }}
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="in_progress">In process</MenuItem>
            <MenuItem value="complete">Completed</MenuItem>
          </Select>
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};


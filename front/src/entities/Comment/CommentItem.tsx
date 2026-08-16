import { type FC } from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import type { CommentItem as ICommentItem } from './types.ts';

interface CommentItemProps {
  comment: ICommentItem;
  onDelete: (id: number) => void;
  deleteLoading: boolean | number;
}

export const CommentItem: FC<CommentItemProps> = ({ comment, onDelete, deleteLoading }) => {
  return (
    <Card variant="outlined" sx={{ mb: 2, p: 1 }}>
      <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
            {comment.author || 'Anonymous'}:
          </Typography>
          <Typography component="span">
            {comment.text}
          </Typography>
        </Box>
        <Button
          size="small"
          color="error"
          variant="outlined"
          disabled={deleteLoading === comment.id}
          onClick={() => onDelete(comment.id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};
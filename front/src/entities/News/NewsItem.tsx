import { type FC } from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { API_URL } from "../../shared/axios/AxiosApi.ts";
import type { NewsItem as INewsItem } from "./types.ts";

interface NewsItemProps {
  news: INewsItem;
  onDelete: (id: number) => void;
  deleteLoading: boolean | number;
}

export const NewsItem: FC<NewsItemProps> = (props) => {
  const {
    news,
    onDelete,
    deleteLoading
  } = props;

  const imageUrl = news.image ? `${API_URL}/public/${news.image}` : null;
  const formattedDate = new Date(news.publish_date).toLocaleString();

  return (
    <Card variant="outlined" sx={{
      display: 'flex',
      p: 1,
      alignItems: 'center',
      flexWrap: "wrap"
    }}>
      <Box
        sx={{
          width: 100,
          height: 100,
          bgcolor: '#ddd',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          m: "auto"
        }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={news.title} style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }} />
        ) : (
          <Typography color="text.secondary">No Image</Typography>
        )}
      </Box>

      <CardContent sx={{
        flexGrow: '1',
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}>
          <Typography sx={{fontSize: '28px'}}>
            {news.title}
          </Typography>
          <Typography sx={{
            opacity: '.5',
            fontSize: "12px"
          }} color="text.secondary">
            At {formattedDate}
          </Typography>
        </Box>

        <Box sx={{mt: 1, display: 'flex', flexDirection: 'column', gap: 2}}>
          <Button variant="outlined" component={Link} to={`/news/${news.id}`} size="small" color="primary">
            Read Full Post
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="error"
            disabled={deleteLoading === news.id}
            onClick={() => onDelete(news.id)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
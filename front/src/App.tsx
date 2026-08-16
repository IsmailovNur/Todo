import { Container, Typography } from '@mui/material';
import AppHeader from "./widgets/AppHeader/AppHeader.tsx";

const App = () => {

  return (
    <>
      <AppHeader />
      <Container maxWidth="lg">
        <Typography variant="h3">
          TODOS
        </Typography>
      </Container>
    </>
  );
};

export default App;
import { Container, Typography } from "@mui/material";

const AppHeader = () => {

  return (
    <header>
      <Container maxWidth='lg'>
        <Typography  variant='h4'>
          React News
        </Typography>
      </Container>
    </header>
  );
};

export default AppHeader;
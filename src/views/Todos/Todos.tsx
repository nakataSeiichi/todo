import { Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import animations from '../../utils/animations';
import styles from './Todos.styles';
import TodoMenu from '../../components/TodoMenu/TodoMenu';
import TodoList from '../../components/TodoList/TodoList';

export default function Todos() {
  const { presence } = animations;

  return (
    <Container
      sx={styles.container}
      maxWidth="sm"
      component={motion.div}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...presence}
    >
      <Grid
        container
        spacing={1}
        alignItems="center"
        justifyContent="center"
        sx={styles.content}
      >
        <Grid item xs={12}>
          <TodoMenu />
        </Grid>
        <Grid item xs={12}>
          <TodoList />
        </Grid>
      </Grid>
    </Container>
  );
}

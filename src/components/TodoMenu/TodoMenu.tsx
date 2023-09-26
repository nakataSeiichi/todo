import { Container, Grid, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useRef, useState } from 'react';
import Button from '../Button/ButtonBase';
import TextInputSearch from '../TextInputSearch/TextInputSearch';
import animations from '../../utils/animations';
import styles from './TodoMenu.styles';
import { useStoreTodos } from '../../store/useStoreTodos';
import { useStoreModal } from '../../store/useStoreModal';
import TodoAddModal from '../TodoAddModal/TodoAddModal';
import useDebounce from '../../hooks/useDebounceZustand';
import { ChangeEvent } from '../../types/Events';
import TodoDeleteModal from '../TodoDeleteModal/TodoDeleteModal';

export default function TodoMenu() {
  const handleRef = useRef<HTMLInputElement | null>(null);
  const modal = useStoreModal();
  const todosCount = useStoreTodos((store) => store.todosCount);
  const isLoading = useStoreTodos((store) => store.isLoading);
  const setIsLoading = useStoreTodos((store) => store.setIsLoading);
  const emptyTodos = useStoreTodos((store) => store.emptyTodos);
  const setDebounce = useStoreTodos((store) => store.setDebounce);
  const [searchText, setSearchText] = useState('');
  const { component, presence } = animations;

  useDebounce({
    value: searchText,
    delay: 500,
    setDebounce,
    setIsLoading,
  });

  function showModal() {
    // Insert other logics here before/after showing modal
    modal.show('confirm');
  }

  // On each change (keystroke)
  function handleChange(event: ChangeEvent) {
    setSearchText(event.target.value);
  }

  // useEffect(() => {
  //   setDebounce(debouncedValue);
  // }, [debouncedValue, setDebounce]);

  return (
    <>
      <TodoAddModal />
      <TodoDeleteModal />
      <Container
        sx={styles.container}
        maxWidth="sm"
        component={motion.div}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...presence}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={styles.content}
        >
          <Grid item xs={8}>
            <TextInputSearch
              isLoading={isLoading}
              ref={handleRef}
              label="Search Todo"
              size="small"
              fullWidth
              type="text"
              id="input-title"
              name="title"
              placeholder="..."
              onChange={(event: ChangeEvent) => handleChange(event)}
            />
          </Grid>

          <Grid item xs={4}>
            <Stack direction="row" spacing={1}>
              <Button
                type="submit"
                size="small"
                variant="contained"
                onClick={() => showModal()}
                component={motion.div}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...component}
              >
                <AddIcon />
              </Button>

              <Button
                type="submit"
                size="small"
                variant="contained"
                onClick={() => emptyTodos()}
                component={motion.div}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...component}
                disabled={!todosCount}
              >
                <DeleteForeverIcon />
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

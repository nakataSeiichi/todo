import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Container, Grid, Paper, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounceZustand';
import { useStoreModal } from '../../store/useStoreModal';
import {
  useSetDebounce,
  useSetIsLoading,
  useTodoIsLoading,
  useTodosCount,
} from '../../store/useStoreTodos';
import { ChangeEvent } from '../../types/Events';
import animations from '../../utils/animations';
import Button from '../Button/ButtonBase';
import TextInputSearch from '../TextInputSearch/TextInputSearch';
import TodoAddModal from '../TodoAddModal/TodoAddModal';
import TodoDeleteModal from '../TodoDeleteModal/TodoDeleteModal';
import TodoEditModal from '../TodoEditModal/TodoEditModal';
import TodoEmptyModal from '../TodoEmptyModal/TodoEmptyModal';
import styles from './TodoMenu.styles';

export default function TodoMenu() {
  const handleRef = useRef<HTMLInputElement | null>(null);
  const modal = useStoreModal();
  const todosCount = useTodosCount();
  const isLoading = useTodoIsLoading();
  const setIsLoading = useSetIsLoading();
  const setDebounce = useSetDebounce();
  const [searchText, setSearchText] = useState('');
  const { component, presence } = animations;

  useDebounce({
    value: searchText,
    delay: 500,
    setDebounce,
    setIsLoading,
  });

  function showConfirmModal() {
    // Insert other logics here before/after showing modal
    modal.show('todoAdd');
  }

  function showAlertModal() {
    // Insert other logics here before/after showing modal
    modal.show('todoEmpty');
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
      <TodoEditModal />
      <TodoDeleteModal />
      <TodoEmptyModal />
      <Paper>
        <Container
          sx={styles.container}
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
            <Grid item xs={8}>
              <TextInputSearch
                isLoading={isLoading}
                inputRef={handleRef}
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
                  onClick={() => showConfirmModal()}
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
                  onClick={() => showAlertModal()}
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
      </Paper>
    </>
  );
}

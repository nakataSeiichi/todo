import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, FormControlLabel, IconButton, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './TodoList.styles';
import {
  useToggleTodo,
  useSetSelectedTodo,
  useTodos,
  useTodoDebounce,
  useFilteredTodos,
} from '../../store/useStoreTodos';
import { useStoreModal } from '../../store/useStoreModal';
import { TTodo } from '../../types/Todos';

export default function TodoList() {
  const modal = useStoreModal();
  const todos = useTodos();
  const setSelectedTodo = useSetSelectedTodo();
  const debounce = useTodoDebounce();
  const filteredTodos = useFilteredTodos();
  const toggleTodo = useToggleTodo();

  function handleDeleteTodo(todo: TTodo) {
    setSelectedTodo(todo);
    modal.show('todoDelete');
  }

  function handleEditTodo(todo: TTodo) {
    setSelectedTodo(todo);
    modal.show('todoEdit');
  }

  return (
    <List sx={styles.list}>
      {todos &&
        (debounce === '' ? todos : filteredTodos).map(
          ({ id, title, description, isCompleted }) => {
            return (
              <Accordion key={id}>
                <AccordionSummary
                  sx={styles.accordionSX}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id={`panel1a-header-${id}`}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{ pointerEvents: 'none' }}
                        checked={isCompleted}
                        onChange={() => toggleTodo(id)}
                      />
                    }
                    label={<Typography>{title}</Typography>}
                    sx={[
                      styles.todoTitle,
                      isCompleted ? styles.todoCompleted : {},
                    ]}
                  />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={styles.buttonContainerMargin}
                  >
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        handleEditTodo({
                          id,
                          title,
                          description,
                          isCompleted,
                        })
                      }
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() =>
                        handleDeleteTodo({
                          id,
                          title,
                          description,
                          isCompleted,
                        })
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </AccordionSummary>
                <AccordionDetails sx={styles.descriptionContainer}>
                  <Typography sx={styles.descriptionText}>
                    {description ?? 'None...'}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          }
        )}
    </List>
  );
}

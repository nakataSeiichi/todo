import List from '@mui/material/List';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, FormControlLabel, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './TodoList.styles';
import { useStoreTodos } from '../../store/useStoreTodos';
import { useStoreModal } from '../../store/useStoreModal';
import { TTodo } from '../../types/Todos';

export default function TodoList() {
  const modal = useStoreModal();
  const todos = useStoreTodos((store) => store.todos);
  const setSelectedTodo = useStoreTodos((store) => store.setSelectedTodo);
  const debounce = useStoreTodos((store) => store.debounce);
  const filteredTodos = useStoreTodos((store) =>
    store.todos.filter((todo) =>
      todo.title.toLowerCase().includes(debounce.toLowerCase())
    )
  );
  const toggleTodo = useStoreTodos((store) => store.toggleTodo);
  function handleDeleteTodo(todo: TTodo) {
    setSelectedTodo(todo);
    modal.show('alert');
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
                    label={title}
                    sx={isCompleted ? styles.todoCompleted : {}}
                  />
                  <IconButton
                    sx={styles.buttonMargin}
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                      handleDeleteTodo({ id, title, description, isCompleted })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails sx={styles.description}>
                  <Typography>{description ?? 'None...'}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          }
        )}
    </List>
  );
}

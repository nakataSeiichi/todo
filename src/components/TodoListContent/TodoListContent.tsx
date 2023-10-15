import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, FormControlLabel, IconButton, Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useStoreModal } from '../../store/useStoreModal';
import { useSetSelectedTodo, useToggleTodo } from '../../store/useStoreTodos';
import { TTodo } from '../../types/Todos';
import styles from './TodoListContent.styles';

export default function TodoListConent({
  id,
  isCompleted,
  title,
  description,
}: TTodo) {
  const modal = useStoreModal();
  const setSelectedTodo = useSetSelectedTodo();
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
          sx={[styles.todoTitle, isCompleted ? styles.todoCompleted : {}]}
        />
        <Stack direction="row" spacing={0.5} sx={styles.buttonContainerMargin}>
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

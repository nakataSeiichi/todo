import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import { motion } from 'framer-motion';
import animations from '../../utils/animations';
import styles from './TodoList.styles';
import { useStoreTodos } from '../../store/useStoreTodos';

export default function TodoList() {
  // const isLoading = useStoreTodos((store) => store.isLoading);
  const todos = useStoreTodos((store) => store.todos);
  const debounce = useStoreTodos((store) => store.debounce);
  const filteredTodos = useStoreTodos((store) =>
    store.todos.filter((todo) => todo.title.includes(debounce))
  );
  const toggleTodo = useStoreTodos((store) => store.toggleTodo);
  const deleteTodo = useStoreTodos((store) => store.deleteTodo);
  const { presence } = animations;

  return (
    <List sx={styles.list}>
      {todos &&
        (debounce === '' ? todos : filteredTodos).map(
          ({ id, title, isCompleted }) => {
            const labelId = `checkbox-list-label-${id}`;
            return (
              <ListItem
                key={id}
                secondaryAction={
                  <IconButton
                    sx={styles.buttonMargin}
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTodo(id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
                disablePadding
                component={motion.div}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...presence}
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => toggleTodo(id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={isCompleted}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${title}`}
                    sx={isCompleted ? styles.todoCompleted : {}}
                  />
                </ListItemButton>
              </ListItem>
            );
          }
        )}
    </List>
  );
}

import List from '@mui/material/List';
import {
  useFilteredTodos,
  useTodoDebounce,
  useTodoIsLoading,
  useTodos,
} from '../../store/useStoreTodos';
import TodoListContent from '../TodoListContent/TodoListContent';
import styles from './TodoList.styles';
import TodoListLoading from './TodoListLoading';

export default function TodoList() {
  const todos = useTodos();
  const debounce = useTodoDebounce();
  const filteredTodos = useFilteredTodos();
  const todoIsLoading = useTodoIsLoading();

  return (
    <List sx={styles.list}>
      {todoIsLoading ? (
        <TodoListLoading />
      ) : (
        (debounce === '' ? todos : filteredTodos).map(
          ({ id, title, description, isCompleted }) => (
            <TodoListContent
              key={id}
              id={id}
              title={title}
              description={description}
              isCompleted={isCompleted}
            />
          )
        )
      )}
    </List>
  );
}

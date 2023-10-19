import List from '@mui/material/List';
import { useTempTodos, useTodoIsLoading } from '../../store/useStoreTodos';
import TodoListContent from '../TodoListContent/TodoListContent';
import styles from './TodoList.styles';
import TodoListLoading from './TodoListLoading';

export default function TodoList() {
  const filteredTodos = useTempTodos();
  const todoIsLoading = useTodoIsLoading();

  return (
    <List sx={styles.list}>
      {todoIsLoading ? (
        <TodoListLoading />
      ) : (
        filteredTodos.map(({ id, title, description, isCompleted }) => (
          <TodoListContent
            key={id}
            id={id}
            title={title}
            description={description}
            isCompleted={isCompleted}
          />
        ))
      )}
    </List>
  );
}

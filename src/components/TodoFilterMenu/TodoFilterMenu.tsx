import { Chip, Stack } from '@mui/material';
import { v4 as uuid } from 'uuid';
import {
  TTodoFilterTypes,
  todoFiltersTemplate,
  useSetTodoFilters,
  useTodoFilters,
} from '../../store/useStoreTodos';
import styles from './TodoFilterMenu.styles';

export default function TodoFilterMenu() {
  const todoFilters = useTodoFilters();
  const setFilterTodos = useSetTodoFilters();

  function handleSelect(filterType: TTodoFilterTypes) {
    setFilterTodos(filterType);
    // insert other logic below
  }

  /* eslint react/jsx-no-useless-fragment: 0 */
  return (
    <Stack direction="row" spacing={1} sx={styles.filterList}>
      {todoFiltersTemplate
        ? Object.entries(todoFiltersTemplate).map(([key, value]) => (
            <Chip
              key={uuid()}
              label={value.label}
              onClick={() => handleSelect(key as TTodoFilterTypes)}
              sx={styles.filterChips}
              color={key === todoFilters ? 'primary' : 'default'}
            />
          ))
        : null}
    </Stack>
  );
}

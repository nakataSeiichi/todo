import { TTodos } from '../types/Todos';

const localStorageKey = 'todos';

export function getLocalTodos(): TTodos | [] {
  const savedTodos: string | null =
    window.localStorage.getItem(localStorageKey);
  if (typeof savedTodos !== 'string') return [];

  const parsedSavedTodos = JSON.parse(savedTodos);
  return parsedSavedTodos;
}

export function setLocalTodos(todos: TTodos) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(todos));
}

export function filterTodos({ todos, id }: { todos: TTodos; id: string }) {
  const filtered = todos.filter((todo) => todo.id !== id);
  return filtered;
}

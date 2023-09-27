/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuid } from 'uuid';
import { immer } from 'zustand/middleware/immer';
import { TTodo, TTodos } from '../types/Todos';
import { PartialPick } from '../types/Utility';

type TAddTodo = PartialPick<TTodo, 'id'>;
type TEditTodo = Omit<TTodo, 'isCompleted'>;

export type TTodoStore = {
  todos: TTodos;
  todosCount: number;
  todosOnGoing: number;
  todosCompleted: number;
  debounce: string;
  isLoading: boolean;
  selectedTodo: TTodo;
  addTodo: (props: TAddTodo) => void;
  editTodo: (props: TEditTodo) => void;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  emptyTodos: () => void;
  setDebounce: (text: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSelectedTodo: (todo: TTodo) => void;
};

export const useStoreTodos = create<TTodoStore>()(
  persist(
    immer(
      devtools((set) => ({
        todos: [],
        todosCount: 0,
        todosOnGoing: 0,
        todosCompleted: 0,
        debounce: '',
        isLoading: false,
        selectedTodo: {} as TTodo,
        addTodo: ({ id, title, description, isCompleted }) =>
          set(
            (prev) => {
              prev.todos.push({
                id: id ?? uuid(),
                title,
                isCompleted,
                description,
              });
            },
            false,
            'addTodo'
          ),
        editTodo: ({ id, title, description }) =>
          set(
            (prev) => {
              const current = prev.todos.find((todo: TTodo) => todo.id === id);
              if (typeof current !== 'object') return;
              current.title = title;
              current.description = description;
            },
            false,
            'editTodo'
          ),
        deleteTodo: (id) =>
          set(
            (prev) => {
              prev.todos = prev.todos.filter((todo) => todo.id !== id);
            },
            false,
            'deleteTodo'
          ),
        toggleTodo: (id) =>
          set(
            (prev) => {
              prev.todos = prev.todos.map((todo) => {
                if (todo.id === id) {
                  todo.isCompleted = !todo.isCompleted;
                }
                return todo;
              });
              // const current = prev.todos.find((todo: Todo) => todo.id === id);
              // if (typeof current !== 'object') return;
              // current.isCompleted = !current.isCompleted;
            },
            false,
            'toggleTodo'
          ),
        emptyTodos: () =>
          set(
            (prev) => {
              prev.todos = [];
            },
            false,
            'emptyTodos'
          ),
        setDebounce: (text: string) =>
          set((prev) => {
            prev.debounce = text;
            prev.isLoading = false;
          }),
        setIsLoading: (isLoading: boolean) =>
          set((prev) => {
            prev.isLoading = isLoading;
          }),
        setSelectedTodo: (todo: TTodo) =>
          set((prev) => {
            prev.selectedTodo = todo;
          }),
      }))
    ),
    { name: 'todoStore' }
  )
);

// export const useStoreTodos = create<
//   TTodoStore, [
//     ["zustand/persist", StoreType],
//     ["zustand/devtools", StoreType],
//     ['zustand/immer', StoreType]
//   ]
// >(persist(immer(devtools(store)), { name: 'todoStore' }));
export default useStoreTodos;

useStoreTodos.subscribe((newStore, prevStore) => {
  if (newStore.todos !== prevStore.todos) {
    useStoreTodos.setState({
      todosCount: newStore.todos.length,
      todosOnGoing: newStore.todos.filter((todo) => !todo.isCompleted).length,
      todosCompleted: newStore.todos.filter((todo) => todo.isCompleted).length,
    });
  }
});

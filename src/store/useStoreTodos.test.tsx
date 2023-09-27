import { useEffect } from 'react';
import { test, expect, vi, Mock } from 'vitest';
import { render } from '@testing-library/react';
import { v4 as uuid } from 'uuid';
import { useStoreTodos, TTodoStore } from './useStoreTodos';
import { TTodos } from '../types/Todos';

vi.mock('zustand');

type TMockTodoStore = Partial<TTodoStore>;

type TTestComponent = {
  selector: (store: TTodoStore) => TTodos | TMockTodoStore;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effect: Mock<any, any>;
};

function TestComponent({ selector, effect }: TTestComponent) {
  const items = useStoreTodos(selector);

  useEffect(() => effect(items), [effect, items]);

  return null;
}

describe('Test todo store', () => {
  const initialStoreState = useStoreTodos.getState();

  beforeEach(() => {
    useStoreTodos.setState(initialStoreState, true);
  });

  const todo = {
    id: uuid(),
    title: 'test title',
    description: 'test description',
    isCompleted: false,
  };

  test('should return default value at the start', () => {
    const selector = (store: TTodoStore) => store.todos;
    const effect = vi.fn();
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledWith([]);
  });

  test('it should add an item to the store and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        todos: store.todos,
        addTodo: store.addTodo,
      };
    };
    let isTodoCreated = false;

    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      if (!isTodoCreated) {
        items.addTodo({
          ...todo,
        });
        isTodoCreated = true;
      }
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(2);
  });

  test('it should add and edit an item to the store and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        todos: store.todos,
        addTodo: store.addTodo,
        editTodo: store.editTodo,
      };
    };
    let isTodoCreated = false;
    let isTodoEdited = false;
    let currentItems = {} as TTodoStore;

    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      currentItems = items;

      if (!isTodoCreated) {
        items.addTodo({
          ...todo,
        });
        isTodoCreated = true;
      } else if (!isTodoEdited && isTodoCreated) {
        const editedTodo = {
          id: todo.id,
          title: 'edited todo title',
          description: 'edited todo description',
        };
        items.editTodo(editedTodo);
        isTodoEdited = true;
      }
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(3);
    expect(currentItems.todos[0].title).toEqual('edited todo title');
  });

  test('it should add and delete an item and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        todos: store.todos,
        addTodo: store.addTodo,
        deleteTodo: store.deleteTodo,
      };
    };
    const todoId = uuid();
    let isTodoCreated = false;
    let currentItems = {} as TTodoStore;

    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      currentItems = items;
      if (!isTodoCreated) {
        items.addTodo({
          ...todo,
          id: todoId,
        });
        isTodoCreated = true;
      } else if (items.todos.length === 1) {
        items.deleteTodo(todoId);
      }
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(3);
    expect(currentItems.todos).toEqual([]);
  });

  test('it should add and toggle an item and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        todos: store.todos,
        addTodo: store.addTodo,
        toggleTodo: store.toggleTodo,
      };
    };
    const todoId = uuid();
    let isTodoCreated = false;
    let itemToggled = false;
    let currentItems = {} as TTodoStore;

    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      currentItems = items;
      if (!isTodoCreated) {
        items.addTodo({
          ...todo,
          id: todoId,
        });
        isTodoCreated = true;
      } else if (!itemToggled && isTodoCreated) {
        items.toggleTodo(todoId);
        itemToggled = true;
      }
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(3);
    expect(currentItems.todos[0].isCompleted).toEqual(true);
  });

  test('it should add 2 items and delete all items at once and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        todos: store.todos,
        addTodo: store.addTodo,
        emptyTodos: store.emptyTodos,
      };
    };

    let twoItemsCreated = false;
    let isEmptied = false;
    let currentItems = {} as TTodoStore;
    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      currentItems = items;
      if (!twoItemsCreated) {
        items.addTodo({
          ...todo,
          id: uuid(),
          title: `test title ${items.todos.length}`,
          description: `test description ${items.todos.length}`,
        });
        if (items.todos.length === 1) twoItemsCreated = true;
      } else if (!isEmptied && twoItemsCreated) {
        items.emptyTodos();
        isEmptied = true;
      }
      // console.log(items);
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(4);
    expect(currentItems.todos).toEqual([]);
  });

  test('it should set the debounce value and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        debounce: store.debounce,
        setDebounce: store.setDebounce,
      };
    };
    const debounceValue = 'testDebounce';
    let debounceHasValue = false;
    let currentItems = {} as TTodoStore;

    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      currentItems = items;
      if (!debounceHasValue) {
        items.setDebounce(debounceValue);
        debounceHasValue = true;
      }
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(2);
    expect(currentItems.debounce).toEqual(debounceValue);
  });

  test('it should set the isLoading to "true" and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        isLoading: store.isLoading,
        setIsLoading: store.setIsLoading,
      };
    };
    let hasSetToTrue = false;
    let currentItems = {} as TTodoStore;

    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      currentItems = items;
      if (!hasSetToTrue) {
        items.setIsLoading(true);
        hasSetToTrue = true;
      }
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(2);
    expect(currentItems.isLoading).toEqual(true);
  });

  test('it should initialize the value of selectedTodo and rerun the effect', () => {
    const selector = (store: TTodoStore) => {
      return {
        selectedTodo: store.selectedTodo,
        setSelectedTodo: store.setSelectedTodo,
      };
    };
    let isInitialized = false;
    let currentItems = {} as TTodoStore;

    const effect = vi.fn().mockImplementation((items: TTodoStore) => {
      currentItems = items;
      if (!isInitialized) {
        items.setSelectedTodo(todo);
        isInitialized = true;
      }
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(2);
    expect(currentItems.selectedTodo.title).toEqual('test title');
  });
});

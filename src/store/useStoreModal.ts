/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type TStoreModal = {
  confirm: {
    open: boolean;
  };
  alert: {
    open: boolean;
  };
  todoAdd: {
    open: boolean;
  };
  todoEdit: {
    open: boolean;
  };
  todoDelete: {
    open: boolean;
  };
  todoEmpty: {
    open: boolean;
  };
  show: (modalName: TModal) => void;
  hide: (modalName: TModal) => void;
};

type TKeyStoreModal = keyof TStoreModal;
type TModal = Exclude<TKeyStoreModal, 'show' | 'hide'>;

export const useStoreModal = create<TStoreModal>()(
  immer(
    devtools((set) => ({
      confirm: {
        open: false,
      },
      alert: {
        open: false,
      },
      todoAdd: {
        open: false,
      },
      todoEdit: {
        open: false,
      },
      todoDelete: {
        open: false,
      },
      todoEmpty: {
        open: false,
      },
      show: (modalName) =>
        set((prev) => {
          prev[modalName].open = true;
        }),
      hide: (modalName) =>
        set((prev) => {
          prev[modalName].open = false;
        }),
    }))
  )
);

export default useStoreModal;

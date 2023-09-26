import { useEffect } from 'react';
import { test, expect, vi, Mock } from 'vitest';
import { render } from '@testing-library/react';
import { useStoreModal, TStoreModal } from './useStoreModal';

vi.mock('zustand');

type TestConfirm = Pick<TStoreModal, 'confirm' | 'hide' | 'show'>;
type TestComponentType = {
  selector: (store: TStoreModal) => boolean | TStoreModal | TestConfirm;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  effect: Mock<any, any>;
};

function TestComponent({ selector, effect }: TestComponentType) {
  const items = useStoreModal(selector);

  useEffect(() => effect(items), [effect, items]);

  return null;
}

describe('Test todo modal', () => {
  const initialStoreState = useStoreModal.getState();

  beforeEach(() => {
    useStoreModal.setState(initialStoreState, true);
  });

  test('should return default value at the start', () => {
    const selector = (store: TStoreModal) => store.confirm.open;
    const effect = vi.fn();
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledWith(false);
  });

  test('should show then hide the modal and rerun the effect', () => {
    const selector = ({ confirm, show, hide }: TestConfirm) => {
      return {
        confirm: {
          open: confirm.open,
        },
        show,
        hide,
      };
    };
    let shown = false;
    let hidden = false;
    let currentItems = {} as TStoreModal;
    const effect = vi.fn().mockImplementation((items: TStoreModal) => {
      currentItems = items;
      if (!shown) {
        items.show('confirm');
        shown = true;
      } else if (shown && !hidden) {
        items.hide('confirm');
        hidden = true;
      }
      //   console.log(items);
    });
    render(<TestComponent selector={selector} effect={effect} />);
    expect(effect).toHaveBeenCalledTimes(3);
    expect(currentItems.confirm.open).toEqual(false);
  });
});

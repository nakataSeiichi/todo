import WarningIcon from '@mui/icons-material/Warning';
import { useStoreModal } from '../../store/useStoreModal';
import Modal from '../Modal/ModalBase';
import { useStoreTodos } from '../../store/useStoreTodos';
import { TTodo } from '../../types/Todos';

export default function TodoDeleteModal() {
  const modal = useStoreModal();
  const id = useStoreTodos((store) => store.selectedTodo.id);
  const deleteTodo = useStoreTodos((store) => store.deleteTodo);
  const setSelectedTodo = useStoreTodos((store) => store.setSelectedTodo);

  const handleClose = () => {
    modal.hide('todoDelete');
    setSelectedTodo({} as TTodo);
  };

  const handleSubmit = () => {
    deleteTodo(id);
    setSelectedTodo({} as TTodo);
    handleClose();
  };

  return (
    <Modal
      open={modal.todoDelete.open}
      dialogIcon={<WarningIcon color="warning" fontSize="large" />}
      dialogTitle="Delete"
      dialogContentText="Are you sure? Click Confirm to delete."
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    />
  );
}

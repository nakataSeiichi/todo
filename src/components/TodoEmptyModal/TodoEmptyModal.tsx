import WarningIcon from '@mui/icons-material/Warning';
import { useStoreModal } from '../../store/useStoreModal';
import Modal from '../Modal/ModalBase';
import { useEmptyTodos } from '../../store/useStoreTodos';

export default function TodoEmptyModal() {
  const modal = useStoreModal();
  const emptyTodos = useEmptyTodos();

  const handleClose = () => {
    modal.hide('todoEmpty');
  };

  const handleSubmit = () => {
    emptyTodos();
    handleClose();
  };

  return (
    <Modal
      open={modal.todoEmpty.open}
      dialogIcon={<WarningIcon color="warning" fontSize="large" />}
      dialogTitle="Delete All"
      dialogContentText="Are you sure? Click Confirm to delete."
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    />
  );
}

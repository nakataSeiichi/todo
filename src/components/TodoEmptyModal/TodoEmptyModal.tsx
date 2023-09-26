import WarningIcon from '@mui/icons-material/Warning';
import { useStoreModal } from '../../store/useStoreModal';
import Modal from '../Modal/ModalBase';
import { useStoreTodos } from '../../store/useStoreTodos';

export default function TodoEmptyModal() {
  const modal = useStoreModal();
  const emptyTodos = useStoreTodos((store) => store.emptyTodos);

  const handleClose = () => {
    modal.hide('alert');
  };

  const handleSubmit = () => {
    emptyTodos();
    handleClose();
  };

  return (
    <Modal
      open={modal.alert.open}
      dialogIcon={<WarningIcon color="warning" fontSize="large" />}
      dialogTitle="Delete All"
      dialogContentText="Are you sure? Click Confirm to delete."
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    />
  );
}

import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import { useStoreModal } from '../../store/useStoreModal';
import Modal from '../Modal/ModalBase';
import {
  useEditTodo,
  useSetSelectedTodo,
  useSelectedTodo,
} from '../../store/useStoreTodos';
import { TTodo } from '../../types/Todos';

export default function TodoEditModal() {
  const modal = useStoreModal();
  const selectedTodo = useSelectedTodo();
  const editTodo = useEditTodo();
  const setSelectedTodo = useSetSelectedTodo();

  const handleClose = () => {
    modal.hide('todoEdit');
    setSelectedTodo({} as TTodo);
  };
  const validationSchema = Yup.object({
    title: Yup.string().trim().required('Please enter something here...'),
  });
  const formik = useFormik({
    initialValues: {
      id: selectedTodo.id,
      title: selectedTodo.title,
      description: selectedTodo.description,
    },
    validationSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async ({ id, title, description }) => {
      editTodo({ id, title, description });
      handleClose();
    },
  });
  const { handleSubmit, handleChange, errors, touched, values } = formik;

  return (
    <Modal
      open={modal.todoEdit.open}
      dialogIcon={<EditIcon color="primary" fontSize="large" />}
      dialogTitle="Edit Todo"
      dialogContentText="Click Confirm to save."
      handleSubmit={handleSubmit}
      handleClose={handleClose}
    >
      <TextField
        autoFocus
        margin="dense"
        id="todo"
        name="title"
        label="Title"
        type="input-title"
        fullWidth
        variant="filled"
        value={values.title}
        onChange={handleChange}
        error={touched.title && Boolean(errors.title)}
        helperText={touched.title && errors.title}
      />
      <TextField
        multiline
        maxRows={4}
        margin="dense"
        id="description"
        name="description"
        label="Description (optional)"
        type="input-description"
        fullWidth
        variant="filled"
        value={values.description}
        onChange={handleChange}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description && errors.description}
      />
    </Modal>
  );
}

import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import AddIcon from '@mui/icons-material/Add';
import { useStoreModal } from '../../store/useStoreModal';
import Modal from '../Modal/ModalBase';
import { useAddTodo } from '../../store/useStoreTodos';

export default function TodoAddModal() {
  const modal = useStoreModal();
  const addTodo = useAddTodo();

  const handleClose = () => {
    modal.hide('todoAdd');
  };
  const validationSchema = Yup.object({
    title: Yup.string().trim().required('Please enter something here...'),
  });
  const formik = useFormik({
    initialValues: {
      id: '',
      title: '',
      description: '',
      isCompleted: false,
    },
    validationSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async ({ title, description, isCompleted }, { resetForm }) => {
      addTodo({ title, description, isCompleted });
      resetForm();
      handleClose();
    },
  });
  const { handleSubmit, handleChange, errors, touched, values } = formik;

  return (
    <Modal
      open={modal.todoAdd.open}
      dialogIcon={<AddIcon color="primary" fontSize="large" />}
      dialogTitle="Add Todo"
      dialogContentText="Enter your task details below. Click Confirm to save."
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

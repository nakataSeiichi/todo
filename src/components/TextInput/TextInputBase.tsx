import { styled } from '@mui/material/styles';
import {
  TextField as Input,
  StandardTextFieldProps,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
} from '@mui/material';

type ExtendedTextFieldProps =
  | StandardTextFieldProps
  | FilledTextFieldProps
  | OutlinedTextFieldProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any;
const CustomTextField = styled(Input)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(),
  },
  'label ': {
    // marginTop: '-0.25rem!important',
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
    // fontSize: 16,
    '&:focus': {
      borderColor: theme.palette.secondary.main,
    },
  },
}));

function CustomInput(params: ExtendedTextFieldProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <CustomTextField {...params} />;
}

export default CustomInput;

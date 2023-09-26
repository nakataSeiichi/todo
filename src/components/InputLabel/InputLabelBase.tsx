import { styled } from '@mui/material/styles';
import { InputLabel, InputLabelProps } from '@mui/material';

const StyledInputLabel = styled(InputLabel)(() => ({
  color: '#000000',
  opacity: '86%',
  fontWeight: 400,
}));

function CustomInputLabel(params: InputLabelProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledInputLabel {...params} />;
}

export default CustomInputLabel;

import { styled } from '@mui/material/styles';
import { Button, ButtonProps } from '@mui/material';

const StyledButton = styled(Button)(() => ({
  color: '#FFFFFF',
  height: '100%!important',
}));

function CustomButton(params: ButtonProps) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <StyledButton {...params} />;
}
export default CustomButton;

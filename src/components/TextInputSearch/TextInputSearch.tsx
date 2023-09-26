/* eslint-disable react/jsx-props-no-spreading */
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import TextInputBase from '../TextInput/TextInputBase';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TextInputSearch(props: any) {
  const { isLoading, strict, ...rest } = props;

  return (
    <TextInputBase
      {...rest}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {isLoading ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <SearchIcon />
            )}
          </InputAdornment>
        ),
      }}
      disabled={strict ? Boolean(isLoading) : false}
    />
  );
}

export default TextInputSearch;

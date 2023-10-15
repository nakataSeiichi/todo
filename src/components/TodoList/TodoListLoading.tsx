import { Skeleton } from '@mui/material';
import { v4 as uuid } from 'uuid';

export default function TodoListLoading() {
  return (
    <>
      {Array(5)
        .fill('')
        .map(() => (
          <Skeleton key={uuid()} height="5rem" />
        ))}
    </>
  );
}

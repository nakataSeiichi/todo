const styles = {
  filterList: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    // background: '#f7f7f7',
    // border: '1px solid #f7f7f7',
    borderRadius: '10px',
    marginTop: '0.25rem',
    overflowX: 'auto',
    width: '100%',
    '&::-webkit-scrollbar': {
      height: '8px',
      width: '4px',
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#eee',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      background: '#bbb',
    },
  },
  filterAdd: {
    position: 'sticky',
    zIndex: 5,
    left: 0,
    background: '#fffff',
    backdropFilter: 'blur(10px)',
    paddingRight: '0.5rem',
    borderRadius: '10px',
  },
  filterChips: {
    marginLeft: '8px',
    marginRight: '8px',
    marginBottom: '8px',
    cursor: 'pointer',
  },
};

export default styles;

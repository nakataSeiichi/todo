const styles = {
  buttonContainerMargin: {
    marginLeft: 'auto',
    marginRight: '1rem',
    height: 'fit-content',
  },
  todoTitle: {
    width: '100%',
    // maxWidth: '200px',
  },
  todoCompleted: {
    textDecoration: 'line-through',
    opacity: 0.65,
  },
  accordionSX: {
    // overFlow: 'hidden',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  },
  descriptionContainer: {
    opacity: 0.75,
  },
  descriptionText: {
    whiteSpace: 'pre-line',
  },
};

export default styles;

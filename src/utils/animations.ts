const animations = {
  presence: {
    initial: {
      x: -10,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
  },
  component: {
    whileTap: {
      scale: 0.9,
    },
  },
};

export default animations;

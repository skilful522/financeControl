import makeStyles from "@material-ui/core/styles/makeStyles";

const useProductStyles = makeStyles(() => ({
  wrapper: {
    height: '100%',
  },
  hidden: {
    display: 'none',
  },
  icon: {
    width: 40,
    height: 40,
    cursor: 'pointer',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    position: 'absolute',
    right: 0,
  },
}));

export default useProductStyles;

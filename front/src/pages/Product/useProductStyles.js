import makeStyles from "@material-ui/core/styles/makeStyles";

const useProductStyles = makeStyles(() => ({
  wrapper: {
    height: '100%',
    padding: '0px 20px',
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

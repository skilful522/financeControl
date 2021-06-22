import { makeStyles } from "@material-ui/core";

const useProductImage = makeStyles(() => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
  image: {
    color: "transparent",
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    textAlign: 'center',
    textIndent: '10000px',
  },
}));

export default useProductImage;

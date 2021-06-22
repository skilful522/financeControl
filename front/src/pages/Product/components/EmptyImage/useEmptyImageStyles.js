import { makeStyles } from "@material-ui/core";

const useEmptyImageStyles = makeStyles(() => ({
  imageIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    height: 300,
  },
}));

export default useEmptyImageStyles;

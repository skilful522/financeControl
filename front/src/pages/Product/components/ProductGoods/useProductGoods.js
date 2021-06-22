import { makeStyles } from "@material-ui/core";

const useProductGoods = makeStyles(() => ({
  wrapper: {
    padding: 20,
    border: '1px solid black',
    height: 'max-content',
    width: 300,
  },
  list: {
    margin: 10,
  },
  item: {
    margin: 10,
  },
}));

export default useProductGoods;

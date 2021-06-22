import useProductGoods from "./useProductGoods";

const ProductGoods = ({ goods }) => {
  const classes = useProductGoods();

  return (
    <div className={classes.wrapper}>
      <h3>Полезные свойства на 100г</h3>
      <ul className={classes.list}>
        {goods.map(({ name, value }) => (
          <li className={classes.item}>
            {name}: {value} {name !== 'Калории' && 'г'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductGoods;

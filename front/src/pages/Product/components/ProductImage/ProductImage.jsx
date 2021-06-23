import React from "react";

import useProductImage from "./useProductImage";

const ProductImage = ({ image }) => {
  const classes = useProductImage();

  return (
    <div className={classes.wrapper}>
      <img className={classes.image} src={image} alt="Изображение продукта" />
    </div>
  );
};

export default ProductImage;

import React, { useEffect, useState } from "react";

import withRouter from "react-router-dom/es/withRouter";

import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useDispatch } from "react-redux";

import { getProduct } from "../../services/api/products";

import { showNotification } from "../../actions/notification";

import { NOTIFICATION_TYPES } from "../../constants";

import { addProductImageApi, editProductImageApi, getProductImageApi } from "../../services/api/productImage";

import useProductStyles from "./useProductStyles";
import ProductGoods from "./components/ProductGoods";
import ProductImage from "./components/ProductImage";
import EmptyImage from "./components/EmptyImage";

const Product = ({ match: { params: { id } } }) => {
  const [product, setProduct] = useState(null);
  const [productImage, setProductImage] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isValidImage, setIsValidImage] = useState(false);
  const classes = useProductStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (photo) {
      const text = !productImage ? `Изображение для ${product.name} добавлено`: 'Изображение обновлено';
      const reader = new FileReader();

      reader.readAsDataURL(photo);
      reader.onloadend = () => {
        const body = { _id: productImage?._id, productId: product.id, data: reader.result };
        const api = productImage ? editProductImageApi : addProductImageApi;

        api(body)
          .then(() => dispatch(showNotification({ text, type: NOTIFICATION_TYPES.success })))
          .catch(() => dispatch(showNotification({ text: 'Ошибка во время загрузки изображения на сервер', type: NOTIFICATION_TYPES.error })))
          .finally(() => {
            setPhoto(null);
            setIsValidImage(false);
          });
      };
    }
  }, [productImage, photo]);

  const handlePhoto = event => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    !product && getProduct(id)
      .then(data => {
        setProduct(data);
      });

    if (!isValidImage && !photo) {
      product && getProductImageApi(product.id)
        .then(image => image && setProductImage(image))
        .catch(() => dispatch(showNotification({ text: 'Ошибка во время получения изображения', type: NOTIFICATION_TYPES.error })))
        .finally(() => {
          setIsValidImage(true);
        });
    }
  }, [photo, product, isValidImage]);

  return (
    <Grid container justify="center" alignItems="center" spacing={16} className={classes.wrapper}>
      {product ? (
        <>
          <Grid container justify="center" item xs={12}>
            <h2>{product.name}</h2>
          </Grid>
          {isValidImage ? (
            <Grid item className={classes.imageWrapper}>
              {productImage ? <ProductImage image={productImage.data} /> : <EmptyImage />}
              <input
                className={classes.hidden}
                type="file"
                accept=".png, .jpg, .jpeg"
                name="photo"
                id="photo"
                onChange={handlePhoto}
              />
              <label htmlFor="photo" className={classes.image}>
                <Tooltip title={product.photo ? 'Обновить изображение': 'Добавить изображение'}>
                  <AddAPhotoIcon className={classes.icon} />
                </Tooltip>
              </label>
            </Grid>
          ) : <CircularProgress />}
          <Grid item container justify="center">
            <ProductGoods
              goods={[{ name: 'Калории', value: product.calories },
                { name: 'Белки', value: product.protein },
                { name: 'Жиры', value: product.fat },
                { name: 'Углеводы', value: product.carbs },
              ]} />
          </Grid>
        </>
      ): <CircularProgress />}
    </Grid>
  );
};

export default withRouter(Product);

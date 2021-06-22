import React, { useEffect, useState } from "react";

import withRouter from "react-router-dom/es/withRouter";

import Grid from "@material-ui/core/Grid";
import { Tooltip } from "@material-ui/core";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CircularProgress from '@material-ui/core/CircularProgress';

import { keys } from "ramda";

import { useDispatch } from "react-redux";

import { getProduct } from "../../services/api/products";

import { editPrivateProductApi } from "../../services/api/privateProduct";

import { showNotification } from "../../actions/notification";

import { NOTIFICATION_TYPES } from "../../constants";

import useProductStyles from "./useProductStyles";
import ProductGoods from "./components/ProductGoods";
import ProductImage from "./components/ProductImage";
import EmptyImage from "./components/EmptyImage";

const Product = ({ match: { params: { id } } }) => {
  const [product, setProduct] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [isValidData, setIsValidData] = useState(false);
  const classes = useProductStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    if (photo) {
      const formData = new FormData();
      const text = product.photo ? `Изображение для ${product.name} добавлено`: 'Изображение обновлено';

      keys(product).forEach(key => {
        formData.append(key, product[key]);
      });
      formData.append('photo', photo);
      editPrivateProductApi(formData, { "Content-Type": "multipart/form-data" })
        .then(() => dispatch(showNotification({ text, type: NOTIFICATION_TYPES.success })))
        .catch(() => dispatch(showNotification({ text: 'Ошибка во время загрузки изображения', type: NOTIFICATION_TYPES.error })))
        .finally(() => setIsValidData(false));
    }
  }, [photo]);

  const handlePhoto = event => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    if (!isValidData) {
      getProduct(id)
        .then(data => {
          setProduct(data);
          setIsValidData(true);
        });
    }
  }, [isValidData]);

  return (
    <Grid container justify="center" alignItems="center" spacing={16} className={classes.wrapper}>
      {product ? (
        <>
          <Grid container justify="center" item xs={12}>
            <h2>{product.name}</h2>
          </Grid>
          {isValidData ? (
            <Grid item className={classes.imageWrapper}>
              {product.photo ? <ProductImage image={product.photo} /> : <EmptyImage />}
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

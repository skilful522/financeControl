import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Grid from "@material-ui/core/Grid";
import React from "react";

import useEmptyImageStyles from "./useEmptyImageStyles";

const EmptyImage = () => {
  const classes = useEmptyImageStyles();

  return (
    <Grid container direction="column" alignItems="center">
      <AddAPhotoIcon className={classes.imageIcon} />
      <p>Для этого продукта пока ещё нет фото, но Вы можете добавить</p>
    </Grid>
  );
};

export default EmptyImage;

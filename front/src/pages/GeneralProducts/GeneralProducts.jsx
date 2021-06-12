import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { isEmpty } from "ramda";

import { getProductsApi } from "../../services/api/products";
import { showNotification } from "../../actions/notification";
import { NOTIFICATION_TYPES } from "../../constants";
import useCommonStyles from "../../styles/useCommonStyles";
import EnhancedTable from "../../components/SortableTable/EnhancedTable";
import { headCells } from "../Dashboard/Dashboard";

const GeneralProducts = () => {
  const [generalProducts, setGeneralProducts] = useState([]);
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();

  useEffect(() => {
    getProductsApi()
      .then(fetchedProducts => setGeneralProducts(fetchedProducts))
      .catch(error => dispatch(showNotification({ text: error, type: NOTIFICATION_TYPES.error })));
  },[dispatch]);

  return !isEmpty(generalProducts) && (
    <div className={commonStyles.tableWrapper}>
      <EnhancedTable
        tableTitle="Продукты всех пользователей"
        data={generalProducts}
        headCells={headCells}
      />
    </div>
  );
};

export default GeneralProducts;

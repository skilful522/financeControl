import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";

import { isEmpty } from "ramda";

import { getProductsApi } from "../../services/api/products";
import { showNotification } from "../../actions/notification";
import { NOTIFICATION_TYPES } from "../../constants";
import useCommonStyles from "../../styles/useCommonStyles";
import EnhancedTable from "../../components/SortableTable/EnhancedTable";
import { headCells } from "../Dashboard/Dashboard";
import { getUsersAmountApi } from "../../services/api/user";

const GeneralProducts = () => {
  const [generalProducts, setGeneralProducts] = useState([]);
  const [usersAmount, setUsersAmount] = useState(null);
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();

  useEffect(() => {
    Promise.all([getProductsApi(), getUsersAmountApi()])
      .then(([fetchedProducts, amount]) => {
        console.log(fetchedProducts, amount);
        setGeneralProducts(fetchedProducts);
        setUsersAmount(amount);
      })
      .catch(error => dispatch(showNotification({ text: error, type: NOTIFICATION_TYPES.error })));
  },[dispatch]);

  return !isEmpty(generalProducts) && (
    <div className={commonStyles.tableWrapper}>
      <EnhancedTable
        tableTitle={`Продукты всех пользователей. Пользователей: ${usersAmount}. Продуктов: ${generalProducts.length}`}
        data={generalProducts}
        headCells={headCells}
      />
    </div>
  );
};

export default GeneralProducts;

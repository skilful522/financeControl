import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { find , pick, propEq } from "ramda";

import {
  createPrivateProductApi,
  deletePrivateProductApi,
  editPrivateProductApi,
  getPrivateProductsApi,
} from '../../services/api/privateProduct';
import { hideLoaderAction, showLoaderAction } from '../../slices/loaderSlice';

import FormDialog from '../../components/FormDialog';

import EnhancedTable from '../../components/SortableTable';

import { showNotification } from '../../actions/notification';

import useCommonStyles from "../../styles/useCommonStyles";

import { useDashboardStyles } from './useDashboardStyles';
import { privateProductSchema } from './validationSchema';

export const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Название продукта (100g serving)',
  },
  { id: 'calories', numeric: true, disablePadding: false, label: 'Калории' },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Белки (г)',
  },
  { id: 'fat', numeric: true, disablePadding: false, label: 'Жиры (г)' },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Углеводы (г)',
  },
];

const MODAL_MODS = {
  create: 'create',
  edit: 'edit',
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isDisplayDialog, setIsDisplayDialog] = useState(false);
  const [product, setProduct] = useState();
  const classes = useDashboardStyles();
  const commonStyles = useCommonStyles();
  const [privateProducts, setPrivateProducts] = useState([]);
  const [isValidData, setIsValidData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalMode, setModalMode] = useState(MODAL_MODS.create);
  const isCreateMode = useMemo(() => modalMode === MODAL_MODS.create, [modalMode]);

  const initialValues = useMemo(
    () =>
      isCreateMode
        ? { name: '', calories: '', protein: '', fat: '', carbs: '' }
        : pick(['name', 'calories', 'protein', 'fat', 'carbs'], product),
    [isCreateMode, product],
  );

  const title = useMemo(
    () =>
      modalMode === MODAL_MODS.create
        ? 'Добавление продукта'
        : 'Редактирование продукта',
    [modalMode],
  );

  const handleOpenModal = useCallback(() => {
    setModalMode(MODAL_MODS.create);
    setIsDisplayDialog(true);
  }, []);

  const handleOnEdit = useCallback(
    (selectedProduct) => () => {
      setModalMode(MODAL_MODS.edit);
      const selected = privateProducts.find(({ name }) =>
        selectedProduct.includes(name),
      );

      setProduct(selected);
      setIsDisplayDialog(true);
    },
    [privateProducts],
  );

  const handleDeleteProduct = useCallback(
    (selectedValues) => {
      const selectedProducts = privateProducts.filter(({ name }) =>
        selectedValues.includes(name),
      );
      const selectedIds = selectedProducts.map(({ _id }) => _id);

      deletePrivateProductApi({ ids: selectedIds }).then(({ message }) => {
        dispatch(
          showNotification({
            text: message,
          }),
        );
        setIsValidData(false);
      });
    },
    [privateProducts],
  );

  const handleSubmit = useCallback((formValues) => {
    const api = isCreateMode ? createPrivateProductApi : editPrivateProductApi;
    const text = isCreateMode ? `${initialValues.name} добавлен в таблицу` : `${initialValues.name} изменён`;

    const { _id } = !isCreateMode && initialValues && find(propEq('name', initialValues.name))(privateProducts);

    const params = isCreateMode ? formValues : { ...formValues, _id };

    api(params)
      .then(() => {
        dispatch(
          showNotification({ text }),
        );
        setIsValidData(false);
      })
      .finally(() => handleClose());
  }, [initialValues, dispatch, isCreateMode, privateProducts]);

  const handleClose = useCallback(() => setIsDisplayDialog(false), []);

  useEffect(() => {
    if (!isValidData) {
      dispatch(showLoaderAction());
      getPrivateProductsApi()
        .then((data) => setPrivateProducts(data))
        .finally(() => {
          dispatch(hideLoaderAction());
          setIsValidData(true);
          dispatch(hideLoaderAction());
          setIsLoaded(true);
        });
    }
  }, [dispatch, isValidData]);

  return (
    isLoaded && (
      <div className={commonStyles.tableWrapper}>
        <EnhancedTable
          data={privateProducts}
          onAdd={handleOpenModal}
          onEdit={handleOnEdit}
          onDelete={handleDeleteProduct}
          headCells={headCells}
        />
        <FormDialog
          onSubmit={handleSubmit}
          isDisplay={isDisplayDialog}
          handleClose={handleClose}
          title={title}
          formConfig={{
            initialValues,
            validationSchema: privateProductSchema,
            textFieldsConfig: {
              name: {
                placeholder: 'Введите название продукта',
                className: classes.textFieldWrapper,
              },
              calories: {
                placeholder: 'Введите количество калорий',
                className: classes.textFieldWrapper,
              },
              protein: {
                placeholder: 'Введите количество белков',
                className: classes.textFieldWrapper,
              },
              fat: {
                placeholder: 'Введите количество жиров',
                className: classes.textFieldWrapper,
              },
              carbs: {
                placeholder: 'Введите количество углеводов',
                className: classes.textFieldWrapper,
              },
            },
          }}
        />
      </div>
    )
  );
};

export default Dashboard;

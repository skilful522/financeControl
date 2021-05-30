import { useCallback, useEffect, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { omit, pick } from 'ramda';

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

import { useDashboardStyles } from './useDashboardStyles';
import { privateProductSchema } from './validationSchema';

const headCells = [
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
  const [privateProducts, setPrivateProducts] = useState([]);
  const [isValidData, setIsValidData] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalMode, setModalMode] = useState(MODAL_MODS.create);

  const initialValues = useMemo(
    () =>
      !product
        ? { name: '', calories: '', protein: '', fat: '', carbs: '' }
        : pick(['name', 'calories', 'protein', 'fat', 'carbs'], product),
    [product],
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

  const handleSubmit = (formValues) => {
    editPrivateProductApi(product);
    // createPrivateProductApi(formValues)
    //   .then(() => {
    //     dispatch(
    //       showNotification({ text: `${formValues.name} добавлен в таблицу` }),
    //     );
    //     setIsValidData(false);
    //   })
    //   .finally(() => handleClose());
  };

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
  }, [isValidData]);

  return (
    isLoaded && (
      <div className={classes.tableWrapper}>
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

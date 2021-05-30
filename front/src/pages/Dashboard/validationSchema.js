import * as Yup from 'yup';

export const privateProductSchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  calories: Yup.string().required('Обязательное поле'),
  protein: Yup.string().required('Обязательное поле'),
  fat: Yup.string().required('Обязательное поле'),
  carbs: Yup.string().required('Обязательное поле'),
  price: Yup.number('Тут должно быть число').positive(),
});

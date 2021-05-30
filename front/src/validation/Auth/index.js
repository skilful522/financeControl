import * as Yup from 'yup';

export const registrySchema = Yup.object({
  name: Yup.string().required('Обязательное поле'),
  surname: Yup.string().required('Обязательное поле'),
  email: Yup.string().email().required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Должно быть 6 символов или больше')
    .required('Обязательное поле'),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required('Обязательное поле'),
  password: Yup.string()
    .min(6, 'Должно быть 6 символов или больше')
    .required('Обязательное поле'),
});

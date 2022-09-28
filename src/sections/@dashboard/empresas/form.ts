import * as Yup from 'yup';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  name: string,
  contactName: string,
  email: string,
};

export const defaultValues = {
  name: '',
  contactName: '',
  email: '',
};

export const FormSchema = Yup.object().shape({
  name: Yup.string().required('Nome da empresa é obrigatório'),
  contactName: Yup.string().required('Nome do contato é obrigatório'),
  email: Yup.string().required('Email da empresa é obrigatório'),
});

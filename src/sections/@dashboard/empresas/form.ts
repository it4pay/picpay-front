import * as Yup from 'yup';

// ----------------------------------------------------------------------

export type FormValuesProps = {
  name: string,
  contact: string,
  email: string,
  cnpj: string,
};

export const defaultValues = {
  name: '',
  contact: '',
  email: '',
  cnpj: '',
};

export const FormSchema = Yup.object().shape({
  name: Yup.string().required('Nome da empresa é obrigatório'),
  contact: Yup.string().required('Nome do contato é obrigatório'),
  email: Yup.string().required('Email da empresa é obrigatório'),
  cnpj: Yup.string().required('CNPJ da empresa é obrigatório'),
});

import * as Yup from 'yup';

// ----------------------------------------------------------------------

export type FormGrupoValuesProps = {
  name: string,
  contact: string,
  email: string,
  telefone: string,
  picpay?: boolean,
  taxaPicpay?: string,
  deposito?: boolean,
  taxaDeposito?: string,
  whatsapp?: boolean,
  taxaWhatsapp?: string,
  cartao?: boolean,
  taxaCartao?: string,
  voucher?: boolean,
  taxaVoucher?: string,
};

export const defaultValuesGrupos = {
  name: '',
  contact: '',
  email: '',
  telefone: '',
  picpay: false,
  taxaPicpay: '',
  deposito: false,
  taxaDeposito: '',
  whatsapp: false,
  taxaWhatsapp: '',
  cartao: false,
  taxaCartao: '',
  voucher: false,
  taxaVoucher: '',

};

export const FormSchemaGrupo = Yup.object().shape({
  groupName: Yup.string().required('Nome da empresa é obrigatório'),
  contact: Yup.string().required('Nome do contato é obrigatório'),
  email: Yup.string().required('Email da empresa é obrigatório'),
  telefone: Yup.string().required('CNPJ da empresa é obrigatório'),
  endereco: Yup.string().required('Endereço da empresa é obrigatório'),
});

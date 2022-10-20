import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {FormProvider, RHFTextField} from "../../../components/hook-form";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "notistack";
import {Box, Grid, Paper} from "@mui/material";
import {useEffect} from "react";

import {FormValuesProps, FormSchema, defaultValues} from "./form";
import axiosInstance from "../../../utils/axios";
import {useRouter} from "next/router";

interface Props {
  company?: { id: string, name: string, contact: string, email: string, cnpj: string };
  type: 'create' | 'edit';
}

export default function FormEmpresa(props: Props) {
  const {enqueueSnackbar} = useSnackbar();

  const {push} = useRouter();

  const methods = useForm<FormValuesProps>({
    mode: "onTouched",
    resolver: yupResolver(FormSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    formState: {isSubmitting}
  } = methods;

  useEffect(() => {
    if (props.company) {
      reset({
        name: props.company.name,
        contact: props.company.contact,
        email: props.company.email,
        cnpj: props.company.cnpj
      });
    }
  }, [reset, props.company])

  const onSubmit = async (data: FormValuesProps) => {

    try {
      if (props.type === 'edit') {
        if (props.company) {
          await axiosInstance.put(`/companies/${props.company.id}`, data);
          enqueueSnackbar('Empresa atualizada com sucesso', {variant: 'success'});
          push('/dashboard/empresas');
          return;
        }
      }

      await axiosInstance.post('/companies', data);
      enqueueSnackbar('Empresa criada com sucesso', {variant: 'success'});
      push('/dashboard/empresas');

    } catch (error) {
      console.log(error);
      if (props.type === 'create') {
        enqueueSnackbar('Erro ao criar empresa', {variant: 'error'});
        return;
      }
      enqueueSnackbar('Erro ao atualizar empresa', {variant: 'error'});
    }
  };

  return (
    <>
      <Box component={Paper} maxWidth={'712px'} p={2.5} variant="outlined">
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>

            <Grid container rowSpacing={3} columnSpacing={2}
            >
              <Grid item xs={12} md={6}>
                <RHFTextField name={'name'} label={'Empresa'} variant={'outlined'}/>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField name={'contact'} label={'Nome do contato'} variant={'outlined'}/>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField name={'email'} label={'E-mail'} variant={'outlined'}/>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField name={'cnpj'} label={'CNPJ'} variant={'outlined'}/>
              </Grid>

              <Grid item xs={12} justifyContent={'flex-end'} display={'flex'}>
                <LoadingButton
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{margin: '10px 0'}}
                  loading={isSubmitting}
                >
                  {props.type === 'create' ? 'Cadastrar' : 'Salvar'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>

        </FormProvider>
      </Box>
    </>
  );
}
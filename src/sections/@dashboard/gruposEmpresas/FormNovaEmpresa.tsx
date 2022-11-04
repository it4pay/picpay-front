import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {FormProvider, RHFTextField, RHFCheckbox} from "../../../components/hook-form";
import {LoadingButton} from "@mui/lab";
// import {useSnackbar} from "notistack";
import {Box, Grid, Paper} from "@mui/material";
// import {useEffect} from "react";

import {FormGrupoValuesProps, FormSchemaGrupo, defaultValuesGrupos} from "./form";
// import axiosInstance from "../../../utils/axios";
// import {useRouter} from "next/router";

interface Props {
  company?: { id: string, name: string, contact: string, email: string, telefone: string };
  type: 'create' | 'edit';
}

export default function FormNovaEmpresa(props: Props) {
  // const {enqueueSnackbar} = useSnackbar();
  //
  // const {push} = useRouter();

  const methods = useForm<FormGrupoValuesProps>({
    mode: "onTouched",
    resolver: yupResolver(FormSchemaGrupo),
    defaultValues: defaultValuesGrupos
  });

  const {
    // reset,
    handleSubmit,
    formState: {isSubmitting}
  } = methods;

  // useEffect(() => {
  //   if (props.company) {
  //     reset({
  //       name: props.company.name,
  //       contact: props.company.contact,
  //       email: props.company.email,
  //       telefone: props.company.telefone
  //     });
  //   }
  // }, [reset, props.company])

  const onSubmit = async (data: FormGrupoValuesProps) => {
    console.log(data);

    // try {
    //   if (props.type === 'edit') {
    //     if (props.company) {
    //       await axiosInstance.put(`/companies/${props.company.id}`, data);
    //       enqueueSnackbar('Empresa atualizada com sucesso', {variant: 'success'});
    //       push('/dashboard/gruposEmpresas');
    //       return;
    //     }
    //   }
    //
    //   await axiosInstance.post('/companies', data);
    //   enqueueSnackbar('Empresa criada com sucesso', {variant: 'success'});
    //   push('/dashboard/gruposEmpresas');
    //
    // } catch (error) {
    //   console.log(error);
    //   if (props.type === 'create') {
    //     enqueueSnackbar('Erro ao criar empresa', {variant: 'error'});
    //     return;
    //   }
    //   enqueueSnackbar('Erro ao atualizar empresa', {variant: 'error'});
    // }
  };

  return (
    <>
      <Box component={Paper} maxWidth={'712px'} p={2.5} elevation={5} sx={{borderRadius: '16px', mt: 10}}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>

            <Grid container rowSpacing={3} columnSpacing={2}>
              <Grid item xs={12} md={6}>
                <RHFTextField name={'razao'} label={'Razão Social'} variant={'outlined'}/>
              </Grid>

              <Grid item xs={12} md={6}>
                <RHFTextField name={'cnpj'} label={'CNPJ'} variant={'outlined'}/>
              </Grid>


              <Grid item xs={12} justifyContent={'flex-end'} display={'flex'}>
                <LoadingButton
                  color="primary"
                  type="submit"
                  variant="contained"
                  sx={{margin: '30px 0 5px 0'}}
                  loading={isSubmitting}
                >
                  {props.type === 'create' ? 'Adicionar empresa' : 'Salvar'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>

        </FormProvider>
      </Box>
    </>
  );
}
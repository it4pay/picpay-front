import {yupResolver} from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import {FormProvider, RHFTextField} from "../../../components/hook-form";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "notistack";
import {Box, Paper, Stack, Typography} from "@mui/material";
import {useEffect} from "react";

import {FormValuesProps, FormSchema, defaultValues} from "./form";
import axiosInstance from "../../../utils/axios";
import {useRouter} from "next/router";

interface Props {
  empresa?: { id: number, name: string, contactName: string, email: string };
  title: string;
  type: 'create' | 'edit';
}

export default function FormEmpresa(props: Props) {
  const {title} = props;
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
    if (props.empresa) {
      reset({
        name: props.empresa.name,
        contactName: props.empresa.contactName,
        email: props.empresa.email
      });
    }
  }, [reset, props.empresa])

  const onSubmit = async (data: FormValuesProps) => {

    try {
      if (props.type === 'edit') {
        if (props.empresa) {
          await axiosInstance.put(`/empresas/${props.empresa.id}`, data);
          enqueueSnackbar('Empresa atualizada com sucesso', {variant: 'success'});
          push('/dashboard/empresas');
          return;
        }
      }

      await axiosInstance.post('/empresas', data);
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
      <Box component={Paper} maxWidth={'450px'} p={3} variant="outlined">
        <Typography variant={'h3'}>{title}</Typography>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Stack spacing={3}>
              <RHFTextField name={'name'} label={'Nome da Empresa'}/>

              <RHFTextField name={'contactName'} label={'Contato'}/>

              <RHFTextField name={'email'} label={'Email'}/>

              <Box>
                <LoadingButton
                  color="info"
                  size="large"
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{marginBottom: '20px'}}
                  loading={isSubmitting}
                >
                  {props.type === 'create' ? 'Cadastrar' : 'Salvar'}
                </LoadingButton>
              </Box>
            </Stack>
          </Box>

        </FormProvider>
      </Box>
    </>
  );
}
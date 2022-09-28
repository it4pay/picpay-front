import Layout from "../../../layout";
import Page from "../../../components/Page";
import {useRouter} from "next/router";
import {Button, Container, Divider, Grid, Paper, Typography} from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import axios from "axios";

import useSWR from 'swr'
import {useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import ConfirmDialog from "../../../components/ConfirmDialog";
import {useSnackbar} from "notistack";

EmpresaEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

interface Empresa {
  id: number;
  name: string;
  contactName: string;
  email: string;
}


function EmpresaEdit(props: any) {
  const {id} = props;
  const {
    data,
    error
  } = useSWR(process.env.NEXT_PUBLIC_HOST_BASEURL + `/empresas/${id}`, url => axios.get(url).then(res => res.data));
  const [empresa, setEmpresa] = useState<Empresa>();
  const {push} = useRouter();
  const {enqueueSnackbar} = useSnackbar();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false, title: '', subTitle: '', onConfirm: () => {
    }
  });

  useEffect(() => {
    if (data) {
      setEmpresa(data);
    }
  }, [data]);

  if (error) {
    return <div>Ocorreu algum erro ao carregar a página</div>
  }

  const handleEdit = () => {
    push('/dashboard/empresas/[id]/editar', `/dashboard/empresas/${id}/editar`);
  };

  const handleDelete = () => {
    setConfirmDialog(
      {
        isOpen: true,
        title: 'Tem certeza que deseja excluir esta empresa?',
        subTitle: "Você não poderá desfazer esta ação",
        onConfirm: () => {
          excluir(id)
        }
      }
    )
  }

  async function excluir(id: number) {
    try {
      await axios.delete(process.env.NEXT_PUBLIC_HOST_BASEURL + `/empresas/${id}`);
      enqueueSnackbar('Empresa excluída com sucesso', {variant: 'warning'});
      push('/dashboard/empresas');
    } catch (error) {
      console.log(error)
    }
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false
    })
  }

  return (
    <Page title="Editar Empresa: App">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Detalhes Empresa"
          links={[
            {name: 'Dashboard', href: PATH_DASHBOARD.gestao.app},
            {name: 'Empresas', href: PATH_DASHBOARD.gestao.empresas},
            {name: `${empresa?.name}`},
          ]}
        />
        <Grid container columnSpacing={0} px={2} rowSpacing={2} py={1} maxWidth={'500px'} component={Paper}
              borderRadius={'12px'}>
          <Grid item xs={12}>
            <Typography variant="h3" color={'textPrimary'} component="h4">
              Empresa: <Typography
              variant="h3"
              color={'textSecondary'}
              component="span"
            >
              {empresa?.name}
            </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color={'textPrimary'} component="h4">
              Contato: <Typography
              variant="h5"
              color={'textSecondary'}
              component="span"
            >
              {empresa?.contactName}
            </Typography>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" color={'textPrimary'} component="h4">
              Email: <Typography
              variant="h5"
              color={'textSecondary'}
              component="span"
            >
              {empresa?.email}
            </Typography>
            </Typography>
          </Grid>
          <Divider color={'black'}/>
          <Grid item xs={12} display={'flex'} justifyContent={'space-between'} my={2}>
            <Button variant={'contained'} color={'error'} onClick={() => handleDelete()}>Excluir</Button>
            <Button variant={'contained'} color={'info'} onClick={() => handleEdit()}>Editar</Button>
          </Grid>
        </Grid>
      </Container>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const {id} = context.query;

  return {
    props: {
      id
    }
  }
}

export default EmpresaEdit;

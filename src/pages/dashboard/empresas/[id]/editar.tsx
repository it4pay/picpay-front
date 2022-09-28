import Layout from "../../../../layout";
import Page from "../../../../components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../../routes/paths";
import {FormEmpresa} from "../../../../sections/@dashboard/empresas";
import useSWR from "swr";
import axios from "axios";
import {useEffect, useState} from "react";
import {GetServerSideProps} from "next";

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

  useEffect(() => {
    if (data) {
      setEmpresa(data);
    }
  }, [data]);

  if (error) {
    return <div>Ocorreu algum erro ao carregar a página</div>
  }

  return (
    <Page title="Editar Empresa: App">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Edição de empresa"
          links={[
            {name: 'Dashboard', href: PATH_DASHBOARD.gestao.app},
            {name: 'Empresas', href: PATH_DASHBOARD.gestao.empresas},
            {name: `${empresa?.name}`},
          ]}
        />
        <FormEmpresa empresa={empresa} title={'Formulário de edição'} type={'edit'}/>
      </Container>
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
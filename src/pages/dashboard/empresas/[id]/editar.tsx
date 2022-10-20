import Layout from "../../../../layout";
import Page from "../../../../components/Page";
import {Container, Typography} from "@mui/material";
import {FormEmpresa} from "../../../../sections/@dashboard/empresas";
import useSWR from "swr";
import axios from "axios";
import {useEffect, useState} from "react";
import {GetServerSideProps} from "next";

EmpresaEdit.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

interface Company {
  id: string;
  name: string;
  contact: string;
  email: string;
  cnpj: string;
}

function EmpresaEdit(props: any) {
  const {id} = props;
  const {
    data,
    error
  } = useSWR(process.env.NEXT_PUBLIC_HOST_BASEURL + `/companies/${id}`, url => axios.get(url).then(res => res.data));
  const [company, setCompany] = useState<Company>();

  useEffect(() => {
    if (data) {
      setCompany(data);
    }
  }, [data]);

  if (error) {
    return <div>Ocorreu algum erro ao carregar a página</div>
  }

  return (
    <Page title="Editar Empresa">
      <Container maxWidth={'lg'}>
        <Typography variant="h5" mb={4} ml={3}>
          Edição de empresa
        </Typography>
        <FormEmpresa company={company} type={'edit'}/>
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
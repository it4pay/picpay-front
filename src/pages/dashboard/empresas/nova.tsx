import Layout from "../../../layout";
import Page from "../../../components/Page";
import {Container, Typography} from "@mui/material";
import {FormEmpresa} from "../../../sections/@dashboard/empresas";

EmpresaCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

function EmpresaCreate() {

  return (
    <Page title="Nova Empresa: App">
      <Container maxWidth={'lg'}>
        <Typography variant="h5" mb={4} ml={3}>
          Cadastro de nova empresa
        </Typography>
        <FormEmpresa type={'create'}/>
      </Container>
    </Page>
  );
}

export default EmpresaCreate;
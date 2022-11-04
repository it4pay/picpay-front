import Layout from "../../../layout";
import Page from "../../../components/Page";
import {Container, Typography} from "@mui/material";
import {FormNovoGrupo, FormNovaEmpresa} from "../../../sections/@dashboard/gruposEmpresas";

EmpresaCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

function EmpresaCreate() {

  return (
    <Page title="Nova Empresa: App">
      <Container maxWidth={'xl'}>
        <Typography variant="h5" mb={4} ml={3}>
          Cadastro de nova empresa
        </Typography>
        <FormNovoGrupo type={'create'}/>
        <FormNovaEmpresa type={'create'}/>
      </Container>
    </Page>
  );
}

export default EmpresaCreate;
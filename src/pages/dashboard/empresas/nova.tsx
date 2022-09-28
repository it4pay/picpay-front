import Layout from "../../../layout";
import Page from "../../../components/Page";
import {Container} from "@mui/material";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";
import {FormEmpresa} from "../../../sections/@dashboard/empresas";

EmpresaCreate.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

function EmpresaCreate() {

  return (
    <Page title="Nova Empresa: App">
      <Container maxWidth={'lg'}>
        <HeaderBreadcrumbs
          heading="Nova de empresa"
          links={[
            {name: 'Dashboard', href: PATH_DASHBOARD.gestao.app},
            {name: 'Empresas', href: PATH_DASHBOARD.gestao.empresas},
            {name: 'Nova empresa'},
          ]}
        />
        <FormEmpresa title={'Formulário de Cadastro'} type={'create'}/>
      </Container>
    </Page>
  );
}

export default EmpresaCreate;
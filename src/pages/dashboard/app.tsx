// @mui
import {Container, Typography} from '@mui/material';
// layouts
import Layout from '../../layout';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {
  return (
    <Page title="Dashboard">
      <Container maxWidth={'xl'}>
        <Typography>Sistema de pagamentos com PicPay</Typography>
      </Container>
    </Page>
  );
}

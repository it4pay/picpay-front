import Layout from "../../../layout";


PedidosApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};


export default function PedidosApp() {

  return (
    <div>
      <h1>Pedidos</h1>
    </div>
  );
}
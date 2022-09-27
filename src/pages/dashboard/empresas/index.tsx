// @mui
import {
  Box,
  Card,
  Table,
  Button,
  Switch,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// layouts
import Layout from '../../../layout';
// components
import Page from '../../../components/Page';

// ----------------------------------------------------------------------

import {useState, useEffect} from 'react';
import useSWR from 'swr'
// next
import NextLink from 'next/link';
import {useRouter} from 'next/router';
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import {
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
} from '../../../components/table';

import useTable, {getComparator, emptyRows} from '../../../hooks/useTable';

import EmpresaTableToolbar from '../../../sections/@dashboard/empresas/EmpresaTableToolbar';
import EmpresaTableRow from '../../../sections/@dashboard/empresas/EmpresaTableRow';
import axios from "axios";
import HeaderBreadcrumbs from "../../../components/HeaderBreadcrumbs";
import {PATH_DASHBOARD} from "../../../routes/paths";

const TABLE_HEAD = [
  {id: 'name', label: 'Empresa', align: 'left'},
  {id: 'contactName', label: 'Nome do contato', align: 'left'},
  {id: 'email', label: 'Email', align: 'left'},
  {id: ''},
];

// ----------------------------------------------------------------------

EmpresasApp.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function EmpresasApp() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({
    defaultOrderBy: 'created_at',
    defaultOrder: 'desc',
  });

  const {push} = useRouter();

  const {data, error, mutate} = useSWR('http://picpay.test/api/empresas', url => axios.get(url).then(res => res.data))

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data) {
      setTableData(data)
    }
  }, [data])

  const [filterName, setFilterName] = useState('');

  const handleFilterName = (filterName: string) => {
    setFilterName(filterName);
    setPage(0);
  };

  const handleDeleteRow = async (id: string) => {
    try {
      await axios.delete(`http://picpay.test/api/empresas/${id}`);
      await mutate()
    } catch (e) {
      console.log(e)
    }
  };

  const handleEditRow = (id: string) => {
    push('/dashboard/empresas/' + id + '/editar');
  };

  const handleShowRow = (id: string) => {
    push('/dashboard/empresas/' + id);
  };

  const dataFiltered = applySortFilter({
    tableData,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const denseHeight = dense ? 60 : 80;

  const isNotFound = (!dataFiltered.length && !!filterName);

  if (error) {
    return <div>Erro ao carregar dados</div>
  }


  return (
    <Page title="Dashboard">
      <Container maxWidth={'xl'}>
        <HeaderBreadcrumbs
          heading="Lista de empresas"
          links={[
            {name: 'Dashboard', href: PATH_DASHBOARD.gestao.app},
            {name: 'Empresas'}
          ]}
          action={
            <NextLink href={'#'} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill"/>}>
                Adicionar empresa
              </Button>
            </NextLink>
          }
        />
        <Card>
          <EmpresaTableToolbar filterName={filterName} onFilterName={handleFilterName}/>

          <Scrollbar>
            <TableContainer sx={{minWidth: 960, position: 'relative'}}>
              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  onSort={onSort}
                  sx={{bgcolor: '#F4F6F8'}}
                />

                <TableBody>
                  {(dataFiltered)
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: any) =>
                      row ? (
                        <EmpresaTableRow
                          key={row.id}
                          row={row}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                          onShowRow={() => handleShowRow(row.id)}
                        />
                      ) : (
                        !isNotFound && <TableSkeleton key={index} sx={{height: denseHeight}}/>
                      )
                    )}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound}/>
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{position: 'relative'}}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dataFiltered.length}
              labelRowsPerPage='Linhas por página'
              labelDisplayedRows={({from, to, count}) => `${from}-${to} de ${count}`}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense}/>}
              label="Denso"
              sx={{px: 3, py: 1.5, top: 0, position: {md: 'absolute'}}}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}


function applySortFilter(
  {
    tableData,
    comparator,
    filterName,
  }: {
    tableData: any;
    comparator: (a: any, b: any) => number;
    filterName: string;
  }) {
  const stabilizedThis = tableData.map((el: any, index: any) => [el, index] as const);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  tableData = stabilizedThis.map((el: any[]) => el[0]);

  if (filterName) {
    tableData = tableData.filter(
      (entry: { [s: string]: unknown; } | ArrayLike<unknown>) => Object.values(entry).some(
        // @ts-ignore
        value => value.toString().toLowerCase().includes(filterName.toLowerCase())
      )
    );
  }

  return tableData;
}

import {useState} from 'react';
// @mui
import {TableRow, TableCell, Typography, MenuItem} from '@mui/material';
import Iconify from '../../../components/Iconify';
import {TableMoreMenu} from '../../../components/table';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
  onShowRow: VoidFunction;
};

export default function EmpresaTableRow(
  {
    row,
    onDeleteRow,
    onEditRow,
    onShowRow,
  }: Props) {

  const {name, contactName, email} = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover>
      <TableCell >
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>

      <TableCell>{(contactName)}</TableCell>

      <TableCell>{(email)}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{color: 'error.main'}}
              >
                <Iconify icon={'eva:trash-2-outline'}/>
                Excluir
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'}/>
                Editar
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onShowRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'}/>
                Ver
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

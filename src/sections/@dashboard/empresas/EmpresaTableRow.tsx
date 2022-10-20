import {useState} from 'react';
// @mui
import {TableRow, TableCell, Typography, MenuItem} from '@mui/material';
import Iconify from '../../../components/Iconify';
import {TableMoreMenu} from '../../../components/table';

// ----------------------------------------------------------------------

type Props = {
  row: any;
  onEditRow: VoidFunction;
};

export default function EmpresaTableRow(
  {
    row,
    onEditRow,
  }: Props) {

  const {name, contact, email, cnpj} = row;

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

      <TableCell>{(contact)}</TableCell>

      <TableCell>{(email)}</TableCell>

      <TableCell>{(cnpj)}</TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'}/>
                Editar
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}

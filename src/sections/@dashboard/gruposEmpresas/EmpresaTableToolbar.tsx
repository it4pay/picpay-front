// @mui
import {Stack, InputAdornment, TextField, Button, Box} from '@mui/material';
// components
import Iconify from '../../../components/Iconify';
import NextLink from "next/link";
import {styled} from "@mui/material/styles";

const Searchbar = styled(TextField)(({theme}) => ({
  width: '638px',
  [theme.breakpoints.down('md')]: {
    width: '400px'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const BoxStyled = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('sm')]: {
    marginTop: '1.3rem',
    width: '100%',
    '& .MuiButtonBase-root': {
      width: '100%'
    }
  }

}));

const StackStyled = styled(Stack)(({theme}) => ({
  alignItems: "center",
  justifyContent: "space-between",
  flexDirection: 'row',
  padding: theme.spacing(2.5, 3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  }
}));


// ----------------------------------------------------------------------

type Props = {
  filterName: string;
  onFilterName: (value: string) => void;
};

export default function EmpresaTableToolbar({filterName, onFilterName}: Props) {
  return (
    <StackStyled>
      <Searchbar
        value={filterName}
        onChange={(event) => onFilterName(event.target.value)}
        placeholder="Pesquisar empresa "
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify
                icon={'eva:search-fill'}
                sx={{color: 'text.disabled', width: 20, height: 20}}
              />
            </InputAdornment>
          ),
        }}
      />
      <BoxStyled>
        <NextLink href={'/dashboard/empresas/nova'} passHref>
          <Button
            variant="contained"
          >
            Nova Empresa
          </Button>
        </NextLink>
      </BoxStyled>
    </StackStyled>
  );
}

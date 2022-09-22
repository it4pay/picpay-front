import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Button} from '@mui/material'
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';
import {styled} from '@mui/material/styles';


const MyDialogTitle = styled(DialogTitle)(() => ({
  textAlign: 'center'
}));

const MyTitleIcon = styled(IconButton)(({theme}) => ({
  backgroundColor: '#efabab',
  color: theme.palette.error.main,
  '&:hover': {
    backgroundColor: '#efabab',
    cursor: 'default'
  },
  '& .MuiSvgIcon-root': {
    fontSize: '8rem',
  }
}));

interface Props {
  confirmDialog: {
    isOpen: boolean;
    title: string;
    subTitle: string;
    onConfirm: () => void;
  };
  setConfirmDialog: (confirmDialog: { isOpen: boolean; title: string; subTitle: string; onConfirm: () => void; }) => void;
}


export default function ConfirmDialog(props: Props) {

  const {confirmDialog, setConfirmDialog} = props;

  return (
    <Dialog
      open={confirmDialog.isOpen}
      onClose={() => setConfirmDialog({...confirmDialog, isOpen: false})}
    >
      <MyDialogTitle>
        <MyTitleIcon disableRipple>
          <NotListedLocationIcon/>
        </MyTitleIcon>
      </MyDialogTitle>
      <DialogContent sx={{textAlign: 'center'}}>
        <Typography variant="h6">
          {confirmDialog.title}
        </Typography>
        <Typography variant="subtitle2">
          {confirmDialog.subTitle}
        </Typography>
      </DialogContent>
      <DialogActions sx={{justifyContent: 'center'}}>
        <Button
          color="info"
          onClick={() => setConfirmDialog({...confirmDialog, isOpen: false})}>
          Não
        </Button>
        <Button
          color="secondary"
          onClick={confirmDialog.onConfirm}>
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {TextField, TextFieldProps} from '@mui/material';
import {styled} from "@mui/system";

// ----------------------------------------------------------------------

const StyledTextField = styled(TextField)(({theme}) => ({
  "& label.Mui-focused": {
    color: "#000"
  },
  "& label.MuiFocused": {
    color: '#888888',
  },
  "& label.MuiFormLabel-filled": {
    color: '#888888',
  },
  "& .MuiFilledInput-root": {
    background: "white",
    width: "100% !important",
    "& select": {
      height: "1.813em",
      background: 'white',
      borderRadius: "4px"
    },
  },
  [theme.breakpoints.down('md')]: {
    "& .MuiFormHelperText-root": {
      fontSize: '14px',
    }
  },
}));

// ----------------------------------------------------------------------

type IProps = {
  name: string;
  children: React.ReactNode;
};

type Props = IProps & TextFieldProps;

export default function RHFSelect({name, children, ...other}: Props) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <StyledTextField
          {...field}
          select
          variant={'filled'}
          SelectProps={{native: true}}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </StyledTextField>
      )}
    />
  );
}

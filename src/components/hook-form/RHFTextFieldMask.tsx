// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { IMaskMixin} from "react-imask";
import {styled} from "@mui/system";

const InternalMaskTextField = IMaskMixin((props) => (
  <TextField variant={'filled'} {...props as any}/>
))

// ----------------------------------------------------------------------

const StyledTextField = styled(InternalMaskTextField)(({theme}) => ({
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
    "& input": {
      background: "white",
      height: "1.813em",
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
  mask?: any;
};

type Props = IProps & TextFieldProps;

const RHFTextFieldMask: React.FC<Props> = ({name, mask, ...other}: Props) => {
  const { control } = useFormContext();


  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        //@ts-ignore
        <StyledTextField
          {...field}
          fullWidth
          mask={mask}
          variant={'filled'}
          onAccept={(value) => field.onChange(value)}
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}

export default RHFTextFieldMask;

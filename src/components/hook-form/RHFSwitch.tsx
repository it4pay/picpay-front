// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {Switch, FormControlLabel, FormControlLabelProps, FormHelperText, Box} from '@mui/material';

// ----------------------------------------------------------------------

type IProps = Omit<FormControlLabelProps, 'control'>;

interface Props extends IProps {
  name: string;
}

export default function RHFSwitch({name, ...other}: Props) {
  const {control} = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({field, fieldState: {error}}) =>
            <Box position={"relative"} >
              <Switch
                {...field} checked={field.value}
              />
              <Box position={"absolute"} top={"15"} ml={2} width={'150px'}>
                <FormHelperText error={true}>{error?.message}</FormHelperText>
              </Box>
            </Box>
          }
        />
      }
      {...other}
    />
  );
}

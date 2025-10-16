import {
  TextField,
} from "@mui/material";

interface Props {
    value: string;
    setValue: (value: string) => void;
    label: string;
}

export const TextFieldMUI = ({value, setValue, label}: Props) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

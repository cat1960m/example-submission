import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
} from "@mui/material";

interface Props {
  values: string[];
  setValues: (values: string[]) => void;
  options: { code: string; name: string }[];
  label: string;
}

export const SelectMultiMUI = ({
  values,
  setValues,
  options,
  label,
}: Props) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={values}
        onChange={(e) => setValues(e.target.value as string[])}
        input={<OutlinedInput label="Diagnoses" />}
        renderValue={(selected) => selected.join(", ")}
      >
        {options.map((item) => (
          <MenuItem key={item.code} value={item.code}>
            <Checkbox checked={values.includes(item.code)} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

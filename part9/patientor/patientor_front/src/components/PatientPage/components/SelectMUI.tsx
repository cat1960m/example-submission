import { Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface Props {
  value: string;
  setValue: (value: string) => void;
  label: string;
  options: { value: string; name: string }[];
}

export const SelectMUI = ({ value, setValue, label, options }: Props) => {
  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };
  return (
    <Select
      labelId={label}
      value={value}
      label="Favorite Fruit"
      onChange={handleChange}
    >
      {options.map((option) => <MenuItem value={option.value} key={option.value}>{option.name}</MenuItem>)}
    </Select>
  );
};

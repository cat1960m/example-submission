import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { PickerValue } from "@mui/x-date-pickers/internals";

interface Props {
  date: Date | null;
  setDate: (date: PickerValue) => void;
  label: string;
}

export const DateMUI = ({ date, setDate, label }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label={label}
        value={date}
        onChange={(newDate) => setDate(newDate)}
        slotProps={{
          textField: {
            fullWidth: true,
            variant: "outlined",
            margin: "normal",
          },
        }}
      />
    </LocalizationProvider>
  );
};

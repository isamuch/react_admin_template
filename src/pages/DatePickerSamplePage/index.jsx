import { useState } from 'react';
// Components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function DatePickerSamplePage() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <>
      <div className='flex gap-5 items-center'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            format='DD/MM/YYYY'
          />
          <div className='text-2xl'>{' - '}</div>
          <DatePicker
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            format='DD/MM/YYYY'
          />
        </LocalizationProvider>
      </div>
      <div>
        <br />
        <div>{`startDate: ${startDate}`}</div>
        <div>{`endDate: ${endDate}`}</div>
      </div>
    </>
  );
}

export default DatePickerSamplePage;

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar() {
  return (
    <TextField
      focused={false}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          paddingLeft: 7,
          borderRadius: 8,
        },
      }}
      placeholder='Search...'
      inputProps={{
        style: {
          padding: 4,
        },
      }}
    />
  );
}

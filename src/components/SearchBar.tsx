import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { passStateInputProps } from '../utils';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <TextField
      {...passStateInputProps(searchQuery, setSearchQuery)}
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

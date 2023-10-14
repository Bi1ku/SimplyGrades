import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  setSearchQuery,
}: {
  setSearchQuery: (query: string) => void;
}) {
  return (
    <TextField
      onChange={(e) => setSearchQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        style: {
          paddingLeft: 7,
          borderRadius: 8,
        },
      }}
      placeholder="Search..."
      inputProps={{
        style: {
          padding: 4,
        },
      }}
    />
  );
}

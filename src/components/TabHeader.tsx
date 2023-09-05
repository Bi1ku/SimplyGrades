import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Add from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

export default function TabHeader({
  setCreateModalOpen,
  setSearchQuery,
}: {
  setCreateModalOpen: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <Stack flexDirection='row' sx={{ mb: 2 }}>
      <Box
        sx={{
          position: 'relative',
          borderRadius: 2,
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            padding: 2,
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SearchIcon />
        </Box>
        <InputBase
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search…'
          sx={{
            color: 'inherit',
            '& .MuiInputBase-input': {
              padding: 1,
              paddingLeft: (theme) => `calc(1em + ${theme.spacing(4)})`,
              transition: (theme) => theme.transitions.create('width'),
              width: { xs: '18ch', sm: '30ch' },
              '&:focus': {
                sm: {
                  width: '34ch',
                },
                xs: {
                  width: '22ch',
                },
              },
            },
          }}
        />
      </Box>
      <Button
        variant='contained'
        sx={{
          ml: 'auto',
          borderRadius: 2,
        }}
        onClick={() => setCreateModalOpen(true)}
      >
        <Add sx={{ pr: '2px' }} /> CREATE
      </Button>
    </Stack>
  );
}

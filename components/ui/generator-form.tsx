import { AddLink } from "@mui/icons-material";
import { Stack, Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

interface FormProps {
  onSubmit: () => {};
  loading?: boolean;
}

const GeneratorForm: React.FC<FormProps> = ({
  onSubmit: onSubmit,
  loading,
}) => {
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form>
      <Stack direction="row" flexGrow={1}>
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box height="40px" mr={5} width="100%">
            <TextField
              required
              id="outlined-required"
              label="Enter your link"
              size="small"
              fullWidth
            />
          </Box>
          <LoadingButton
            loading={false}
            loadingPosition="start"
            type="submit"
            variant="contained"
            size="large"
            onClick={handleSubmit}
            startIcon={<AddLink />}
            sx={{ textTransform: "unset", borderRadius: "10px" }}
          >
            Generate
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  );
};

export default GeneratorForm;

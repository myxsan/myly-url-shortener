import { AddLink } from "@mui/icons-material";
import { Stack, Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";

interface FormProps {
  onSubmit: (url: string) => void;
  loading: boolean;
}

const GeneratorForm: React.FC<FormProps> = ({ onSubmit, loading }) => {
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!url) return;
    event.preventDefault();
    onSubmit(url);
    setUrl("");
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUrl(event.target.value);
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
              value={url}
              onChange={handleChange}
              fullWidth
            />
          </Box>
          <LoadingButton
            loading={loading}
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

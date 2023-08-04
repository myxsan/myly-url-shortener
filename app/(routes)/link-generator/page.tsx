"use client";

import GeneratorForm from "@/components/ui/generator-form";
import { Box } from "@mui/material";

const LinkGeneratorPage = () => {
  return (
    <Box display="flex" flexDirection="column">
      <GeneratorForm onSubmit={() => []} />
    </Box>
  );
};

export default LinkGeneratorPage;

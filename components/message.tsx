import { Box, Stack } from "@mui/material";

type MessageProps  = {
    text: string
}
export const Message = ({ text }: MessageProps) => {
    return (
      <Box sx={{ marginBottom: "5px" }}>
        <Stack
          direction="row"
          sx={{
            display: "inline-flex",
            padding: "10px 10px",
            borderRadius: 2,
            border: 1,
            borderColor: "black",

          }}
        >
          {text}
        </Stack>
      </Box>
    );
  };
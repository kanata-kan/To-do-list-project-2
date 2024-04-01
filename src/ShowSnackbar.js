import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function ShowSnackbar({ open, message }) {
  return (
    <div>
      <Snackbar open={open}>
        <Stack style={{ direction: "ltr" }} sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="success">
            {message}
          </Alert>
        </Stack>
      </Snackbar>
    </div>
  );
}

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize your primary color here
    },
    secondary: {
      main: "#ff4081", // Customize your secondary color here
    },
    background: {
      default: "#282c34",
    },
    // ... you can add more customizations as needed
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#4a4e58", // Light gray background
          minHeight: "200px",
        },
      },
    },
  },
});

export default theme;

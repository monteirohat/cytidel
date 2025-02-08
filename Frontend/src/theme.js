import { createTheme } from "@mui/material/styles";
import { blue, amber } from "@mui/material/colors";

//Exemplo: https://modernize-nextjs.adminmart.com/theme-pages/account-settings

// First customization phase
let theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#067ad6" },
    info: { main: "#019cef" },
    secondary: { main: "#dcdcdc" },
    warning: { main: "#ffba00" },
    error: { main: "rgb(211, 47, 47);" },
    success: { main: "#40a36d" },
  },
});

// Second customization phase using the theme from the first phase
theme = createTheme(theme, {
  palette: {
    primary: blue, // reassigned to ensure clarity, though technically redundant
    secondary: amber, // reassigned to ensure clarity, though technically redundant
  },
  components: {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e3e3e3",
        },
      },
    },
    MuiTableHead:{
      styleOverrides:{
        root:{
          backgroundColor: "#3c5a7f",
          color: "#ffffff",
          fontSize: 16,
          fontWeight: "bold",
          padding: "10px",
        }
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
         
          color: "inherit",
          
        },
        body: {
          fontSize: 14,
          padding: "4px 10px",
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          position: "fixed",
          "@media (min-width: 600px)": {
            bottom: "unset", // Remove o comportamento padrão
          },
        },
      },
    },
  },
});

export default theme;

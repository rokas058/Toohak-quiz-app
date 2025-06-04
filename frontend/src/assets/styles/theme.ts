import { createTheme } from "@mui/material";
import { green, red } from "@mui/material/colors";

const PALETTE_PRIMARY_DARK = "#241362";
const PALETTE_PRIMARY_LIGHT = "#DCD5FD";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4A28C6",
      dark: PALETTE_PRIMARY_DARK,
      light: PALETTE_PRIMARY_LIGHT,
    },
    secondary: {
      main: "#2F109E", // Button background color
    },
    background: {
      default: "#FFFFFF",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#DCD5FD",
    },
    contrast: {
      text: "#333333", // When background is white
    },
    error: {
      main: red[500],
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', Helvetica, Arial, sans-serif",
    h1: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 800, // extrabold
      fontSize: "6rem",
      letterSpacing: "-6px",
      color: "#DCD5FD",
    },
    h2: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 600, // semibold
      fontSize: "4rem", // text-[64px]
      letterSpacing: "-3.2px",
      color: "#DCD5FD",
    },
    h3: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 600, // extrabold
      fontSize: "3rem", // text-[32px]
      letterSpacing: "-1.6px",
      color: "#DCD5FD",
    },
    h4: {
      fontFamily: "'Inter', Helvetica",
      fontWeight: 600, // semibold
      fontSize: "2rem",
      letterSpacing: "-1.5px",
      color: "#DCD5FD",
    },
    button: {
      fontFamily: "'Roboto', Helvetica",
      fontWeight: 600,
      fontSize: "1.2rem",
      textTransform: "none",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "linear-gradient(to bottom, #4A28C6, #241360)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          boxShadow:
            "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
          paddingLeft: "20px",
          paddingRight: "20px",
        },
        contained: {
          backgroundColor: "#2F109E",
          "&:hover": {
            backgroundColor: "#421ec1",
          },
        },
        containedError: {
          backgroundColor: "#c62828",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#e53935",
          },
        },
        containedSuccess: {
          backgroundColor: green[300],
          color: PALETTE_PRIMARY_DARK,
          "&:hover": {
            color: PALETTE_PRIMARY_LIGHT,
            backgroundColor: green[500],
          },
        },
        outlined: {
          borderColor: "#DCD5FD",
          borderWidth: "3px",
          color: "#FFFFFF",
          backgroundColor: "rgba(41, 128, 215, 0.03)", // #2980d708
          "&:hover": {
            borderColor: "#FFFFFF",
            backgroundColor: "rgba(41, 128, 215, 0.1)",
          },
        },
        text: {
          color: "white",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            color: "white",
          },
          "&:active": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
          "&:disabled": {
            color: "rgba(255, 255, 255, 0.5)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#241362",
          padding: "5px ",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#4A28C6",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
          "& .MuiInputLabel-root": {
            color: "rgba(255, 255, 255, 0.7)",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "white",
          },
          "& input": {
            color: "white",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "rgba(255, 255, 255, 0.5)",
          "&.Mui-checked": {
            color: "white",
          },
          "&:hover": {
            color: "white",
          },
        },
      },
    },
  },

  borderRadius: {
    xs: "2px",
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  multiLineEllipsis: (linesToShow: number) => {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: String(linesToShow),
      WebkitBoxOrient: "vertical",
    };
  },
});
export default theme;

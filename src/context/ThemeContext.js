import {
  createMuiTheme,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core"
import React, { createContext, useContext, useState } from "react"

const checkDefaultDarkTheme = () => {
  const theme = window.localStorage.getItem("theme")
  if (theme === null || (theme && theme === "dark")) return true
  else return false
}

const ThemeContext = createContext()
const ThemeUpdateContext = createContext()

export const useTheme = () => useContext(ThemeContext)
export const useUpdateTheme = () => useContext(ThemeUpdateContext)

const font = {
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
}

const darkTheme = responsiveFontSizes(
  createMuiTheme({
    ...font,
    palette: {
      type: "dark",
    },
  })
)
darkTheme.typography.subtitle2 = {
  fontSize: "1.2rem",
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
}
darkTheme.typography.caption = {
  [darkTheme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [darkTheme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
}

const lightTheme = responsiveFontSizes(
  createMuiTheme({
    ...font,
    palette: {
      type: "light",
    },
  })
)
lightTheme.typography.subtitle2 = {
  fontSize: "1.2rem",
  [lightTheme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
  [lightTheme.breakpoints.down("xm")]: {
    fontSize: "0.8rem",
  },
}

const GlobalThemeProvider = (props) => {
  const [dark, setDark] = useState(checkDefaultDarkTheme())

  const handleUpdateTheme = () => setDark((prev) => !prev)

  // ...
  return (
    <ThemeContext.Provider value={dark}>
      <ThemeUpdateContext.Provider value={handleUpdateTheme}>
        <ThemeProvider theme={dark ? darkTheme : lightTheme}>
          <CssBaseline />
          {props.children}
        </ThemeProvider>
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  )
}

export default GlobalThemeProvider

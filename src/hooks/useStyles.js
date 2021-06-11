import { makeStyles } from "@material-ui/core"

export const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  themeColor: {
    color: theme.palette.text.primary,
  },
  themeBackgroundColor: {
    backgroundColor: theme.palette.background.default,
  },
  main: {
    maxWidth: "60%",
    paddingTop: theme.spacing(11),
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",

    [theme.breakpoints.down("md")]: {
      maxWidth: "80%",
    },

    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    },
  },
  mainTitle: {
    paddingBottom: theme.spacing(4),
    fontWeight: "700",
    backgroundColor: "#f7b42c",
    backgroundImage: "linear-gradient(315deg, #f7b42c 0%, #fc575e 74%)",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  mainForm: {
    display: "flex",
    alignItems: "center",
    maxWidth: "80%",
    margin: "0 auto",
  },
  mainList: {
    maxWidth: "80%",
    margin: "0 auto",
    marginTop: theme.spacing(2),
    overflow: "auto",
  },
  mainFormInput: {
    width: "100%",
    display: "inline-block",
    backgroundColor:
      theme.palette.type === "dark"
        ? "rgba(39, 39, 39, 0.5)"
        : "rgba(211, 211, 211, 0.5)",
    "& *": {
      color: theme.palette.text.primary,
    },
  },
  bottomNavigation: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    "-webkit-box-shadow":
      "0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)",
    "box-shadow":
      "0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)",
  },
  bottomNavigationAction: {
    "& > *": {
      color: theme.palette.text.primary,
    },
  },
  bottomNavigationActionSelected: {
    "& > *": {
      color: theme.palette.secondary.main,
    },
  },
  icon: {
    fontSize: 25,
    [theme.breakpoints.down("sm")]: {
      fontSize: 20,
    },
  },
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))

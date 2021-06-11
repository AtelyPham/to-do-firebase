import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import { useSignout } from "../context/AuthContext"
import { useStyles } from "../hooks/useStyles"
import { checkUserSignIn } from "../utils/utils"
import LogButtonBig from "./LogButtonBig"
import LogButtonSmall from "./LogButtonSmall"
import ToggleButton from "./ToggleThemeButton"

const Header = ({ user, onLogIn: login }) => {
  const logout = useSignout()
  const classes = useStyles()

  const titleStyle = {
    marginRight: "auto",
    fontWeight: "600",
  }

  return (
    <AppBar
      position="fixed"
      color="default"
      className={`${classes.themeColor} ${classes.themeBackgroundColor}`}
    >
      <Toolbar>
        <Typography variant="h6" style={titleStyle}>
          {checkUserSignIn(user) ? `Welcome back! 🎉😍` : "Hello! 👋👋"}
        </Typography>
        <IconButton
          size="small"
          color="primary"
          arial-label="button toggle theme"
          style={{
            marginRight: 5,
          }}
        >
          <ToggleButton />
        </IconButton>
        {window.innerWidth < 400 ? (
          <LogButtonSmall login={login} logout={logout} user={user} />
        ) : (
          <LogButtonBig login={login} logout={logout} user={user} />
        )}
      </Toolbar>
    </AppBar>
  )
}

export default React.memo(Header)

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import React from "react"
import { useStyles } from "../hooks/useStyles"
import { checkUserSignIn } from "../utils/utils"

const StyledMenu = withStyles((theme) => ({
  paper: {
    "& > *": {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary,
    },
  },
}))((props) => {
  return (
    <Menu
      id="menu-appbar"
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  )
})

const LogButtonSmall = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const classes = useStyles()
  const open = Boolean(anchorEl)
  const { login, logout, user } = props

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const iconStyle = {
    width: 20,
    height: 20,
  }

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        style={{
          padding: "0",
        }}
      >
        {checkUserSignIn(user) ? (
          <Avatar src={user.photoURL} style={iconStyle} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={checkUserSignIn(user) ? logout : login}
          className={classes.themeColor}
        >
          {checkUserSignIn(user) ? "Log Out" : "Log In"}
        </MenuItem>
      </StyledMenu>
    </div>
  )
}

export default LogButtonSmall

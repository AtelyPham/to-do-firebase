import { Avatar, Button } from "@material-ui/core"
import { AccountCircle } from "@material-ui/icons"
import React from "react"
import { checkUserSignIn } from "../utils/utils"

const LogButtonBig = (props) => {
  const { login, logout, user } = props

  const iconStyle = {
    width: 20,
    height: 20,
  }

  const icon = checkUserSignIn(user) ? (
    <Avatar src={user.photoURL} style={iconStyle} />
  ) : (
    <AccountCircle />
  )

  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={icon}
      onClick={checkUserSignIn(user) ? logout : login}
    >
      {checkUserSignIn(user) ? "Log Out" : "Log In"}
    </Button>
  )
}

export default LogButtonBig

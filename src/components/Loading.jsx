import { CircularProgress } from "@material-ui/core"
import React from "react"
import { useStyles } from "../hooks/useStyles"

const Loading = () => {
  const classes = useStyles()
  return (
    <div className={classes.flexCenter}>
      <CircularProgress color="secondary" />
    </div>
  )
}

export default Loading

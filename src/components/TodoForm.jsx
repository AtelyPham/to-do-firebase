import { IconButton, TextField } from "@material-ui/core"
import { AddBox } from "@material-ui/icons"
import React, { useState } from "react"
import { useStyles } from "../hooks/useStyles"

const TodoForm = ({ onAdd }) => {
  const [error, setError] = useState(false)
  const classes = useStyles()
  return (
    <form
      className={classes.mainForm}
      onSubmit={(e) => {
        e.preventDefault()
        const content = e.target.elements["outlined-basic"].value
        if (content.trim().length === 0) {
          setError(true)
          setTimeout(() => {
            setError(false)
          }, 750)
          return
        }
        onAdd(content)
        e.target.reset()
      }}
      autoComplete="off"
    >
      <div className={`${classes.mainFormInput}`}>
        <TextField
          error={error}
          id="outlined-basic"
          label={error ? "Error" : "To do..."}
          helperText={error ? "Empty input." : ""}
          fullWidth
          variant="filled"
          color="secondary"
        />
      </div>
      <IconButton
        type="submit"
        aria-label="add items to to-do list"
        color="secondary"
        className={classes.icon}
      >
        <AddBox fontSize="large" />
      </IconButton>
    </form>
  )
}

export default React.memo(TodoForm)

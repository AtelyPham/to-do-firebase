import { Input } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import { useStyles } from "../hooks/useStyles"

const ChangeForm = React.forwardRef(({ content, onSaveChange, id }, ref) => {
  const [input, setInput] = useState(content)
  const classes = useStyles()
  useEffect(() => {
    ref.current.focus()
  }, [ref])

  return (
    <div
      style={{
        width: "80%",
      }}
    >
      <Input
        inputRef={ref}
        fullWidth
        value={input}
        onChange={(e) => {
          setInput(e.target.value)
        }}
        onBlur={() => onSaveChange(id)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            onSaveChange(id)
          }
        }}
        className={classes.themeColor}
      />
    </div>
  )
})

export default ChangeForm

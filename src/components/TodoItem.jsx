import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import SaveIcon from "@material-ui/icons/Save"
import React, { useRef, useState } from "react"
import { useStyles } from "../hooks/useStyles"
import ChangeForm from "./ChangeForm"

const TodoItem = ({ item, onDelete, onSaveChange, onCompleted }) => {
  const [editingId, setEdittingId] = useState(null)
  const inputRef = useRef()
  const classes = useStyles()

  // id for to detect which component is edited
  const handleEditItem = (id) => {
    if (editingId !== null) {
      if (!inputRef.current)
        throw new Error("Error when saving item changes! ⚠️")

      setEdittingId(null)
      onSaveChange(id, inputRef.current.value)
    } else {
      setEdittingId(id)
    }
  }

  const handleDeleteItem = () => {
    onDelete(item.id)
  }

  const itemStyle = {
    textDecoration: item.completed ? "line-through" : "none",
    opacity: item.completed ? "0.3" : "1",
  }

  const matchItem = editingId === item.id
  const matchItemNull = editingId === null

  const changeForm = (
    <ChangeForm
      ref={inputRef}
      content={item.content}
      id={item.id}
      onSaveChange={handleEditItem}
    />
  )

  const listItemText = (
    <div
      style={{
        width: "80%",
        wordBreak: "break-word",
      }}
    >
      <ListItemText
        disableTypography
        primary={<Typography variant="subtitle2">{item.content}</Typography>}
      ></ListItemText>
    </div>
  )

  return (
    <ListItem dense button disableGutters style={itemStyle}>
      <ListItemIcon style={{ minWidth: "20px" }}>
        <Checkbox
          checked={item.completed}
          inputProps={{ "aria-labelledby": item.id }}
          onChange={() => onCompleted(item.id)}
          className={`${classes.icon} ${classes.themeColor}`}
        />
      </ListItemIcon>
      {matchItemNull && listItemText}
      {matchItem && changeForm}
      <ListItemIcon>
        <IconButton aria-label="delete-todo-item" onClick={handleDeleteItem}>
          <DeleteIcon className={`${classes.icon} ${classes.themeColor}`} />
        </IconButton>
        <IconButton
          aria-label="edit-and-save"
          onClick={() => handleEditItem(item.id)}
        >
          {editingId === item.id ? (
            <SaveIcon className={`${classes.icon} ${classes.themeColor}`} />
          ) : (
            <EditIcon className={`${classes.icon} ${classes.themeColor}`} />
          )}
        </IconButton>
      </ListItemIcon>
    </ListItem>
  )
}

export default TodoItem

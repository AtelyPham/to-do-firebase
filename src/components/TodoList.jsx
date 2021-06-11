import { List } from "@material-ui/core"
import { useStyles } from "../hooks/useStyles"

const TodoList = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.mainList}>
      <List>{props.children}</List>
    </div>
  )
}

export default TodoList

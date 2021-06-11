import BottomNavigation from "@material-ui/core/BottomNavigation"
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction"
import React from "react"
import { useStyles } from "../hooks/useStyles"
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox"

const Filters = ({ value, setValue }) => {
  const classes = useStyles()

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const className = (input) =>
    input.toLowerCase() === value.toLowerCase()
      ? classes.bottomNavigationActionSelected
      : classes.bottomNavigationAction

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={`${classes.bottomNavigation} ${classes.themeColor} ${classes.themeBackgroundColor}`}
    >
      <BottomNavigationAction
        className={className("all")}
        label={"All"}
        value={"all"}
        icon={<LibraryAddCheckIcon />}
      />
      <BottomNavigationAction
        className={className("completed")}
        label={"Completed"}
        value={"completed"}
        icon={<CheckBoxIcon />}
      />
      <BottomNavigationAction
        className={className("not completed")}
        label={"Not Completed"}
        value={"not completed"}
        icon={<IndeterminateCheckBoxIcon />}
      />
    </BottomNavigation>
  )
}

export default React.memo(Filters)

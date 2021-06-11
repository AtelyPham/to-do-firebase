import classNames from "classnames"
import React, { useState } from "react"
import { useTheme, useUpdateTheme } from "../../context/ThemeContext"
import "./ToggleThemeButton.css"

const CheckedIcon = () => <>🌜</>
const UncheckedIcon = () => <>🌞</>

const ToggleButton = (props) => {
  const darkTheme = useTheme()
  const [dark, setDark] = useState(darkTheme)
  const updateTheme = useUpdateTheme()
  const { className } = props

  const triggerToggle = () => {
    const curTheme = !dark ? "dark" : "light"
    window.localStorage.setItem("theme", curTheme)
    updateTheme()
    setDark(!dark)
  }

  const toggleClasses = classNames(
    "wrg-toggle",
    {
      "wrg-toggle--checked": dark,
    },
    className
  )

  return (
    <div onClick={triggerToggle} className={toggleClasses}>
      <div className="wrg-toggle-container">
        <div className="wrg-toggle-check">
          <span>
            <CheckedIcon />
          </span>
        </div>
        <div className="wrg-toggle-uncheck">
          <span>
            <UncheckedIcon />
          </span>
        </div>
      </div>
      <div className="wrg-toggle-circle"></div>
      <input
        type="checkbox"
        aria-label="Toggle Button"
        className="wrg-toggle-input"
      />
    </div>
  )
}

export default ToggleButton

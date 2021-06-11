import { Container } from "@material-ui/core"
import React, { Suspense } from "react"
import { useStyles } from "../hooks/useStyles"
import Loading from "./Loading"
const Header = React.lazy(() => import("./Header"))
const Title = React.lazy(() => import("./Title"))
const TodoForm = React.lazy(() => import("./TodoForm"))
const DragAndDropList = React.lazy(() => import("./DragAndDropList"))
const Filters = React.lazy(() => import("./Filters"))

const AppContainer = (props) => {
  const classes = useStyles()
  const {
    user,
    list,
    onAdd,
    onDelete,
    onCompleted,
    onSaveChange,
    filterVal,
    setFilterVal,
    onLogIn,
  } = props

  const renderListComponent =
    (list !== [] && (
      <Suspense fallback={<Loading />}>
        <DragAndDropList
          list={list}
          onDelete={onDelete}
          onCompleted={onCompleted}
          onSaveChange={onSaveChange}
        />
      </Suspense>
    )) ||
    null

  return (
    <div className={classes.root}>
      <Suspense fallback={<Loading />}>
        <Header user={user} onLogIn={onLogIn} />
      </Suspense>
      <Container className={classes.main}>
        <Suspense fallback={<Loading />}>
          <Title />
          <TodoForm onAdd={onAdd} />
        </Suspense>
        {renderListComponent}
      </Container>
      <Suspense fallback={<Loading />}>
        <Filters value={filterVal} setValue={setFilterVal} />
      </Suspense>
    </div>
  )
}

export default AppContainer

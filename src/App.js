import React, { useEffect, useState } from "react"
import { DragDropContext } from "react-beautiful-dnd"
import AppContainer from "./components/AppContainer"
import Loading from "./components/Loading"
import { useAuth, useSignIn } from "./context/AuthContext"
import { firebaseDb } from "./firebase/firebase"
import { checkUserSignIn, randomId, writeListToDb, writeNewTodoItemToDb } from "./utils/utils"

const reorder = (list, startIdx, endIdx, mainList) => {
  const itemStart = list[startIdx]
  const itemEnd = list[endIdx]

  const indexStart = mainList.findIndex((e) => e.id === itemStart.id)
  const indexEnd = mainList.findIndex((e) => e.id === itemEnd.id)

  const [removed] = mainList.splice(indexStart, 1)
  mainList.splice(indexEnd, 0, removed)

  return mainList
}

const STORAGE_KEY_LOGIN_STATUS = "LoginStatus"

function App() {
  const [todoList, setTodoList] = useState([])
  const [filterVal, setFilterVal] = useState("all")
  const user = useAuth()
  const signIn = useSignIn()

  const loadingStatus = JSON.parse(window.localStorage.getItem(STORAGE_KEY_LOGIN_STATUS)) || false
  const [loading, setLoading] = useState(loadingStatus)

  useEffect(() => {
    let data = []
    if (checkUserSignIn(user)) {
      writeListToDb(user.uid, todoList).then(() => {
        window.localStorage.removeItem(STORAGE_KEY_LOGIN_STATUS)
        setLoading(false)
      })
      var userTodoRef = firebaseDb.ref("users/" + user.uid + "/todos")
      // Subcribe listener to firebase db
      userTodoRef.on("value", (snapshot) => {
        data = (snapshot.val() && Object.values(snapshot.val())) || []
        setTodoList(data)
      })
    } else setTodoList(data)
  }, [user])

  const onAdd = (content) => {
    if (!content) return
    if (checkUserSignIn(user)) {
      try {
        writeNewTodoItemToDb(user.uid, todoList, content)
      } catch (error) {
        // Catch error for UI here
        console.log(error)
      }
    } else {
      const newTodo = {
        id: randomId(),
        content,
        completed: false,
      }
      const newList = [...todoList, newTodo]
      setTodoList(newList)
    }
  }

  const onDelete = async (todoId) => {
    if (!todoId) return
    if (checkUserSignIn(user)) {
      const todoEntry = `users/${user.uid}/todos/${todoId}`
      const deletedTodoRef = firebaseDb.ref(todoEntry)
      try {
        deletedTodoRef.remove()
      } catch (error) {
        // catch error here
        console.log(error)
      }
    } else {
      setTodoList(todoList.filter((e) => e.id !== todoId))
    }
  }

  const onSaveChange = async (itemId, content) => {
    if (!itemId || !content) {
      // Catch UI for error here
      return
    }
    if (checkUserSignIn(user)) {
      const editContentEntry = `users/${user.uid}/todos/${itemId}/content`
      const userContentRef = firebaseDb.ref(editContentEntry)
      try {
        // update firebase db here
        userContentRef.set(content)
      } catch (error) {
        // Catch UI for error here
        console.log(error)
      }
    } else {
      const newList = [...todoList]
      const itemForUpdate = newList.find((e) => e.id === itemId)
      if (itemForUpdate) {
        itemForUpdate.content = content
        setTodoList(newList)
      }
    }
  }

  const onCompleted = async (todoId) => {
    if (!todoId) return

    if (checkUserSignIn(user)) {
      const completedItemEntry = `users/${user.uid}/todos/${todoId}/completed`
      const completedItemRef = firebaseDb.ref(completedItemEntry)
      try {
        const data = await completedItemRef.get()
        await completedItemRef.set(!data.val())
      } catch (error) {
        console.log(error)
      }
    } else {
      const newList = [...todoList]
      const completedItem = newList.find((e) => e.id === todoId)
      if (completedItem !== undefined) completedItem.completed = !completedItem.completed
      setTodoList(newList)
    }
  }

  const renderList = (() => {
    switch (filterVal) {
      case "all":
        return [...todoList]
      case "completed":
        return todoList.filter((e) => e.completed === true)
      case "not completed":
        return todoList.filter((e) => e.completed === false)
      default:
        return [...todoList]
    }
  })()

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const items = reorder(renderList, result.source.index, result.destination.index, [...todoList])

    setTodoList(items)
  }

  const onLogIn = () => {
    window.localStorage.setItem("todoList", JSON.stringify(todoList))
    window.localStorage.setItem(STORAGE_KEY_LOGIN_STATUS, JSON.stringify(true))
    signIn()
  }

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loading />
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppContainer
        user={user}
        list={renderList}
        onAdd={onAdd}
        onDelete={onDelete}
        onCompleted={onCompleted}
        onSaveChange={onSaveChange}
        filterVal={filterVal}
        setFilterVal={setFilterVal}
        onLogIn={onLogIn}
      />
    </DragDropContext>
  )
}

export default App

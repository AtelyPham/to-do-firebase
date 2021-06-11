import { firebaseDb } from "../firebase/firebase"

export const checkUserSignIn = (user) =>
  user && typeof user === "object" && user.uid

export const randomId = () => {
  return Math.trunc(Math.random() * 1000000000)
}

export const writeNewTodoItemToDb = (userId, list = [], content) => {
  if (!userId || !content || !Array.isArray(list)) {
    throw new Error("Empty content to write to DB!")
  }
  try {
    // Get a key for a new Post.
    const todoEntry = `users/${userId}/todos`
    var newEntryRef = firebaseDb.ref(todoEntry).push()

    // A post entry.
    var item = {
      id: newEntryRef.key,
      content,
      completed: false,
    }

    // Write the new post's data simultaneously in the posts list and the user's post list.
    newEntryRef.set(item)
  } catch (error) {
    console.log("Error when writning post to DB", error)
    throw new Error("Cannot write data to db")
  }
}

const createNewListToDb = (list = [], userId) => {
  if (!Array.isArray(list) || list === []) return
  return [...list].map((e) => {
    const todoEntry = `users/${userId}/todos`
    const newTodoRef = firebaseDb.ref(todoEntry).push()
    const newId = newTodoRef.key
    return {
      ...e,
      id: newId,
    }
  })
}

export const writeListToDb = async (userId, list = []) => {
  if (!userId || !Array.isArray(list))
    throw new Error("Error when writing list to database")

  let todoStore = window.localStorage.getItem("todoList")
  // null, undefined
  if (!Boolean(todoStore)) return

  todoStore = JSON.parse(todoStore)
  window.localStorage.removeItem("todoList")

  if (!Array.isArray(todoStore) || (list === [] && todoStore === [])) return

  const newList = list.concat(todoStore)

  try {
    const todoEntry = `users/${userId}/todos`
    const todosRef = firebaseDb.ref(todoEntry)
    const todosDataRef = await todosRef.get()
    const todosData = todosDataRef.val() || {}

    const data = createNewListToDb(newList, userId)
    data.forEach((o) => {
      todosData[o.id] = o
    })

    if (todosDataRef.val() === null) {
      const newEntry = `users/${userId}`
      const payload = {
        [newEntry]: {
          userId,
          todos: todosData,
        },
      }
      await firebaseDb.ref().update(payload)
    } else {
      todosRef.set(todosData)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

import { createContext, useContext, useEffect, useState } from "react"
import { auth, provider } from "../firebase/firebase"

const AuthContext = createContext()
const UpdateUserContext = createContext()
const SignOutContext = createContext()

export const useAuth = () => useContext(AuthContext)
export const useSignIn = () => useContext(UpdateUserContext)
export const useSignout = () => useContext(SignOutContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const unSubcribe = auth.onAuthStateChanged(function (user) {
      if (user) setCurrentUser(user)
      else setCurrentUser({})
    })

    return unSubcribe
  }, [])

  const signUpWithGoogle = async () => {
    try {
      await auth.signInWithRedirect(provider)
      const userRes = await auth.getRedirectResult()
      setCurrentUser(userRes.user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut()
      // Sign-out successful.
      setCurrentUser({})
    } catch (error) {
      throw new Error(error.message)
    }
  }

  return (
    <SignOutContext.Provider value={handleSignOut}>
      <UpdateUserContext.Provider value={signUpWithGoogle}>
        <AuthContext.Provider value={currentUser}>
          {children}
        </AuthContext.Provider>
      </UpdateUserContext.Provider>
    </SignOutContext.Provider>
  )
}

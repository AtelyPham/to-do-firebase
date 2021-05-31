import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase";

const AuthContext = createContext();
const UpdateUserContext = createContext();
const SignOutContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const useSignIn = () => useContext(UpdateUserContext);
export const useSignout = () => useContext(SignOutContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const unSubcribe = auth.onAuthStateChanged(function (user) {
      if (user) setCurrentUser(user);
      else setCurrentUser({});
    });

    return unSubcribe;
  }, []);

  const signUpWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => setCurrentUser(res))
      .catch((rej) => console.error(rej));
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        setCurrentUser({});
      })
      .catch((err) => {
        // An error happened.
        console.error(err);
      });
  };

  return (
    <SignOutContext.Provider value={handleSignOut}>
      <UpdateUserContext.Provider value={signUpWithGoogle}>
        <AuthContext.Provider value={currentUser}>
          {children}
        </AuthContext.Provider>
      </UpdateUserContext.Provider>
    </SignOutContext.Provider>
  );
};

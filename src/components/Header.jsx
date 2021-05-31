import React from "react";
import { useAuth, useSignIn, useSignout } from "../context/AuthContext";
import Loading from "./Loading";

const isEmptyObj = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

function Header() {
  const user = useAuth();
  const signIn = useSignIn();
  const signOut = useSignout();
  if (typeof user === "object") {
    return (
      <header>
        <div className="left">
          {!isEmptyObj(user)
            ? `Welcome back! ${user.displayName} 🎉😍`
            : "Hello! 👋👋"}
        </div>
        <div className="right">
          <button onClick={!isEmptyObj(user) ? signOut : signIn}>
            {!isEmptyObj(user) ? "Sign Out" : "Sign up"}
          </button>
        </div>
      </header>
    );
  } else {
    return <Loading />;
  }
}

export default Header;

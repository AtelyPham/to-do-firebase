import React from "react";

export default function SignIn({ handleSignIn }) {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

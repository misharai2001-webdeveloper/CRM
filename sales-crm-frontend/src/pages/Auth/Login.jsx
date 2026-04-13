import React from "react";
import "../../styles/forms.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Sign In</h2>

        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button>Login</button>
      </div>
    </div>
  );
}

export default Login;
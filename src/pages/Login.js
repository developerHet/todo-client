import React, { useState } from "react";
import { useLoginMutation } from "../store";
import { Link } from "react-router-dom";

import styles from "../styles/modules/login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { data, error }] = useLoginMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };


  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>Log In</div>
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{color: 'red',fontSize: '1.5rem', marginBottom: '10px'}}>
                {error.data ? error.data : "Server error"}
              </div>
            )}
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="email"
              value={email}
              placeholder="name@company.com"
            />
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              value={password}
              placeholder="••••••••"
            />
            <button className={styles.btn}>Log In</button>
            <Link className={styles.link} to="/register">
              Sing Up
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;

import React, { useState } from "react";
import { useRegisterMutation } from "../store";
import { Link, Navigate } from "react-router-dom";
import styles from "../styles/modules/login.module.scss";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register,{data,error}] = useRegisterMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    register({ name, email, password });
  };

  if(data) {
    return <Navigate to='/'/>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>Sign In</div>
          <form onSubmit={handleSubmit}>
          {error && (
              <div style={{color: 'red',fontSize: '1.5rem', marginBottom: '10px'}}>
                {error.data ? error.data : "Server error"}
              </div>
            )}
            <input
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
              name="name"
              value={name}
              placeholder="Het Patel"
            />
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
            <button className={styles.btn}>Sign Up</button>

            <Link to="/login" className={styles.link}>
              Log In
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default Register;

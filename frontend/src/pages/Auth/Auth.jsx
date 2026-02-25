import { registerUser, loginUser } from "../../services/users.api";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Auth.module.css";
import { useUserStore } from "../../store/useUserStore";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const login = useUserStore((state) => state.login);
const loading = useUserStore((state) => state.loading);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isLogin) {
      const result = await login({
        email: form.email,
        password: form.password,
      });

      if (result.success) {
        alert("Login successful");
        window.location.href = "/profile";
      } else {
        alert(result.message);
      }
    } else {
      await registerUser({
        full_name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registration successful. Please login.");
      setIsLogin(true);
    }
  } catch (err) {
    alert("Error occurred");
  }
};

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.card}>
          <h2>{isLogin ? "Login" : "Create Account"}</h2>

          <div className={styles.toggle}>
            <button
              className={isLogin ? styles.active : ""}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={!isLogin ? styles.active : ""}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                onChange={handleChange}
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={handleChange}
            />

            {!isLogin && (
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                onChange={handleChange}
              />
            )}

           <button type="submit" className={styles.submitBtn}>
  {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
</button>
          </form>

          <p className={styles.switchText}>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Register" : " Login"}
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}
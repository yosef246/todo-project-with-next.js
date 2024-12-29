"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Signup() {
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormatData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormatData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage(data.message || "Login successful!");
      router.push("/createtodo"); //אם הכל עבר בסדר והמידע קיים במערכת אז הוא מעביר אותך אל הדף המבוקש
    } else {
      setMessage(data.message || "Something went wrong.");
    }

    setFormatData({
      email: "",
      password: "",
    });
  }

  //מקציב 3 שניות להודעה
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000); // 5000ms = 5 seconds
      return () => clearTimeout(timer); // מנקה את הטיימר במידה וההודעה משתנה לפני הזמן
    }
  }, [message]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className={styles.button} type="submit">
          SignIn
        </button>
      </form>
      <div className={styles.linkWrapper}>
        <div className={styles.linkContainerhome}>
          <Link href={"/deshbord/register"}>Register</Link>
        </div>
        <div className={styles.linkContainerhome}>
          <Link href={"/"}>Home</Link>
        </div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

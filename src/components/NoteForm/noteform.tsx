"use client";
import styles from "./noteform.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NoteFormProps {
  newNote: {
    title: string;
    description: string;
  };
  setNewNote: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
    }> //React.SetStateAction – מאפשר להעביר גם אובייקט חדש וגם פונקציה שמחזירה אובייקט.
  >; //React.Dispatch – הטייפ עבור הפונקציה setState של React.
  onSubmit: () => void;
}

export default function NoteForm({
  newNote,
  setNewNote,
  onSubmit,
}: NoteFormProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // מצב האימות
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const router = useRouter();

  //בודק האם יש טוקאן ואתה רשאי להמשיך לדף הבא
  useEffect(() => {
    async function checkAuth() {
      setIsLoadingAuth(true);
      try {
        const response = await fetch("/auth/checktoken", {
          method: "GET",
          credentials: "include", // מאפשר שליחת קוקיז לשרת
        });

        if (!response.ok) {
          const data = await response.json();
          router.replace("/"); // אם אין טוקן, הפנה לדף הבית
          console.log(data.message);
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.replace("/"); // במקרה של שגיאה, הפנה לדף הבית
      }
      setIsLoadingAuth(false);
    }

    checkAuth();
  }, [router]);

  if (isLoadingAuth) {
    return <p className={styles.loading}>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={styles.inputContainer}>
      <h1 className={styles.title}>Notes</h1>
      <input
        type="text"
        name="title"
        value={newNote.title}
        onChange={(e) =>
          setNewNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
        placeholder="Write a title..."
        className={styles.input}
      />
      <textarea
        name="description"
        value={newNote.description}
        onChange={(e) =>
          setNewNote((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
        placeholder="Write a description..."
        className={styles.input}
      />
      <button onClick={onSubmit} className={styles.addButton}>
        Add
      </button>
    </div>
  );
}

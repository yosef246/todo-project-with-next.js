"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import NoteForm from "@/components/NoteForm/noteform";
import NoteList from "@/components/NoteList/noteliste";

interface Note {
  _id: string;
  title: string;
  description: string;
}

export default function NotesApp() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();

  //מקציב 2 שניות להודעה = message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 2000); // 2000ms = 2 seconds
      return () => clearTimeout(timer); // מנקה את הטיימר במידה וההודעה משתנה לפני הזמן
    }
  }, [message]);

  //פונקציה שקוראת לכל הפתקים
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/todo`
        );
        if (response.ok) {
          const result = await response.json();
          setNotes(result.tasks);
          setMessage(result.message);
        } else {
          throw new Error("Failed to fetch data.");
        }
      } catch (err) {
        console.log("Error fetching notes", err);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  //פונקציה להוספת פתק
  async function addNote() {
    if (!newNote.title.trim() || !newNote.description.trim()) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/todo`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNote),
      }
    );

    if (response.ok) {
      const newNoteData = await response.json();

      setNotes((prevData) => [
        ...prevData,
        {
          _id: newNoteData._id,
          title: newNote.title,
          description: newNote.description,
        },
      ]);

      setMessage(newNoteData.message);
    } else {
      console.log("status error", response.status);
    }

    setNewNote({
      title: "",
      description: "",
    });
  }

  // פונקציה למחיקת פתק
  async function deleteNote(id: string) {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/todo/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
        const data = await response.json();
        setMessage(data.message);
      } else {
        console.error("Error deleting note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
    setLoading(false);
  }

  //פונקציה לשינוי הפתק
  async function updateNote(
    id: string,
    updatedNote: {
      title: string;
      description: string;
    }
  ) {
    try {
      const existingNote = notes.find((note) => note._id === id); //מוצא לי את הערך שקיים כבר

      if (!existingNote) {
        console.error("Note not found");
        return;
      }

      const finalNote = {
        //פה בעצם אני אומר שאתה שווה או לערך שהיה קיים לפני
        //או לערך שעכשיו השתנה וזה כדי שלא יקרה מצב שהוא ישלח אותו ריק
        title: updatedNote.title || existingNote.title,
        description: updatedNote.description || existingNote.description,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/todo/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalNote),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.json();
        setMessage(errorMessage.message || "Failed to update note");
      }

      const updatedData = await response.json();
      setMessage(updatedData.message || "Note updated successfully");

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, ...updatedData } : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  //פונקציה להתנתקות המשתמש
  async function logout() {
    //מוחק למשתמש את הקוקיז רק ולא אותו עצמו וכך בעצם מנתק אותו מהמערכת
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
      } else {
        setMessage("Logout failed. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    router.replace("/");
  }

  return (
    <div className={styles.container}>
      <button className={styles.logoutButton} onClick={logout}>
        Logout
      </button>
      <NoteForm newNote={newNote} setNewNote={setNewNote} onSubmit={addNote} />
      <NoteList
        loading={loading}
        notes={notes}
        onDelete={deleteNote}
        updateNote={updateNote}
      />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}

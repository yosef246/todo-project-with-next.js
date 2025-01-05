"use client";
import { useState } from "react";
import styles from "./noteitem.module.css";

interface NoteItemProps {
  note: {
    _id: string;
    title: string;
    description: string;
  };
  onDelete: (id: string) => void; //מקבל איידי כערך כדי להביא אותו לפונקציית המקור לטיפול
  updateNote: (
    id: string,
    updatedNote: { title: string; description: string }
  ) => void; //מקבל איידי כערך כדי להביא אותו לפונקציית המקור לטיפול
}

export default function NoteItem({
  note,
  onDelete,
  updateNote,
}: NoteItemProps) {
  const [edit, setEdit] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  function updataHandle(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (editedTitle === "" && editedDescription === "") return;
    updateNote(note._id, {
      title: editedTitle,
      description: editedDescription,
    });
    setEditedTitle("");
    setEditedDescription("");
  }

  return (
    <li key={note._id} className={styles.note}>
      <div className={styles.noteContainer}>
        <h3 className={styles.noteTitle}>{note.title}</h3>
        <p className={styles.noteDescription}>{note.description}</p>
        {edit === note._id && (
          <>
            <input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Update the title..."
              className={styles.inputedit}
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Update the description..."
              className={styles.inputedit}
            />
          </>
        )}
        <div className={styles.noteButtons}>
          {edit === note._id ? (
            <>
              <button onClick={updataHandle} className={styles.noteButton}>
                Update
              </button>
              <button
                className={styles.noteButton}
                onClick={() => setEdit(null)}
              >
                Cencel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onDelete(note._id);
                }}
                className={styles.noteButton}
              >
                Delete
              </button>
              <button
                className={styles.noteButton}
                onClick={() => setEdit(note._id)}
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

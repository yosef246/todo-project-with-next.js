"use client";
import styles from "./notelist.module.css";
import NoteItem from "../NoteItem/noteitem";

interface Note {
  _id: string;
  title: string;
  description: string;
}

interface NoteListProps {
  notes: Note[];
  onDelete: (id: string) => void;
  updateNote: (
    id: string,
    updatedNote: { title: string; description: string }
  ) => void;
  loading: boolean;
}

export default function NoteList({
  notes,
  updateNote,
  onDelete,
  loading,
}: NoteListProps) {
  if (loading) {
    return <p className={styles.loading}>Loading . . .</p>;
  }

  return notes.length > 0 ? (
    <ul className={styles.notesList}>
      {notes.map((note) => {
        return (
          <NoteItem
            key={note._id}
            note={note}
            onDelete={onDelete}
            updateNote={updateNote}
          />
        );
      })}
    </ul>
  ) : (
    <p className={styles.loading}>No notes available</p>
  );
}

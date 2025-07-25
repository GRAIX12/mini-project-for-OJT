"use client";

import { FormEvent, useState, useEffect } from "react";
import { User } from "@/app/types/User";
import styles from "@/styles/table.module.css";

interface Props {
  user: User | null;
  onUpdate: (u: User) => void;
  onClose: () => void;
}

export default function EditUserModal({ user, onUpdate, onClose }: Props) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onUpdate({ ...user, name, email });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.modalForm}>
        <h2 className={styles.modalTitle}>Update User</h2>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <div className={styles.modalButtons}>
          <button type="submit" className={styles.updateButton}>
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
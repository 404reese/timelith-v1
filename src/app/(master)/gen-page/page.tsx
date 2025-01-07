"use client";

import styles from "../pg.module.css"; // Import the CSS Module

export default function genpage() {
  return (
    <div className="flex">
      <main className="p-4 rounded-lg bg-white border border-gray-200 w-full h-screen">
        <div className={styles.container}>
          <h2 className={styles.title}>Generation Page</h2>
        </div>
      </main>
    </div>
  );
}
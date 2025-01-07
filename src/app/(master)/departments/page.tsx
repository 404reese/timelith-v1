"use client";

import React, { useEffect, useState } from "react";
import styles from "../pg.module.css";
import { Button } from "@/components/ui/button";
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";

// Define the Department interface
interface Department {
  name: string;
  acronym: string;
}

const About: React.FC = () => {
  // Use the Department type for the state
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('/data/dept.json'); // Update the path as necessary
        const data: Department[] = await response.json(); // Specify the type of data
        setDepartments(data);
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div className="flex">
      <main className="p-4 rounded-lg bg-white border border-gray-200 w-full h-screen">
        <div className={styles.container}>
          <h1 className={styles.title}>Department Records</h1>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr className={styles.tableRow}>
                <th>Name</th>
                <th>Acronym</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {departments.map((dept, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td>{dept.name}</td>
                  <td>{dept.acronym}</td>
                  <td>
                    <Button variant="edit"><FiEdit3 /></Button>
                    <Button variant="del"><MdOutlineDelete /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default About;
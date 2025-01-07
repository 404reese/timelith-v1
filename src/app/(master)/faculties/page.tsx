"use client";

import { useState, useEffect } from "react";
import styles from "../pg.module.css"; // Import the CSS Module
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import necessary components

// Define a type for the record
interface Record {
  id: string;
  name: string;
  subject: string;
  department: string; // Add department field to the Record type
}

export default function InstructorRecords() {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [department, setDepartment] = useState<string>("AI-DS"); // State for department
  const [records, setRecords] = useState<Record[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editableRecord, setEditableRecord] = useState<{
    record: Record | null;
    index: number | null;
  }>({ record: null, index: null });

  // Use effect to fetch the dummy data from the JSON file
  useEffect(() => {
    fetchRecords();
  }, []);

  // Fetch records from the JSON file (simulating a database)
  const fetchRecords = async () => {
    try {
      const response = await fetch("/data/faculties.json"); // Assuming the JSON file is placed in the public folder
      const data: Record[] = await response.json();
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  const handleAddRecord = () => {
    if (id && name && subject) {
      const newRecord = { id, name, subject, department };
      setRecords([...records, newRecord]); // Add the new record to the local state
      resetForm();
    }
  };

  const handleDeleteRecord = (index: number) => {
    const newRecords = records.filter((_, i) => i !== index); // Remove the record from the local state
    setRecords(newRecords);
  };

  const handleEditRecord = (record: Record, index: number) => {
    setEditMode(true);
    setEditableRecord({ record, index });
    setId(record.id);
    setName(record.name);
    setSubject(record.subject);
    setDepartment(record.department); // Set department for editing
  };

  const handleUpdateRecord = () => {
    if (editableRecord.index !== null) {
      const updatedRecords = [...records];
      updatedRecords[editableRecord.index] = {
        id,
        name,
        subject,
        department,
      };
      setRecords(updatedRecords);
      resetForm();
    }
  };

  const resetForm = () => {
    setEditMode(false);
    setId("");
    setName("");
    setSubject("");
    setDepartment("AI-DS"); // Reset to default department
  };

  return (
    <div className="flex">
      <main className="p-4 rounded-lg bg-white border border-gray-200 w-full h-screen">
        <div className={styles.container}>
          <h2 className={styles.title}>Instructor Records</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              editMode ? handleUpdateRecord() : handleAddRecord();
            }}
          >
            <div className={styles.inputRow}>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="id">
                  Instructor ID
                </Label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="id"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="name">
                  Name
                </Label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="subject">
                  Subject
                </Label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="department">
                  Department
                </Label>
                <Select onValueChange={setDepartment} value={department}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="AI&DS">AI&DS</SelectItem>
                      <SelectItem value="BSH">BSH</SelectItem>
                      <SelectItem value="COMPS">COMPS</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="EXTC">EXTC</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="add">
                {editMode ? "Update Record" : "Add Record"}
              </Button>
            </div>
          </form>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Instructor ID</th>
                <th>Name</th>
                <th>Subject</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td>{record.id}</td>
                  <td>{record.name}</td>
                  <td>{record.subject}</td>
                  <td>{record.department}</td>
                  <td>
                    <Button
                      variant="edit"
                      onClick={() => handleEditRecord(record, index)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="del"
                      onClick={() => handleDeleteRecord(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.navigation}>
            <Link href="/Courses" passHref>
              <Button
                variant="bottom"
                size="lg"
                onClick={() => {
                  console.log("Previous Section");
                }}
              >
                ← Previous Section
              </Button>
            </Link>
            <Link href="/Classrooms" passHref>
              <Button
                variant="bottom"
                size="lg"
                onClick={() => {
                  console.log("Next Section");
                }}
              >
                Next Section →
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

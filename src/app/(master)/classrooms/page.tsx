"use client";

import { useEffect, useState } from 'react';
import styles from '../pg.module.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'; // Import Shadcn dropdown components
import Link from 'next/link';

// Define a type for the record
interface Record {
  classroom_number: string;
  capacity: number;
  type: string;
  courses: string;
  home_department: string;
}

export default function ClassroomRecords() {
  const [classroom_number, setClassroomNumber] = useState<string>('');
  const [capacity, setCapacity] = useState<number | ''>('');
  const [type, setType] = useState<string>('Classroom'); // Default value
  const [courses, setCourses] = useState<string>(''); // Default value
  const [home_department, setHomeDepartment] = useState<string>(''); // Default value
  const [records, setRecords] = useState<Record[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editableRecord, setEditableRecord] = useState<{ record: Record | null; index: number | null }>({ record: null, index: null });

  // Fetch records from the JSON file
  const fetchRecords = async () => {
    try {
      const response = await fetch('/data/classrooms.json'); // Assuming the JSON file is placed in the public folder
      const data: Record[] = await response.json();
      setRecords(data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleAddRecord = () => {
    if (classroom_number && capacity) {
      const newRecord = {
        classroom_number,
        capacity: Number(capacity),
        type,
        courses,
        home_department
      };
      setRecords((prevRecords) => [...prevRecords, newRecord]);
      resetForm();
    }
  };

  const resetForm = () => {
    setClassroomNumber('');
    setCapacity('');
    setType('Classroom');
    setCourses('');
    setHomeDepartment('');
  };

  const handleDeleteRecord = (index: number) => {
    setRecords(records.filter((_, i) => i !== index)); // Remove the record from local state
  };

  const handleEditRecord = (record: Record, index: number) => {
    setEditMode(true);
    setEditableRecord({ record, index });
    setClassroomNumber(record.classroom_number);
    setCapacity(record.capacity);
    setType(record.type);
    setCourses(record.courses);
    setHomeDepartment(record.home_department);
  };

  const handleUpdateRecord = () => {
    if (editableRecord.index !== null) {
      const updatedRecords = [...records];
      updatedRecords[editableRecord.index] = {
        classroom_number,
        capacity: Number(capacity),
        type,
        courses,
        home_department
      };
      setRecords(updatedRecords);
      setEditMode(false);
      resetForm();
    }
  };

  return (
    <div className="flex">
      <main className="p-4 rounded-lg bg-white border border-gray-200 w-full h-screen">
        <div className={styles.container}>
          <h2 className={styles.title}>Classroom Records</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              editMode ? handleUpdateRecord() : handleAddRecord();
            }}
          >
            <div className={styles.inputRow}>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="classroom_number">Room Number</Label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="classroom_number"
                  value={classroom_number}
                  onChange={(e) => setClassroomNumber(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="capacity">Capacity</Label>
                <Input
                  className={styles.inputField}
                  type="number"
                  id="capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                />
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className={styles.inputField}>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Classroom">Classroom</SelectItem>
                    <SelectItem value="Lab">Lab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="courses">Courses</Label>
                <Select value={courses} onValueChange={setCourses}>
                  <SelectTrigger className={styles.inputField}>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="course1">Theory</SelectItem>
                    <SelectItem value="course2">NLP Lab</SelectItem>
                    <SelectItem value="course3">BEE Lab</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="home_department">Home Department</Label>
                <Select value={home_department} onValueChange={setHomeDepartment}>
                  <SelectTrigger className={styles.inputField}>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI&DS">AI&DS</SelectItem>
                    <SelectItem value="BSH">BSH</SelectItem>
                    <SelectItem value="COMPS">COMPS</SelectItem>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="EXTC">EXTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Button type="submit" variant="add">
                {editMode ? 'Update Record' : 'Add Record'}
              </Button>
            </div>
          </form>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Room Number</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Courses</th>
                <th>Home Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td>{record.classroom_number}</td>
                  <td>{record.capacity}</td>
                  <td>{record.type}</td>
                  <td>{record.courses}</td>
                  <td>{record.home_department}</td>
                  <td>
                    <Button variant="edit" onClick={() => handleEditRecord(record, index)}>Edit</Button>
                    <Button variant="del" onClick={() => handleDeleteRecord(index)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.navigation}>
            <Link href="/Faculties" passHref>
              <Button 
                variant="bottom" 
                size='lg'
              >
                ← Previous Section
              </Button>
            </Link>
            <Link href="/Divisions" passHref>
              <Button 
                variant="bottom" 
                size='lg'
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

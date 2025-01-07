"use client";

import { useEffect, useState } from 'react';
import styles from '../pg.module.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import Link from 'next/link';

interface Record {
  id: number;
  courseCode: string;
  courseName: string;
  semester: string;
  lecturesPerWeek: string;
  department: string;
  type: string;
  periodDuration: number;
}

export default function CourseRecords() {
  const [courseCode, setCourseCode] = useState<string>('');
  const [courseName, setCourseName] = useState<string>('');
  const [semester, setSemester] = useState<string>(''); 
  const [lecturesPerWeek, setLecturesPerWeek] = useState<string>('');
  const [department, setDepartment] = useState<string>(''); 
  const [type, setType] = useState<string>(''); 
  const [periodDuration, setPeriodDuration] = useState<number | ''>(''); 
  const [records, setRecords] = useState<Record[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editableRecord, setEditableRecord] = useState<{ record: Record | null; index: number | null }>({ record: null, index: null });

  // Fetch records from the local JSON file
  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch('/data/courses.json');  // Assuming courses.json is in the public folder
      const data = await response.json();

      const formattedData = data.map((item: any) => ({
        id: item.id,
        courseCode: item.courseCode,
        courseName: item.courseName,
        semester: item.semester,
        lecturesPerWeek: item.lecturesPerWeek,
        department: item.department,
        type: item.type,
        periodDuration: item.periodDuration
      }));

      setRecords(formattedData);
    };

    fetchRecords();
  }, []);

  // Handle adding a record
  const handleAddRecord = () => {
    if (courseCode && courseName && semester && lecturesPerWeek && department && type && periodDuration) {
      const newRecord: Record = {
        id: Date.now(),  // Generate a simple id based on the current timestamp
        courseCode, 
        courseName, 
        semester, 
        lecturesPerWeek, 
        department,
        type,
        periodDuration
      };

      setRecords([...records, newRecord]);
      resetForm();
    }
  };

  // Reset form fields
  const resetForm = () => {
    setCourseCode('');
    setCourseName('');
    setSemester('');
    setLecturesPerWeek('');
    setDepartment('');
    setType('');
    setPeriodDuration('');
    setEditMode(false);
    setEditableRecord({ record: null, index: null });
  };

  // Handle deleting a record
  const handleDeleteRecord = (id: number) => {
    const newRecords = records.filter(record => record.id !== id);
    setRecords(newRecords);
  };

  // Handle editing a record
  const handleEditRecord = (record: Record, index: number) => {
    setEditMode(true);
    setEditableRecord({ record, index });
    setCourseCode(record.courseCode);
    setCourseName(record.courseName);
    setSemester(record.semester);
    setLecturesPerWeek(record.lecturesPerWeek);
    setDepartment(record.department);
    setType(record.type);
    setPeriodDuration(record.periodDuration);
  };

  // Handle updating a record
  const handleUpdateRecord = () => {
    if (editableRecord.index !== null && editableRecord.record) {
      const updatedRecords = [...records];
      updatedRecords[editableRecord.index] = { 
        ...editableRecord.record, 
        courseCode, 
        courseName, 
        semester, 
        lecturesPerWeek, 
        department, 
        type, 
        periodDuration 
      };
      setRecords(updatedRecords);
      resetForm();
    }
  };

  return (
    <div className="flex">
      <main className="p-4 rounded-lg bg-white border border-gray-200 w-full h-screen">
        <div className={styles.container}>
          <h2 className={styles.title}>Course Records</h2>
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              editMode ? handleUpdateRecord() : handleAddRecord();
            }}
          >
            <div className={styles.inputRow}>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="courseCode">Course Code</Label>
                <Input className={styles.inputField} type="text" id="courseCode" value={courseCode} onChange={(e) => setCourseCode(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="courseName">Course Name</Label>
                <Input className={styles.inputField} type="text" id="courseName" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="semester">Semester</Label>
                <Select value={semester} onValueChange={setSemester}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          Sem {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="lecturesPerWeek">Lectures per Week</Label>
                <Select value={lecturesPerWeek} onValueChange={setLecturesPerWeek}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select lectures per week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className={styles.inputRow}>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="department">Department</Label>
                <Select value={department} onValueChange={setDepartment}>
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
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="type">Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="lecture">Core</SelectItem>
                      <SelectItem value="lab">Lab</SelectItem>
                      <SelectItem value="elective">Elective</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className={styles.formGroup}>
                <Label className={styles.label} htmlFor="periodDuration">Period Duration</Label>
                <Select value={periodDuration} onValueChange={setPeriodDuration}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectGroup>
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
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Type</th>
                <th>Period Duration</th>
                <th>Semester</th>
                <th>Lectures per Week</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className={styles.tableRow}>
                  <td>{record.courseCode}</td>
                  <td>{record.courseName}</td>
                  <td>{record.department}</td>
                  <td>{record.type}</td>
                  <td>{record.periodDuration}</td>
                  <td>{record.semester}</td>
                  <td>{record.lecturesPerWeek}</td>
                  <td>
                    <Button variant="edit" onClick={() => handleEditRecord(record, records.findIndex(r => r.id === record.id)!)}>
                      Edit
                    </Button>
                    <Button variant="del" onClick={() => handleDeleteRecord(record.id)}>Delete</Button>
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

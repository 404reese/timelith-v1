"use client";

import styles from '../pg.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const years = [
  { value: 'FY', label: 'FY' },
  { value: 'SY', label: 'SY' },
  { value: 'TY', label: 'TY' },
  { value: 'LY', label: 'LY' },
];

const divisions = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E' },
  { value: 'F', label: 'F' },
  { value: 'G', label: 'G' },
  { value: 'H', label: 'H' },
];

const departments = [
  { value: 'AI&DS', label: 'AI&DS' },
  { value: 'BSH', label: 'BSH' },
  { value: 'COMPS', label: 'COMPS' },
  { value: 'IT', label: 'IT' },
  { value: 'EXTC', label: 'EXTC' },
];

const batches = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
];

const DivisionPage = () => {
  const [department, setDepartment] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [division, setDivision] = useState<string>('');
  const [strength, setStrength] = useState<string>('');
  const [batch, setBatch] = useState<string>('');
  const [data, setData] = useState<{ department: string; year: string; division: string; strength: string; batch: string; }[]>([]);

  // Fetch records from the JSON file
  const fetchRecords = async () => {
    try {
      const response = await fetch('/data/divisions.json'); // Fetch the JSON file
      const data = await response.json();
      setData(data); // Set the fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newData = { department, year, division, strength: Number(strength), batch: Number(batch) };

    // Add the new data to the local state
    setData(prevData => [...prevData, newData]);

    // Reset form fields
    setDepartment('');
    setYear('');
    setDivision('');
    setStrength('');
    setBatch('');
  };

  return (
    <div className="flex">
      <main className="p-4 rounded-lg bg-white border border-gray-200 w-full h-screen items-center">
        <div className={styles.container}>
          <h1 className={styles.title}>Division Records</h1>
        </div>
        <Card className="max-w-3xl mx-auto">
          <CardContent className='mt-4'>
            <form onSubmit={handleSubmit}>
              <div className="flex mb-4">
                <div className="flex-1 mr-2">
                  <Label className={styles.label} htmlFor="department">Department</Label>
                  <Select onValueChange={setDepartment}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map(dept => (
                        <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 mx-2">
                  <Label className={styles.label} htmlFor="year">Year</Label>
                  <Select onValueChange={setYear}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1 ml-2">
                  <Label className={styles.label} htmlFor="division">Division</Label>
                  <Select onValueChange={setDivision}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Division" />
                    </SelectTrigger>
                    <SelectContent>
                      {divisions.map(division => (
                        <SelectItem key={division.value} value={division.value}>{division.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex mb-4">
                <div className="flex-1 mr-2">
                  <Label className={styles.label} htmlFor="strength">Division Strength</Label>
                  <Input id="strength" type="number" value={strength} onChange={(e) => setStrength(e.target.value)} />
                </div>
                <div className="flex-1 ml-2">
                  <Label className={styles.label} htmlFor="batch">Number of Batches</Label>
                  <Select onValueChange={setBatch}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map(batch => (
                        <SelectItem key={batch.value} value={batch.value}>{batch.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
          <CardFooter>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th>Department</th>
                  <th>Year</th>
                  <th>Division</th>
                  <th>Strength</th>
                  <th>Batch</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr className={styles.tableRow} key={index}>
                    <td>{item.department}</td>
                    <td>{item.year}</td>
                    <td>{item.division}</td>
                    <td>{item.strength}</td>
                    <td>{item.batch}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardFooter>
        </Card>
        <div className="flex justify-center w-full mt-8 space-x-4">
            <Link href="/Classrooms" passHref>
              <Button 
                variant="bottom" 
                size='lg'
              >
                ← Previous Section
              </Button>
            </Link>
            <Link href="/Timeslots" passHref>
              <Button 
                variant="bottom" 
                size='lg'
              >
                Next Section →
              </Button>
            </Link>
        </div>
      </main>
    </div>
  );
};

export default DivisionPage;

"use client";

import { useEffect, useState } from 'react';
import styles from '../pg.module.css';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface Department {
  id: number;
  name: string;
  dataEntryComplete: boolean;
  deadline: string;
}

export default function Home() {
  const [departments, setDepartments] = useState<Department[]>([
    { id: 1, name: 'Artificial Intelligence and Data Science', dataEntryComplete: true, deadline: '2024-11-01' },
    { id: 2, name: 'Basic Sciences and Humanities', dataEntryComplete: false, deadline: '2024-11-01' },
    { id: 3, name: 'Computer Engineering', dataEntryComplete: true, deadline: '2024-11-01' },
    { id: 4, name: 'Information Technology', dataEntryComplete: false, deadline: '2024-11-01' },
    { id: 5, name: 'Electronics and Telecommunication', dataEntryComplete: false, deadline: '2024-11-01' },
  ]);

  return (
    <div className="flex">
      <main className="rounded-lg bg-white border border-gray-200 w-full h-screen">
        <div className="home mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center">Department Data Entry Status</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 border-b text-center">Department</th>
                <th className="py-3 px-4 border-b text-center">Data Entry Status</th>
                <th className="py-3 px-4 border-b text-center">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-center">{dept.name}</td>
                  <td className="py-3 px-4 border-b text-center">
                    {dept.dataEntryComplete ? (
                      <span className="text-green-600 font-medium">Complete</span>
                    ) : (
                      <span className="text-red-600 font-medium">Pending</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b text-center">{dept.deadline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
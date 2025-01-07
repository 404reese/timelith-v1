"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import styles from "../pg.module.css";
import { generateSlots, convertTo24Hour, formatTime } from './timeslotUtils'; // Adjust the path as necessary

const Days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TimeslotInput: React.FC = () => {
    const [selectedDay, setSelectedDay] = useState<string>("");
    const [startHour, setStartHour] = useState<string>("12");
    const [startMinute, setStartMinute] = useState<string>("00");
    const [startPeriod, setStartPeriod] = useState<string>("AM");
    
    const [endHour, setEndHour] = useState<string>("12");
    const [endMinute, setEndMinute] = useState<string>("00");
    const [endPeriod, setEndPeriod] = useState<string>("AM");

    const [numBreaks, setNumBreaks] = useState<number>(0);
    const [breaks, setBreaks] = useState<{ startHour: string; startMinute: string; startPeriod: string; endHour: string; endMinute: string; endPeriod: string }[]>([]);
    const [entries, setEntries] = useState<{ day: string; startTime: string; endTime: string; slots: string[] }[]>([]);
    
    // Load the dummy timeslot data from the JSON file
    useEffect(() => {
        const loadTimeslotData = async () => {
            const response = await fetch("/timeslots.json");
            const data = await response.json();
            setEntries(data);
        };
        loadTimeslotData();
    }, []);

    const handleDayClick = (day: string) => {
        setSelectedDay(day);
        resetForm();
    };

    const resetForm = () => {
        setStartHour("12");
        setStartMinute("00");
        setStartPeriod("AM");
        setEndHour("12");
        setEndMinute("00");
        setEndPeriod("AM");
        setNumBreaks(0);
        setBreaks([]);
    };

    const addBreaks = () => {
        const newBreaks = [...breaks];
        for (let i = 0; i < numBreaks; i++) {
            newBreaks.push({ startHour: "12", startMinute: "00", startPeriod: "AM", endHour: "12", endMinute: "00", endPeriod: "AM" });
        }
        setBreaks(newBreaks);
    };

    const updateBreakTime = (index: number, type: 'start' | 'end', field: 'hour' | 'minute' | 'period', value: string) => {
        const newBreaks = [...breaks];
        newBreaks[index][`${type}${field.charAt(0).toUpperCase() + field.slice(1)}`] = value;
        setBreaks(newBreaks);
    };

    const addEntry = () => {
        if (selectedDay) {
            const startTime = convertTo24Hour(startHour, startMinute, startPeriod);
            const endTime = convertTo24Hour(endHour, endMinute, endPeriod);
            const slots = generateSlots(startTime, endTime, breaks);
            setEntries([...entries, { day: selectedDay, startTime: formatTime(startTime), endTime: formatTime(endTime), slots }]);
            resetForm();
        }
    };

    return (
        <div className="flex">
            <main className="p-4 rounded-lg bg-white border border-gray-200 w-full h-screen">
                <div className={styles.container}>
                    <h2 className={styles.title}>Timeslot Records</h2>
                </div>

                <Card>
                    <CardContent className="mb-3 mr-3 ml-3 mt-3 p-4 rounded-lg bg-white border border-gray-200">
                        <h2>Select Timeslot</h2>
                        <div>
                            {Days.map((day) => (
                                <Button
                                    key={day}
                                    onClick={() => handleDayClick(day)}
                                    variant={selectedDay === day ? "add" : "default"}
                                    style={{ marginRight: '10px' }}
                                >
                                    {day}
                                </Button>
                            ))}
                        </div>

                        {selectedDay && (
                            <div style={{ marginTop: 20 }}>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Label>Start Time</Label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Input
                                            type="number"
                                            value={startHour}
                                            min={1}
                                            max={12}
                                            onChange={(e) => setStartHour(e.target.value)}
                                            style={{ width: '60px', marginRight: '5px' }}
                                        />
                                        <span>:</span>
                                        <Input
                                            type="number"
                                            value={startMinute}
                                            min={0}
                                            max={59}
                                            onChange={(e) => setStartMinute(e.target.value)}
                                            style={{ width: '60px', marginRight: '5px' }}
                                        />
                                        <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)} style={{ marginLeft: '5px' }}>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>

                                    <Label>End Time</Label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Input
                                            type="number"
                                            value={endHour}
                                            min={1}
                                            max={12}
                                            onChange={(e) => setEndHour(e.target.value)}
                                            style={{ width: '60px', marginRight: '5px' }}
                                        />
                                        <span>:</span>
                                        <Input
                                            type="number"
                                            value={endMinute}
                                            min={0}
                                            max={59}
                                            onChange={(e) => setEndMinute(e.target.value)}
                                            style={{ width: '60px', marginRight: '5px' }}
                                        />
                                        <select value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)} style={{ marginLeft: '5px' }}>
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>

                                <Label>Number of Breaks</Label>
                                <Input
                                    type="number"
                                    min={0}
                                    value={numBreaks}
                                    onChange={(e) => setNumBreaks(Number(e.target.value))}
                                    onBlur={addBreaks}
                                />

                                {breaks.map((breakTime, index) => (
                                    <div key={index} style={{ marginTop: 10 }}>
                                        <Label>Break {index + 1} Start</Label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Input
                                                type="number"
                                                value={breakTime.startHour}
                                                min={1}
                                                max={12}
                                                onChange={(e) => updateBreakTime(index, 'start', 'hour', e.target.value)}
                                                style={{ width: '60px', marginRight: '5px' }}
                                            />
                                            <span>:</span>
                                            <Input
                                                type="number"
                                                value={breakTime.startMinute}
                                                min={0}
                                                max={59}
                                                onChange={(e) => updateBreakTime(index, 'start', 'minute', e.target.value)}
                                                style={{ width: '60px', marginRight: '5px' }}
                                            />
                                            <select value={breakTime.startPeriod} onChange={(e) => updateBreakTime(index, 'start', 'period', e.target.value)} style={{ marginLeft: '5px' }}>
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>

                                        <Label>Break {index + 1} End</Label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Input
                                                type="number"
                                                value={breakTime.endHour}
                                                min={1}
                                                max={12}
                                                onChange={(e) => updateBreakTime(index, 'end', 'hour', e.target.value)}
                                                style={{ width: '60px', marginRight: '5px' }}
                                            />
                                            <span>:</span>
                                            <Input
                                                type="number"
                                                value={breakTime.endMinute}
                                                min={0}
                                                max={59}
                                                onChange={(e) => updateBreakTime(index, 'end', 'minute', e.target.value)}
                                                style={{ width: '60px', marginRight: '5px' }}
                                            />
                                            <select value={breakTime.endPeriod} onChange={(e) => updateBreakTime(index, 'end', 'period', e.target.value)} style={{ marginLeft: '5px' }}>
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                    </div>
                                ))}

                                <Button onClick={addEntry} style={{ marginTop: 10 }}>Add Entry</Button>
                            </div>
                        )}
                    </CardContent>

                    <Card className="mb-3 mr-3 ml-3 p-4 rounded-lg bg-white border border-gray-200">
                        <CardContent>
                            <Table className="text-center">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Time Slot</th>
                                        <th>Available Slots</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entries.map((entry, index) => (
                                        <tr key={index}>
                                            <td>{entry.day}</td>
                                            <td>{entry.startTime} - {entry.endTime}</td>
                                            <td>
                                                {entry.slots.length > 0 ? entry.slots.map((slot, slotIndex) => (
                                                    <div key={slotIndex}>{slot}</div>
                                                )) : "No available slots"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardContent>
                    </Card>
                </Card>
                <div className="flex justify-center w-full mt-8 space-x-4">
                    <Link href="/Divisions" passHref>
                        <Button 
                            variant="bottom" 
                            size='lg'
                            onClick={() => {
                                console.log("Previous Section");
                            }}
                        >
                            ← Previous Section
                        </Button>
                    </Link>
                    <Link href="/Generation" passHref>
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
            </main>
        </div>
    );
};

export default TimeslotInput;

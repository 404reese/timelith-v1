// timeslotUtils.ts

interface Time {
    hour: number;
    minute: number;
}

interface BreakTime {
    startHour: string;
    startMinute: string;
    startPeriod: string;
    endHour: string;
    endMinute: string;
    endPeriod: string;
}

export const convertTo24Hour = (hour: string, minute: string, period: string): Time => {
    let h = parseInt(hour);
    const m = parseInt(minute);
    if (period === "PM" && h !== 12) h += 12;
    if (period === "AM" && h === 12) h = 0;
    return { hour: h, minute: m };
};

export const formatTime = (time: Time): string => {
    return `${time.hour % 12 || 12}:${time.minute.toString().padStart(2, '0')}`;
};

export const generateSlots = (startTime: Time, endTime: Time, breaks: BreakTime[]): string[] => {
    const slots: string[] = [];
    const startDate = new Date(0, 0, 0, startTime.hour, startTime.minute);
    const endDate = new Date(0, 0, 0, endTime.hour, endTime.minute);

    // Generate 1-hour slots
    while (startDate < endDate) {
        const slotEndDate = new Date(startDate);
        slotEndDate.setHours(slotEndDate.getHours() + 1);

        // Check if the current slot overlaps with any breaks
        const overlapsBreak = breaks.some(b => {
            const breakStart = convertTo24Hour(b.startHour, b.startMinute, b.startPeriod);
            const breakEnd = convertTo24Hour(b.endHour, b.endMinute, b.endPeriod);
            const breakStartDate = new Date(0, 0, 0, breakStart.hour, breakStart.minute);
            const breakEndDate = new Date(0, 0, 0, breakEnd.hour, breakEnd.minute);

            return (startDate < breakEndDate && slotEndDate > breakStartDate);
        });

        // Only add the slot if it doesn't overlap with breaks
        if (!overlapsBreak) {
            slots.push(`${formatTime({ hour: startDate.getHours(), minute: startDate.getMinutes() })}-${formatTime({ hour: slotEndDate.getHours(), minute: slotEndDate.getMinutes() })}`);
        }

        // Move to the next hour
        startDate.setHours(startDate.getHours() + 1);
    }

    return slots;
};

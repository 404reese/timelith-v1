"use client";

import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { PiBuildingApartment } from "react-icons/pi";
import { RiBookMarkedLine } from "react-icons/ri";
import { IoPersonOutline } from "react-icons/io5";
import { FaDoorOpen } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { IoMdTimer } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

export default function Sidebar({ isCollapsed, toggleCollapse }: SidebarProps) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hours = new Date().getHours();
    let newGreeting = "";
    if (hours >= 5 && hours < 12) {
      newGreeting = "Good Morning";
    } else if (hours >= 12 && hours < 18) {
      newGreeting = "Good Afternoon";
    } else {
      newGreeting = "Good Evening";
    }
    setGreeting(newGreeting);
  }, []);

  return (
    <div
      className={`flex flex-col fixed mb-4  h-screen transition-width duration-300  border-r border-[var(--border)] ${
        isCollapsed ? "w-16 p-2" : "w-64 p-4"
      } bg-[var(--background)] text-[var(--foreground)]`}
    >
      <div className="flex justify-between items-center mb-4">
        <h1
          className={`text-xl font-bold ${
            isCollapsed ? "hidden" : "block"
          } text-[var(--primary-foreground)]`}
        >
          {greeting}
        </h1>
        <button
          className="p-2 rounded-full hover:bg-[var(--card)]"
          onClick={toggleCollapse}
        >
          <IoIosArrowBack
            className={`w-6 h-6 ${
              isCollapsed ? "rotate-180" : ""
            } text-[var(--primary-foreground)]`}
          />
        </button>
      </div>
      <hr className="mb-4 border-[var(--border)]" />
      <ul>
        {[
          { href: "/dashboard", icon: <MdOutlineDashboard className="w-6 h-6" />, label: "Dashboard" },
          { href: "/departments", icon: <PiBuildingApartment className="w-6 h-6" />, label: "Departments" },
          { href: "/courses", icon: <RiBookMarkedLine className="w-6 h-6" />, label: "Courses" },
          { href: "/faculties", icon: <IoPersonOutline className="w-6 h-6" />, label: "Faculties" },
          { href: "/classrooms", icon: <FaDoorOpen className="w-6 h-6" />, label: "Classrooms" },
          { href: "/divisions", icon: <SiGoogleclassroom className="w-6 h-6" />, label: "Divisions" },
          { href: "/timeslots", icon: <IoMdTimer className="w-6 h-6" />, label: "Timeslots" },
          { href: "/generation-page", icon: <FaWandMagicSparkles className="w-6 h-6" />, label: "Generation Page" },
        ].map(({ href, icon, label }) => (
          <li key={label} className="mb-2">
            <a
              href={href}
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-200 hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] ${
                isCollapsed ? "justify-center" : ""
              }`}
            >
              {icon}
              <span
                className={`${
                  isCollapsed ? "hidden" : "block"
                } text-[var(--primary-foreground)]`}
              >
                {label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}



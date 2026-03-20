"use client";

import { createContext, useContext, useEffect, useState } from "react";
import data from "../data/students.json";
import { Student } from "../types/student";

interface StudentContextType {
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (updatedStudent: Student) => void;
  deleteStudent: (id: string) => void;
  getStudentById: (id: string) => Student | undefined;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const STORAGE_KEY = "students_data";

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(() => {
    if (typeof window === "undefined") return data as Student[];
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as Student[];
    return data as Student[];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  const addStudent = (student: Student) => {
    setStudents((prev) => [student, ...prev]);
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === updatedStudent.id ? updatedStudent : student
      )
    );
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const getStudentById = (id: string) => {
    return students.find((student) => student.id === id);
  };

  const value = {
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    getStudentById,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);

  if (!context) {
    throw new Error("useStudents must be used inside StudentProvider");
  }

  return context;
}
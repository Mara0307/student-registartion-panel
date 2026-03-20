"use client";

import { useRouter } from "next/navigation";
import StudentForm from "../../components/students/StudentForm";
import { useStudents } from "../../context/StudentContext";
import { StudentFormValues } from "../../lib/validation";
import { toast } from "react-toastify";

export default function CreateStudentPage() {
  const router = useRouter();
  const { students, addStudent } = useStudents();

  const handleCreate = (values: StudentFormValues) => {
    const nextId =
      (
        students.reduce((max, student) => {
          const numericId = Number(student.id);
          return Number.isFinite(numericId) ? Math.max(max, numericId) : max;
        }, 0) + 1
      ).toString();

    addStudent({
      id: nextId,
      firstName: values.firstName,
      lastName: values.lastName,
      fin: values.fin,
      faculty: values.faculty,
      major: values.major,
      educationLevel: values.educationLevel as
        | "Bachelor"
        | "Master"
        | "PhD"
        | "Diploma",
      admissionYear: Number(values.admissionYear),
      status: values.status as "Active" | "Inactive" | "Graduated" | "Suspended",
      email: values.email,
      phone: values.phone,
      address: values.address,
    });
  
    toast.success("Student created successfully!");
  
    setTimeout(() => {
      router.push("/students");
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] p-4 md:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-[var(--card-bg)] p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-[var(--card-fg)]">Create Student</h1>
        <StudentForm onSubmit={handleCreate} submitLabel="Create Student" />
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import StudentForm from "../../../components/students/StudentForm";
import { useStudents } from "../../../context/StudentContext";
import { StudentFormValues } from "../../../lib/validation";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const { getStudentById, updateStudent } = useStudents();

  const student = getStudentById(String(params.id));

  if (!student) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="rounded-2xl bg-[var(--card-bg)] p-8 shadow">
          <h1 className="text-2xl font-bold mb-4">Student not found</h1>
          <Link href="/students" className="text-blue-600 underline">
            Back to Students
          </Link>
        </div>
      </main>
    );
  }

  const handleUpdate = (values: StudentFormValues) => {
    updateStudent({
      ...student,
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

    router.push(`/students/${student.id}`);
  };

  return (
    <main className="min-h-screen bg-[var(--page-bg)] p-4 md:p-8">
      <div className="mx-auto max-w-4xl rounded-2xl bg-[var(--card-bg)] p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-[var(--card-fg)]">Edit Student</h1>
        <StudentForm
          initialValues={student}
          onSubmit={handleUpdate}
          submitLabel="Save Changes"
        />
      </div>
    </main>
  );
}
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStudents } from "../../context/StudentContext";

export default function StudentDetailPage() {
  const params = useParams();
  const { getStudentById } = useStudents();

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

  return (
    <main className="min-h-screen bg-[var(--page-bg)] p-4 md:p-8">
      <div className="mx-auto max-w-3xl rounded-2xl bg-[var(--card-bg)] p-8 shadow">
        <h1 className="mb-6 text-3xl font-bold text-[var(--card-fg)]">
          {student.firstName} {student.lastName}
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 text-[var(--card-fg)]">
          <div><strong>ID:</strong> {student.id}</div>
          <div><strong>FIN:</strong> {student.fin}</div>
          <div><strong>Faculty:</strong> {student.faculty}</div>
          <div><strong>Major:</strong> {student.major}</div>
          <div><strong>Education Level:</strong> {student.educationLevel}</div>
          <div><strong>Admission Year:</strong> {student.admissionYear}</div>
          <div><strong>Status:</strong> {student.status}</div>
          <div><strong>Email:</strong> {student.email}</div>
          <div><strong>Phone:</strong> {student.phone}</div>
          <div><strong>Address:</strong> {student.address}</div>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/students"
            className="rounded-xl border px-5 py-2"
          >
            Back
          </Link>

          <Link
            href={`/students/edit/${student.id}`}
            className="rounded-xl bg-[var(--button-bg)] px-5 py-2 text-[var(--button-fg)]"
          >
            Edit
          </Link>
        </div>
      </div>
    </main>
  );
}
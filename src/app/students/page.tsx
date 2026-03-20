"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useStudents } from "../context/StudentContext";
import { filterStudents, paginateStudents } from "../lib/helpers";

const STUDENTS_PER_PAGE = 5;

export default function StudentsPage() {
  const { students, deleteStudent } = useStudents();

  const [search, setSearch] = useState("");
  const [faculty, setFaculty] = useState("");
  const [status, setStatus] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [admissionYear, setAdmissionYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredStudents = useMemo(() => {
    return filterStudents(students, {
      search,
      faculty,
      status,
      educationLevel,
      admissionYear,
    });
  }, [students, search, faculty, status, educationLevel, admissionYear]);

  const totalPages = Math.ceil(filteredStudents.length / STUDENTS_PER_PAGE);

  const paginatedStudents = useMemo(() => {
    return paginateStudents(filteredStudents, currentPage, STUDENTS_PER_PAGE);
  }, [filteredStudents, currentPage]);

  const faculties = [...new Set(students.map((s) => s.faculty))];
  const statuses = [...new Set(students.map((s) => s.status))];
  const educationLevels = [...new Set(students.map((s) => s.educationLevel))];
  const admissionYears = [...new Set(students.map((s) => s.admissionYear))];

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      deleteStudent(id);
    }
  };

  const handleFilterChange = (setter: (value: string) => void, value: string) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-bold text-black">Students</h1>

          <Link
            href="/students/create"
            className="rounded-xl bg-black px-5 py-2.5 text-white hover:opacity-90"
          >
            Add Student
          </Link>
        </div>

        <div className="mb-6 text-black grid grid-cols-1 gap-4 rounded-2xl bg-white p-4 shadow md:grid-cols-2 lg:grid-cols-5">
          <input
            type="text"
            placeholder="Search by name or FIN"
            value={search}
            onChange={(e) => handleFilterChange(setSearch, e.target.value)}
            className="rounded-xl border p-3 outline-none"
          />

          <select
            value={faculty}
            onChange={(e) => handleFilterChange(setFaculty, e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">All Faculties</option>
            {faculties.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => handleFilterChange(setStatus, e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">All Statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={educationLevel}
            onChange={(e) => handleFilterChange(setEducationLevel, e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">All Education Levels</option>
            {educationLevels.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={admissionYear}
            onChange={(e) => handleFilterChange(setAdmissionYear, e.target.value)}
            className="rounded-xl border p-3"
          >
            <option value="">All Years</option>
            {admissionYears.map((item) => (
              <option key={item} value={String(item)}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto rounded-2xl bg-white shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-white-200 text-left text-black">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">First Name</th>
                <th className="p-4">Last Name</th>
                <th className="p-4">FIN</th>
                <th className="p-4">Faculty</th>
                <th className="p-4">Major</th>
                <th className="p-4">Education</th>
                <th className="p-4">Year</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody className="table-body">
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <tr key={student.id} className="border-t">
                    <td className="p-4">{student.id}</td>
                    <td className="p-4">{student.firstName}</td>
                    <td className="p-4">{student.lastName}</td>
                    <td className="p-4">{student.fin}</td>
                    <td className="p-4">{student.faculty}</td>
                    <td className="p-4">{student.major}</td>
                    <td className="p-4">{student.educationLevel}</td>
                    <td className="p-4">{student.admissionYear}</td>
                    <td className="p-4">{student.status}</td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/students/${student.id}`}
                          className="rounded-lg bg-blue-600 px-3 py-1 text-white"
                        >
                          View
                        </Link>
                        <Link
                          href={`/students/edit/${student.id}`}
                          className="rounded-lg bg-yellow-500 px-3 py-1 text-white"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="rounded-lg bg-red-600 px-3 py-1 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-6 text-center text-gray-500" colSpan={10}>
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50 bg-black"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`rounded-lg px-4 py-2 border ${
                currentPage === page ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-lg border px-4 py-2 disabled:opacity-50 bg-black"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
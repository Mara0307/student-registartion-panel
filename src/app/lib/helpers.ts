import { Student } from "../types/student";

export interface StudentFilters {
  faculty: string;
  status: string;
  educationLevel: string;
  admissionYear: string;
  search: string;
}

export function filterStudents(students: Student[], filters: StudentFilters) {
  return students.filter((student) => {
    const matchesSearch =
      `${student.firstName} ${student.lastName}`
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      student.fin.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.firstName.toLowerCase().includes(filters.search.toLowerCase()) ||
      student.lastName.toLowerCase().includes(filters.search.toLowerCase());

    const matchesFaculty =
      !filters.faculty || student.faculty === filters.faculty;

    const matchesStatus =
      !filters.status || student.status === filters.status;

    const matchesEducation =
      !filters.educationLevel ||
      student.educationLevel === filters.educationLevel;

    const matchesYear =
      !filters.admissionYear ||
      String(student.admissionYear) === filters.admissionYear;

    return (
      matchesSearch &&
      matchesFaculty &&
      matchesStatus &&
      matchesEducation &&
      matchesYear
    );
  });
}

export function paginateStudents(students: Student[], currentPage: number, perPage: number) {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  return students.slice(start, end);
}
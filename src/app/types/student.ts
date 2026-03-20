export type StudentStatus = "Active" | "Inactive" | "Graduated" | "Suspended";

export type EducationLevel =
  | "Bachelor"
  | "Master"
  | "PhD"
  | "Diploma";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  fin: string;
  faculty: string;
  major: string;
  educationLevel: EducationLevel;
  admissionYear: number;
  status: StudentStatus;
  email: string;
  phone: string;
  address: string;
}
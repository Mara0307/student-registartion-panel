export interface StudentFormErrors {
  firstName?: string;
  lastName?: string;
  fin?: string;
  admissionYear?: string;
  email?: string;
}

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  fin: string;
  faculty: string;
  major: string;
  educationLevel: string;
  admissionYear: string;
  status: string;
  email: string;
  phone: string;
  address: string;
}

export function validateStudentForm(values: StudentFormValues) {
  const errors: StudentFormErrors = {};

  if (!values.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!values.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!values.fin.trim()) {
    errors.fin = "FIN is required";
  } else if (values.fin.length !== 7) {
    errors.fin = "FIN must be exactly 7 characters";
  }

  if (!values.admissionYear.trim()) {
    errors.admissionYear = "Admission year is required";
  } else if (!/^\d+$/.test(values.admissionYear)) {
    errors.admissionYear = "Admission year must contain only numbers";
  }

  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Invalid email format";
  }

  return errors;
}
"use client";

import { useState } from "react";
import { Student } from "../../types/student";
import {
  StudentFormErrors,
  StudentFormValues,
  validateStudentForm,
} from "../../lib/validation";

interface StudentFormProps {
  initialValues?: Student;
  onSubmit: (data: StudentFormValues) => void;
  submitLabel: string;
}

export default function StudentForm({
  initialValues,
  onSubmit,
  submitLabel,
}: StudentFormProps) {
  const [values, setValues] = useState<StudentFormValues>({
    firstName: initialValues?.firstName || "",
    lastName: initialValues?.lastName || "",
    fin: initialValues?.fin || "",
    faculty: initialValues?.faculty || "",
    major: initialValues?.major || "",
    educationLevel: initialValues?.educationLevel || "Bachelor",
    admissionYear: initialValues?.admissionYear?.toString() || "",
    status: initialValues?.status || "Active",
    email: initialValues?.email || "",
    phone: initialValues?.phone || "",
    address: initialValues?.address || "",
  });

  const [errors, setErrors] = useState<StudentFormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateStudentForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    onSubmit(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 md:grid-cols-2 text-[var(--card-fg)]"
    >
      <div>
        <label className="mb-1 block font-medium">First Name</label>
        <input
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
      </div>

      <div>
        <label className="mb-1 block font-medium">Last Name</label>
        <input
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
      </div>

      <div>
        <label className="mb-1 block font-medium">FIN</label>
        <input
          name="fin"
          value={values.fin}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
        {errors.fin && <p className="mt-1 text-sm text-red-600">{errors.fin}</p>}
      </div>

      <div>
        <label className="mb-1 block font-medium">Faculty</label>
        <input
          name="faculty"
          value={values.faculty}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Major</label>
        <input
          name="major"
          value={values.major}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div>
        <label className="mb-1 block font-medium">Education Level</label>
        <select
          name="educationLevel"
          value={values.educationLevel}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        >
          <option value="Bachelor">Bachelor</option>
          <option value="Master">Master</option>
          <option value="PhD">PhD</option>
          <option value="Diploma">Diploma</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Admission Year</label>
        <input
          name="admissionYear"
          value={values.admissionYear}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
        {errors.admissionYear && (
          <p className="mt-1 text-sm text-red-600">{errors.admissionYear}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block font-medium">Status</label>
        <select
          name="status"
          value={values.status}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
          <option value="Graduated">Graduated</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Email</label>
        <input
          name="email"
          value={values.email}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="mb-1 block font-medium">Phone</label>
        <input
          name="phone"
          value={values.phone}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div className="md:col-span-2">
        <label className="mb-1 block font-medium">Address</label>
        <input
          name="address"
          value={values.address}
          onChange={handleChange}
          className="w-full rounded-xl border p-3"
        />
      </div>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded-xl bg-[var(--button-bg)] px-6 py-3 text-[var(--button-fg)]"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
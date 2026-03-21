#  Student Registration Management Panel

A simple and interactive **Student Management System** built with **Next.js, React, and TypeScript**.
This application allows users to manage student records with features such as search, filtering, pagination, and CRUD operations.

---

##  Features

*  View list of students in a table
*  Add new student
*  Edit existing student
*  Search by name or FIN
*  Filter by:

  * Faculty
  * Status
  * Education level
  * Admission year
*  Pagination support
*  Student detail page
*  Delete student with confirmation
*  Form validation with error messages
*  Toast notifications (React Toastify)
*  Theme support (light/dark mode)
*  Data persistence using `localStorage`

---

## Technologies Used

* **Next.js (App Router)**
* **React**
* **TypeScript**
* **CSS**
* **React Toastify**

---

##  Project Structure

```
src/
  app/
    students/
      page.tsx
      create/page.tsx
      edit/[id]/page.tsx
      [id]/page.tsx

  components/
    students/
      StudentForm.tsx

  context/
    StudentContext.tsx

  data/
    students.json

  lib/
    helpers.ts
    validation.ts

  types/
    student.ts
```

---

##  Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/Mara0307/student-registartion-panel.git
cd student-registration-panel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

##  Key Concepts Implemented

* React state management using **Context API**
* Dynamic routing with Next.js (`[id]`)
* Form validation and error handling
* Data filtering and pagination logic
* Reusable components
* Clean and maintainable code structure

---

##  Bonus Features

* Toast notifications for user actions
* Dark mode support
* Persistent data using `localStorage`

---

##  Notes

* No external API is used — all data is handled locally
* JSON/TS data is used as the data source
* UI is designed to be simple, responsive, and user-friendly

---

##  Author

Developed as part of a frontend assignment using modern React and Next.js practices.

---

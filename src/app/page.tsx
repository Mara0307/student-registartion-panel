import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[var(--page-bg)] p-6">
      <div className="max-w-2xl w-full rounded-2xl bg-[var(--card-bg)] shadow-md p-8 text-center">
        <h1 className="text-3xl font-bold mb-4 text-[var(--card-fg)]">
          Student Registration Management Panel
        </h1>
        <p className="text-[var(--muted-fg)] mb-6">
          Manage student records with search, filters, pagination, detail and edit pages.
        </p>

        <Link
          href="/students"
          className="inline-block rounded-xl bg-[var(--button-bg)] px-6 py-3 text-[var(--button-fg)] hover:opacity-90"
        >
          Go to Students
        </Link>
      </div>
    </main>
  );
}
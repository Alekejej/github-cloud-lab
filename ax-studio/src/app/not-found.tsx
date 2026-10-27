import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-16 text-center">
      <h1 className="mb-4 text-4xl font-bold">Nie znaleziono tej strony</h1>
      <Link href="/" className="text-xl font-bold text-primary underline">Wróć na pulpit</Link>
    </main>
  );
}

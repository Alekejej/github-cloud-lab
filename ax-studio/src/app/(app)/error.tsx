"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-danger bg-red-50 p-8">
      <h1 className="mb-4 text-3xl font-bold text-danger">Coś poszło nie tak</h1>
      <p className="mb-6 text-lg">Nie martw się – Twoje dane są bezpieczne. Spróbuj jeszcze raz.</p>
      <button onClick={reset} className="min-h-14 rounded-xl bg-primary px-6 text-lg font-bold text-white">
        Spróbuj ponownie
      </button>
    </div>
  );
}

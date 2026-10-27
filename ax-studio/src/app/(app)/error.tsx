"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="rounded-3xl border-2 border-danger bg-danger-soft p-8">
      <h1 className="mb-4 text-3xl font-bold text-danger">Coś poszło nie tak</h1>
      <p className="mb-6 text-lg">Nie martw się – Twoje dane są bezpieczne. Spróbuj jeszcze raz.</p>
      <button onClick={reset} className="min-h-14 rounded-full bg-primary px-7 text-lg font-semibold text-white">
        Spróbuj ponownie
      </button>
    </div>
  );
}

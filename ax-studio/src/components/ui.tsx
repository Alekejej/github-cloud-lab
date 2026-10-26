import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonBase =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-xl px-6 py-3 text-lg font-bold transition-colors";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  secondary: "border-2 border-primary bg-surface text-primary hover:bg-blue-50",
  danger: "border-2 border-danger bg-surface text-danger hover:bg-red-50",
};

type Variant = keyof typeof variants;

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${buttonBase} ${variants[variant]} ${className}`} {...props} />;
}

export function LinkButton({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={`${buttonBase} ${variants[variant]} ${className}`} {...props} />;
}

export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-4xl font-bold">{title}</h1>
      {children && <div className="flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border-2 border-border bg-surface p-6 ${className}`}>
      {title && <h2 className="mb-4 text-2xl font-bold">{title}</h2>}
      {children}
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border-2 border-border px-4 py-3 text-lg focus:border-primary";

type FieldProps = {
  label: string;
  name: string;
  hint?: string;
} & ComponentProps<"input">;

export function Field({ label, name, hint, className = "", ...props }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-lg font-bold">{label}</span>
      {hint && <span className="mb-2 block text-muted">{hint}</span>}
      <input name={name} className={inputClass} {...props} />
    </label>
  );
}

export function TextArea({
  label,
  name,
  ...props
}: { label: string; name: string } & ComponentProps<"textarea">) {
  return (
    <label className="block">
      <span className="mb-1 block text-lg font-bold">{label}</span>
      <textarea name={name} rows={3} className={inputClass} {...props} />
    </label>
  );
}

export function Select({
  label,
  name,
  children,
  ...props
}: { label: string; name: string; children: ReactNode } & ComponentProps<"select">) {
  return (
    <label className="block">
      <span className="mb-1 block text-lg font-bold">{label}</span>
      <select name={name} className={inputClass} {...props}>
        {children}
      </select>
    </label>
  );
}

/** Komunikat po wykonaniu akcji – przekazywany w adresie (?ok=... lub ?blad=...). */
export function Notice({ ok, error }: { ok?: string; error?: string }) {
  if (error) {
    return (
      <p role="alert" className="mb-6 rounded-xl border-2 border-danger bg-red-50 p-4 text-lg font-bold text-danger">
        {error}
      </p>
    );
  }
  if (ok) {
    return (
      <p role="status" className="mb-6 rounded-xl border-2 border-success bg-green-50 p-4 text-lg font-bold text-success">
        ✓ {ok}
      </p>
    );
  }
  return null;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border-2 border-dashed border-border p-8 text-center text-lg text-muted">{children}</p>;
}

export function StatusBadge({ paid }: { paid: boolean }) {
  return paid ? (
    <span className="rounded-full bg-green-100 px-3 py-1 font-bold text-success">Opłacona</span>
  ) : (
    <span className="rounded-full bg-amber-100 px-3 py-1 font-bold text-amber-900">Do zapłaty</span>
  );
}

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const buttonBase =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 py-3 font-display text-lg font-semibold tracking-tight transition-colors";

const variants = {
  primary: "bg-primary text-white shadow-[0_14px_34px_-14px_rgba(44,70,255,.7)] hover:bg-primary-hover",
  secondary: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-white",
  danger: "border-2 border-danger bg-surface text-danger hover:bg-danger-soft",
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

/** Mała etykieta nad nagłówkiem, w stylu marki (mono, wersaliki). */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="mb-2 font-mono text-sm uppercase tracking-[0.14em] text-muted">{children}</p>;
}

export function PageHeader({ title, eyebrow, children }: { title: string; eyebrow?: string; children?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="text-5xl font-bold">{title}</h1>
      </div>
      {children && <div className="flex flex-wrap gap-3">{children}</div>}
    </div>
  );
}

export function Card({ title, children, className = "" }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-3xl bg-surface p-6 md:p-8 ${className}`}>
      {title && <h2 className="mb-5 text-3xl font-bold">{title}</h2>}
      {children}
    </section>
  );
}

const inputClass =
  "w-full rounded-xl border-2 border-field px-4 py-3 text-lg focus:border-primary";

type FieldProps = {
  label: string;
  name: string;
  hint?: string;
} & ComponentProps<"input">;

export function Field({ label, name, hint, className = "", ...props }: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-lg font-semibold">{label}</span>
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
      <span className="mb-1 block text-lg font-semibold">{label}</span>
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
      <span className="mb-1 block text-lg font-semibold">{label}</span>
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
      <p role="alert" className="mb-6 rounded-2xl border-2 border-danger bg-danger-soft p-4 text-lg font-bold text-danger">
        {error}
      </p>
    );
  }
  if (ok) {
    return (
      <p role="status" className="mb-6 rounded-2xl border-2 border-success bg-success-soft p-4 text-lg font-bold text-success">
        ✓ {ok}
      </p>
    );
  }
  return null;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-2xl border-2 border-dashed border-border p-8 text-center text-lg text-muted">{children}</p>;
}

export function StatusBadge({ paid }: { paid: boolean }) {
  return paid ? (
    <span className="rounded-full bg-success-soft px-3 py-1 font-semibold text-success">Opłacona</span>
  ) : (
    <span className="rounded-full bg-warning-soft px-3 py-1 font-semibold text-[#6b4e00]">Do zapłaty</span>
  );
}

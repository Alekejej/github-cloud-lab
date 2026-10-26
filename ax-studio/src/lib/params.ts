export type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export async function noticeFrom(searchParams: SearchParams) {
  const p = await searchParams;
  const pick = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  return { ok: pick(p.ok), error: pick(p.blad) };
}

export function withNotice(path: string, kind: "ok" | "blad", message: string): string {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${kind}=${encodeURIComponent(message)}`;
}

export function str(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}

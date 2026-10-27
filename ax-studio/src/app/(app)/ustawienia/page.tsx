import { Button, Card, Field, Notice, PageHeader, TextArea } from "@/components/ui";
import { createClient } from "@/lib/supabase/server";
import { noticeFrom, type SearchParams } from "@/lib/params";
import { saveCompanyProfile } from "./actions";

export default async function SettingsPage({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient();
  const { data: profile } = await supabase.from("company_profiles").select("*").maybeSingle();

  return (
    <>
      <PageHeader eyebrow="Ustawienia" title="Moja firma" />
      <Notice {...await noticeFrom(searchParams)} />
      <Card>
        <p className="mb-6 text-lg text-muted">Te dane pojawią się na każdej wystawionej fakturze.</p>
        <form action={saveCompanyProfile} className="space-y-6">
          <Field label="Nazwa firmy" name="name" defaultValue={profile?.name} required />
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="NIP" name="nip" inputMode="numeric" defaultValue={profile?.nip} />
            <Field label="Numer konta bankowego" name="bank_account" defaultValue={profile?.bank_account} />
          </div>
          <TextArea label="Adres" name="address" defaultValue={profile?.address} />
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Telefon" name="phone" type="tel" defaultValue={profile?.phone} />
            <Field label="E-mail" name="email" type="email" defaultValue={profile?.email} />
          </div>
          <Button>Zapisz dane firmy</Button>
        </form>
      </Card>
    </>
  );
}

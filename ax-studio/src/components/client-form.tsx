import { Button, Field, TextArea } from "@/components/ui";

export type ClientValues = {
  name: string;
  nip: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
};

export function ClientForm({
  action,
  values,
  submitLabel,
}: {
  action: (form: FormData) => Promise<void>;
  values?: ClientValues;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-6">
      <Field label="Nazwa klienta lub imię i nazwisko" name="name" defaultValue={values?.name} required />
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Telefon" name="phone" type="tel" defaultValue={values?.phone} />
        <Field label="E-mail" name="email" type="email" defaultValue={values?.email} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="NIP" name="nip" hint="Tylko dla firm. Można zostawić puste." defaultValue={values?.nip} inputMode="numeric" />
        <Field label="Adres" name="address" hint="Ulica, kod pocztowy, miasto." defaultValue={values?.address} />
      </div>
      <TextArea label="Notatki" name="notes" defaultValue={values?.notes} />
      <Button>{submitLabel}</Button>
    </form>
  );
}

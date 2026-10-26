"use client";

import { Button } from "@/components/ui";
import type { ComponentProps } from "react";

/** Przycisk, który przed wysłaniem formularza pyta o potwierdzenie. */
export function ConfirmButton({ question, ...props }: { question: string } & ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      onClick={(e) => {
        if (!window.confirm(question)) e.preventDefault();
      }}
    />
  );
}

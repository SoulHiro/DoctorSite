import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { NotFoundIllustration } from "@/components/illustrations/not-found-illustration";

// Fica fora do grupo (site): renderiza só com o layout raiz, sem header e
// footer, e também atende qualquer URL que não corresponda a uma rota.
export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-4 py-6 text-foreground">
      <NotFoundIllustration />

      <h1 className="text-center text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
        Página não encontrada
      </h1>

      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors duration-fast ease-out hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar para o início
      </Link>
    </main>
  );
}

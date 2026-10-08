import type { Metadata } from "next";

import { MaintenanceIllustration } from "@/components/illustrations/maintenance-illustration";

export const metadata: Metadata = {
  title: "Site em manutenção",
  robots: { index: false, follow: false },
};

// Fica fora do grupo (site): sem header, footer ou tela de abertura.
// Com MAINTENANCE_MODE=true, o proxy.ts reescreve todas as rotas para cá;
// sem a variável, a página continua acessível direto em /manutencao.
export default function MaintenancePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-4 py-6 text-foreground">
      <MaintenanceIllustration />

      <h1 className="text-center text-xs font-semibold tracking-[0.18em] text-secondary-active uppercase">
        Site em manutenção
      </h1>
    </main>
  );
}

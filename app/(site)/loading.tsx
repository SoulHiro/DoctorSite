import { JugglingLoader } from "@/components/illustrations/juggling-loader";

// Aparece enquanto uma rota do grupo (site) carrega na navegação. Cobre a
// tela inteira, como a SplashScreen do carregamento inicial.
export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <JugglingLoader />
    </div>
  );
}

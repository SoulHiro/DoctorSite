import { JugglingLoader } from "@/components/illustrations/juggling-loader";

// Dentro do grupo (site): o header e o footer continuam visíveis enquanto a
// página carrega; só o <main> mostra o malabarismo.
export default function Loading() {
  return <JugglingLoader />;
}

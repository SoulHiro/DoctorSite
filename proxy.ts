import { NextResponse, type NextRequest } from "next/server";

const MAINTENANCE_PATH = "/manutencao";

// Proxy roda antes de toda rota que o matcher aceita. Mantê-lo só com
// checagens baratas (variáveis de ambiente, cookies); nada de banco aqui.
export default function proxy(request: NextRequest) {
  // Modo manutenção: todas as páginas mostram /manutencao, mantendo a URL.
  // Na Vercel, mudar a variável exige um novo deploy para valer.
  if (process.env.MAINTENANCE_MODE === "true") {
    return NextResponse.rewrite(new URL(MAINTENANCE_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Tudo, exceto assets do Next, arquivos com extensão (imagens, ícones,
    // robots.txt…) e a própria página de manutenção.
    "/((?!_next/static|_next/image|manutencao|.*\\..*).*)",
  ],
};

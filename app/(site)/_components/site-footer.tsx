import { Mail } from "lucide-react"

import { InstagramIcon, YoutubeIcon } from "@/components/shared/social-icons"
import { ContactForm } from "@/features/contact/components/contact-form"

export function SiteFooter() {
  return (
    <footer id="contato" className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl">
                Fale com a gente
              </h2>
              <p className="mt-4 max-w-[50ch] text-base leading-relaxed text-foreground/70">
                Escreva pra doar, se candidatar a voluntário, ou combinar
                uma visita da equipe. Respondemos pessoalmente, em até 2
                dias úteis.
              </p>
            </div>

            <div className="rounded-lg bg-background p-5 shadow-sm">
              <p className="text-sm font-semibold text-foreground">
                Quer doar direto?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/70">
                Os dados de PIX e transferência estão a confirmar com a
                equipe. Escreva pelo formulário ao lado com o motivo
                &ldquo;Quero doar&rdquo; que retornamos com as informações.
              </p>
            </div>

            <div className="flex flex-col gap-3 text-sm">
              <a
                href="mailto:doutorespalhacos.of@gmail.com"
                className="inline-flex items-center gap-2.5 text-foreground/80 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                doutorespalhacos.of@gmail.com
              </a>
              <a
                href="https://www.instagram.com/sosbomhumordoutorespalhacos/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-foreground/80 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm"
              >
                <InstagramIcon className="size-4 shrink-0" aria-hidden="true" />
                @sosbomhumordoutorespalhacos
              </a>
              <a
                href="https://www.youtube.com/@SOSBomHumorDoutoresPalhacos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-foreground/80 transition-colors hover:text-secondary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-sm"
              >
                <YoutubeIcon className="size-4 shrink-0" aria-hidden="true" />
                @SOSBomHumorDoutoresPalhacos
              </a>
            </div>
          </div>

          <ContactForm />
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-border pt-8 text-sm text-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SOS Bom Humor Doutores Palhaços
          </p>
          <p>Ibirubá, RS</p>
        </div>
      </div>
    </footer>
  )
}

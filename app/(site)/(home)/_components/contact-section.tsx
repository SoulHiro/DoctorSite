import { Mail } from "lucide-react"

import { site } from "@/content/site"
import { Section } from "@/components/layout/section"
import { SectionHeading } from "@/components/shared/section-heading"
import { InstagramIcon, YoutubeIcon } from "@/components/shared/social-icons"
import { ContactForm } from "@/features/contact/components/contact-form"

const contactLinkClass =
  "inline-flex items-center gap-2.5 rounded-sm text-foreground transition-colors duration-fast ease-out hover:text-secondary-active"

// Seção de contato da Home (antes ficava dentro do footer).
export function ContactSection() {
  return (
    <Section id="contato" spacing="lg">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-8 lg:col-span-5">
          <SectionHeading
            title="Fale com a gente"
            description="Escreva pra doar, se candidatar a voluntário, ou combinar uma visita da equipe. Respondemos pessoalmente, em até 2 dias úteis."
          />

          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="text-body-sm font-semibold">Quer doar direto?</p>
            <p className="mt-1.5 text-body-sm text-muted-foreground">
              Os dados de PIX e transferência estão a confirmar com a equipe.
              Escreva pelo formulário com o motivo &ldquo;Quero doar&rdquo; que
              retornamos com as informações.
            </p>
          </div>

          <ul className="flex flex-col gap-3 text-body-sm">
            <li>
              <a href={`mailto:${site.email}`} className={contactLinkClass}>
                <Mail className="size-5 shrink-0" aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.social.instagram.href}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClass}
              >
                <InstagramIcon className="size-5 shrink-0" aria-hidden="true" />
                {site.social.instagram.label}
              </a>
            </li>
            <li>
              <a
                href={site.social.youtube.href}
                target="_blank"
                rel="noopener noreferrer"
                className={contactLinkClass}
              >
                <YoutubeIcon className="size-5 shrink-0" aria-hidden="true" />
                {site.social.youtube.label}
              </a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}

import Link from "next/link"
import { Mail, MapPin } from "lucide-react"

import {
  donateHref,
  footerNav,
  getVisibleNav,
  isVisible,
  site,
  type NavLink,
} from "@/content/site"
import { Container } from "@/components/layout/container"
import { InstagramIcon, YoutubeIcon } from "@/components/shared/social-icons"
import { Wordmark } from "@/components/shared/wordmark"

const linkClass =
  "rounded-sm text-body-sm text-foreground transition-colors duration-fast ease-out hover:text-primary-active"

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-caption text-muted-foreground uppercase">{title}</h2>
      {children}
    </div>
  )
}

function LinkList({ links }: { links: readonly NavLink[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {links.filter(isVisible).map((link) => (
        <li key={link.href}>
          <Link href={link.href} className={linkClass}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  )
}

// Mini mapa de Ibirubá. OpenStreetMap: sem chave de API e sem cookies de
// rastreamento; a atribuição exigida já vem dentro do iframe.
function MiniMap() {
  const { lat, lon } = site.geo
  const bbox = [lon - 0.06, lat - 0.04, lon + 0.06, lat + 0.04].join(",")
  const embed = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`
  const full = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=13/${lat}/${lon}`

  return (
    <div className="flex max-w-sm flex-col gap-2">
      <div className="aspect-video overflow-hidden rounded-lg border border-border bg-muted">
        <iframe
          src={embed}
          title={`Mapa de ${site.location}`}
          loading="lazy"
          className="size-full"
        />
      </div>
      <a
        href={full}
        target="_blank"
        rel="noopener noreferrer"
        className="self-start rounded-sm text-body-sm text-secondary-active underline underline-offset-4 hover:text-foreground"
      >
        Ver mapa maior
      </a>
    </div>
  )
}

// Footer institucional em 4 colunas (Sobre, Navegação, Apoie, Contato), o
// bloco de marcas da Lei Rouanet e a faixa legal.
export function SiteFooter() {
  const nav = getVisibleNav()
  const navigation = nav.flatMap((entry) =>
    entry.type === "link"
      ? [entry]
      : entry.label === "Apoie"
        ? []
        : entry.items.slice(0, 3)
  )
  const support = nav.find(
    (entry) => entry.type === "group" && entry.label === "Apoie"
  )

  return (
    <footer className="border-t border-border bg-surface">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-4">
          <Wordmark />
          <p className="font-heading text-h5 font-semibold text-foreground">
            {site.tagline}
          </p>
          <p className="inline-flex items-center gap-2 text-body-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {site.location}
          </p>
          <MiniMap />
        </div>

        <div className="lg:col-span-3">
          <FooterColumn title="Navegação">
            <LinkList links={[...navigation, ...footerNav.institutional]} />
          </FooterColumn>
        </div>

        <div className="lg:col-span-2">
          <FooterColumn title="Apoie">
            <LinkList
              links={
                support && support.type === "group"
                  ? support.items
                  : [{ href: donateHref, label: "Doe agora", available: false }]
              }
            />
          </FooterColumn>
        </div>

        <div className="lg:col-span-3">
          <FooterColumn title="Contato">
            <ul className="flex flex-col gap-2.5">
              <li>
                <a href={`mailto:${site.email}`} className={`${linkClass} inline-flex items-center gap-2 break-all`}>
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={site.social.instagram.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                  <InstagramIcon className="size-4 shrink-0" aria-hidden="true" />
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.social.youtube.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                  <YoutubeIcon className="size-4 shrink-0" aria-hidden="true" />
                  YouTube
                </a>
              </li>
            </ul>
          </FooterColumn>
        </div>
      </Container>

      {/* Bloco de marcas da Lei Rouanet. Obrigatório pela IN MinC 29/2026
          (art. 21); o manual de marcas do Pronac pede o rodapé da página
          inicial. Use só os arquivos oficiais (gov.br/leirouanet) e submeta o
          leiaute ao MinC pelo Salic antes de publicar. */}
      <div className="border-t border-border">
        <Container className="flex flex-col items-center gap-4 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="max-w-md text-body-sm text-muted-foreground">
            O projeto &ldquo;Rir é o Melhor Remédio&rdquo; é realizado com apoio
            da Lei de Incentivo à Cultura.
          </p>
          <div
            className="flex h-14 w-full max-w-sm items-center justify-center rounded-lg border border-dashed border-border px-4 text-caption text-muted-foreground uppercase sm:w-80"
            aria-hidden="true"
          >
            Marcas oficiais: Lei Rouanet · MinC · Governo Federal
          </div>
        </Container>
      </div>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-3 py-6 text-body-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.filter(isVisible).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="rounded-sm transition-colors duration-fast ease-out hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}

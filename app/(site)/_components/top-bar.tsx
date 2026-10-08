import { Mail, MapPin } from "lucide-react";

import { site } from "@/content/site";
import { Container } from "@/components/layout/container";
import { InstagramIcon, YoutubeIcon } from "@/components/shared/social-icons";

const linkClass =
  "inline-flex items-center gap-1.5 rounded-sm transition-colors duration-fast ease-out hover:text-primary-subtle";

// Faixa institucional acima do header. Rola junto com a página; só o header
// fica fixo. Escondida no celular, onde o menu já traz os contatos e cada
// pixel acima da dobra conta. Ícones de 16px porque acompanham texto body-sm.
export function TopBar() {
  return (
    <div className="hidden bg-secondary-active text-body-sm text-primary-foreground sm:block">
      <Container className="flex h-10 items-center justify-between gap-4">
        <p className="inline-flex items-center gap-1.5">
          <MapPin className="size-4 shrink-0" aria-hidden="true" />
          {site.location}
        </p>

        <ul className="flex items-center gap-4">
          <li>
            <a href={`mailto:${site.email}`} className={linkClass}>
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              {site.email}
            </a>
          </li>
          <li>
            <a
              href={site.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram ${site.social.instagram.label}`}
              className={linkClass}
            >
              <InstagramIcon className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href={site.social.youtube.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`YouTube ${site.social.youtube.label}`}
              className={linkClass}
            >
              <YoutubeIcon className="size-4 shrink-0" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </Container>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ChevronDown } from "lucide-react";

import { getVisibleNav, type NavFeatured } from "@/content/site";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/shared/eyebrow";

const triggerClass =
  "inline-flex items-center gap-1 rounded-lg px-3 py-2 whitespace-nowrap text-body-sm font-medium text-foreground transition-colors duration-fast ease-out hover:bg-muted data-[popup-open]:bg-muted data-[active]:text-primary-active";

const isCurrent = (pathname: string, href: string) =>
  href.split("#")[0] === pathname;

// Menu do desktop (lg+). Grupos abrem um popover no hover ou no clique, com
// os links do grupo e um card de destaque; teclado e leitor de tela vêm do
// NavigationMenu do Base UI.
export function SiteNav({ className }: { className?: string }) {
  const pathname = usePathname();
  const nav = getVisibleNav();

  return (
    <NavigationMenu.Root aria-label="Navegação principal" className={className}>
      <NavigationMenu.List className="flex items-center gap-1">
        {nav.map((entry) =>
          entry.type === "link" ? (
            <NavigationMenu.Item key={entry.href}>
              <NavigationMenu.Link
                render={<Link href={entry.href} />}
                aria-current={isCurrent(pathname, entry.href) ? "page" : undefined}
                data-active={isCurrent(pathname, entry.href) || undefined}
                className={triggerClass}
              >
                {entry.label}
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          ) : (
            <NavigationMenu.Item key={entry.label}>
              <NavigationMenu.Trigger
                data-active={
                  entry.items.some((item) => isCurrent(pathname, item.href)) || undefined
                }
                className={triggerClass}
              >
                {entry.label}
                <NavigationMenu.Icon className="transition-transform duration-fast ease-out data-[popup-open]:rotate-180 motion-reduce:transition-none">
                  <ChevronDown className="size-4" aria-hidden="true" />
                </NavigationMenu.Icon>
              </NavigationMenu.Trigger>

              <NavigationMenu.Content className="grid w-3xl grid-cols-12 gap-6 p-6 transition-opacity duration-base ease-out data-[ending-style]:opacity-0 data-[starting-style]:opacity-0 motion-reduce:transition-none">
                <div className="col-span-7 flex flex-col gap-4">
                  <div className="flex flex-col gap-1 px-3">
                    <p className="font-heading text-h5 font-semibold text-foreground">
                      {entry.label}
                    </p>
                    <p className="text-body-sm text-muted-foreground">
                      {entry.description}
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-1">
                    {entry.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenu.Link
                          render={<Link href={item.href} />}
                          aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                          className="flex flex-col gap-0.5 rounded-lg px-3 py-2 transition-colors duration-fast ease-out hover:bg-muted"
                        >
                          <span className="text-body-sm font-semibold text-foreground">
                            {item.label}
                          </span>
                          {item.description && (
                            <span className="text-body-sm text-muted-foreground">
                              {item.description}
                            </span>
                          )}
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {entry.featured && <FeaturedCard featured={entry.featured} />}
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          )
        )}
      </NavigationMenu.List>

      <NavigationMenu.Portal>
        <NavigationMenu.Positioner sideOffset={12} align="start" className="z-50">
          <NavigationMenu.Popup className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg border border-border bg-background shadow-sm transition-[opacity,scale,width,height] duration-base ease-out data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 motion-reduce:transition-none">
            <NavigationMenu.Viewport className="relative size-full overflow-hidden" />
          </NavigationMenu.Popup>
        </NavigationMenu.Positioner>
      </NavigationMenu.Portal>
    </NavigationMenu.Root>
  );
}

// Card de destaque, sempre 4:3 (nunca mais alto que largo). Com foto, a foto
// ocupa o card e o texto fica sobre um degradê escuro; sem foto, fundo de
// destaque coral suave.
function FeaturedCard({ featured }: { featured: NavFeatured }) {
  const { image } = featured;

  return (
    <NavigationMenu.Link
      render={<Link href={featured.href} />}
      className={cn(
        "group relative col-span-5 flex aspect-4/3 flex-col justify-end self-start overflow-hidden rounded-lg p-5",
        !image && "border border-border bg-primary-subtle"
      )}
    >
      {image && (
        <>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="18rem"
            className="object-cover transition-transform duration-slow ease-out group-hover:scale-105 motion-reduce:transition-none"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/45 to-transparent"
          />
        </>
      )}
      <div className="relative flex flex-col gap-1">
        <Eyebrow tone={image ? "brand" : "default"}>{featured.eyebrow}</Eyebrow>
        <span
          className={cn(
            "font-heading text-h5 font-semibold",
            image ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {featured.title}
        </span>
        <span
          className={cn(
            "text-body-sm",
            image ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {featured.description}
        </span>
      </div>
    </NavigationMenu.Link>
  );
}

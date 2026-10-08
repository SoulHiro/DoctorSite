import { Section } from "@/components/layout/section";

export function MissionVideo() {
  return (
    <Section className="overflow-x-hidden">
      <div className="grid lg:grid-cols-3 lg:items-stretch">
        <div className="relative flex items-center justify-end py-10 lg:col-span-1 lg:py-0">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-screen bg-secondary-active"
          />
          <div className="relative z-10 max-w-sm px-8 text-right text-white lg:pr-12">
            <h2 className="text-balance font-heading text-2xl leading-snug font-semibold sm:text-3xl">
              A alegria não chega de{" "}
              <span className="text-primary-subtle">improviso</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85">
              Antes de qualquer visita, a equipe se reúne com o hospital
              para combinar horário, quartos e limites. Nada é improvisado
              dentro de um corredor.
            </p>
          </div>
        </div>

        <div className="flex items-center py-10 lg:col-span-2 lg:py-0 lg:pl-8">
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe
              className="size-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ"
              title="Vídeo da equipe se preparando para uma visita hospitalar"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

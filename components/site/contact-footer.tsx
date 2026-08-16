"use client"

import { startTransition, useActionState, useEffect, useId } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Mail } from "lucide-react"

import { cn } from "@/lib/utils"
import { InstagramIcon, YoutubeIcon } from "@/components/site/icons"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactInput } from "@/lib/schemas/contact"
import { submitContact, type ContactState } from "@/lib/actions/contact"

const initialState: ContactState = { status: "idle" }

const REASON_OPTIONS = [
  { value: "doar", label: "Quero doar" },
  { value: "voluntariar", label: "Quero ser voluntário" },
  { value: "outro", label: "Outro assunto" },
] as const

export function ContactFooter() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState
  )
  const formId = useId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", reason: "doar", message: "" },
  })

  useEffect(() => {
    if (state.status === "success") {
      reset()
    }
  }, [state, reset])

  const onSubmit = handleSubmit((data) => {
    const fd = new FormData()
    fd.set("name", data.name)
    fd.set("email", data.email)
    fd.set("reason", data.reason)
    fd.set("message", data.message)
    startTransition(() => {
      formAction(fd)
    })
  })

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

          <form
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-lg bg-background p-6 shadow-sm sm:p-8"
          >
            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium text-foreground">
                Motivo do contato
              </legend>
              <div className="flex flex-wrap gap-2">
                {REASON_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="has-checked:bg-primary has-checked:text-primary-foreground relative cursor-pointer rounded-lg bg-surface px-3.5 py-2 text-sm font-medium text-foreground/70 shadow-sm transition-colors has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="absolute inset-0 opacity-0"
                      {...register("reason")}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-name`}>Nome completo</Label>
              <Input
                id={`${formId}-name`}
                autoComplete="name"
                aria-invalid={errors.name ? "true" : "false"}
                aria-describedby={
                  errors.name ? `${formId}-name-error` : undefined
                }
                {...register("name")}
              />
              {errors.name && (
                <p
                  id={`${formId}-name-error`}
                  className="text-sm text-destructive"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-email`}>Email</Label>
              <Input
                id={`${formId}-email`}
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={
                  errors.email ? `${formId}-email-error` : undefined
                }
                {...register("email")}
              />
              {errors.email && (
                <p
                  id={`${formId}-email-error`}
                  className="text-sm text-destructive"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${formId}-message`}>Mensagem</Label>
              <Textarea
                id={`${formId}-message`}
                rows={4}
                aria-invalid={errors.message ? "true" : "false"}
                aria-describedby={
                  errors.message ? `${formId}-message-error` : undefined
                }
                {...register("message")}
              />
              {errors.message && (
                <p
                  id={`${formId}-message-error`}
                  className="text-sm text-destructive"
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50"
            >
              {pending ? "Enviando..." : "Enviar mensagem"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={cn(
                "text-sm",
                state.status === "success" && "text-success",
                state.status === "error" && "text-destructive"
              )}
            >
              {state.message}
            </p>
          </form>
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

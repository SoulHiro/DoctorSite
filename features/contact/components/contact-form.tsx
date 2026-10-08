"use client"

import { startTransition, useActionState, useEffect, useId } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactInput } from "@/features/contact/schemas"
import { submitContact, type ContactState } from "@/features/contact/actions"

const initialState: ContactState = { status: "idle" }

const REASON_OPTIONS = [
  { value: "doar", label: "Quero doar" },
  { value: "voluntariar", label: "Quero ser voluntário" },
  { value: "outro", label: "Outro assunto" },
] as const

export function ContactForm() {
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
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p id={`${formId}-name-error`} className="text-sm text-destructive">
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
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p id={`${formId}-email-error`} className="text-sm text-destructive">
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
  )
}

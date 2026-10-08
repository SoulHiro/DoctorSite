"use server"

import { contactSchema } from "@/features/contact/schemas"

export type ContactState = {
  status: "idle" | "success" | "error"
  message?: string
  fieldErrors?: Partial<Record<"name" | "email" | "reason" | "message", string>>
}

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    reason: formData.get("reason"),
    message: formData.get("message"),
  })

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return {
      status: "error",
      message: "Confira os campos marcados abaixo.",
      fieldErrors,
    }
  }

  // Sem serviço de email/notificação configurado ainda (follow-up: Vercel Marketplace,
  // ex. Resend). Por enquanto a mensagem fica registrada no log do servidor.
  console.info("[contato] nova mensagem recebida", {
    name: parsed.data.name,
    email: parsed.data.email,
    reason: parsed.data.reason,
  })

  return {
    status: "success",
    message: "Mensagem enviada! A equipe responde em até 2 dias úteis.",
  }
}

import { z } from "zod"

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Digite seu nome completo.")
    .max(120, "Nome muito longo."),
  email: z
    .string()
    .trim()
    .min(1, "Digite seu email.")
    .email("Email inválido. Exemplo: nome@exemplo.com"),
  reason: z.enum(["doar", "voluntariar", "outro"], {
    error: "Escolha um motivo de contato.",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais (mínimo 10 caracteres).")
    .max(2000, "Mensagem muito longa (máximo 2000 caracteres)."),
})

export type ContactInput = z.infer<typeof contactSchema>

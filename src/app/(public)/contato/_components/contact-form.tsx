'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Send } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { brandDesign } from '@/lib/brand-design'

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const toEmail = 'doutorespalhacos.of@gmail.com'

    const emailSubject = formData.subject.trim()
      ? `[Site] ${formData.subject}`
      : '[Site] Nova mensagem de contato'

    const emailBody = `${formData.message}`.trim()

    const mailtoLink = `mailto:${toEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`

    window.location.href = mailtoLink

    setSubmitted(true)

    setFormData({ name: '', email: '', subject: '', message: '' })

    setTimeout(() => setSubmitted(false), 5000)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: brandDesign.animations.easing.bounce,
        }}
      >
        <Card className="border-green-200 bg-green-50 shadow-lg">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.2,
                ease: brandDesign.animations.easing.bounce,
              }}
            >
              <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-600" />
            </motion.div>
            <motion.h3
              className="mb-2 text-xl font-semibold text-green-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Email preparado com sucesso!
            </motion.h3>
            <motion.p
              className="text-green-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Seu cliente de email foi aberto com a mensagem preenchida. Basta
              enviá-la para entrarmos em contato! 🤡❤️
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.6,
        ease: brandDesign.animations.easing.smooth,
      }}
    >
      <Card className="border-slate-200 shadow-lg">
        <CardHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: brandDesign.animations.easing.smooth,
            }}
          >
            <CardTitle className="text-2xl font-bold text-gray-900">
              Envie sua Mensagem
            </CardTitle>
            <p className="text-gray-600">
              Preencha o formulário abaixo e seu cliente de email será aberto
              com a mensagem pronta para envio.
            </p>
          </motion.div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: brandDesign.animations.easing.smooth,
              }}
            >
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Nome completo *
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="transition-all duration-300 hover:border-gray-400 focus:border-orange-300 focus:ring-orange-200"
                placeholder="Seu nome completo"
              />
            </motion.div>

            {/* Email */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.3,
                ease: brandDesign.animations.easing.smooth,
              }}
            >
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                E-mail *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="transition-all duration-300 hover:border-gray-400 focus:border-orange-300 focus:ring-orange-200"
                placeholder="seu@email.com"
              />
            </motion.div>

            {/* Assunto */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.4,
                ease: brandDesign.animations.easing.smooth,
              }}
            >
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-gray-700"
              >
                Assunto
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                className="transition-all duration-300 hover:border-gray-400 focus:border-orange-300 focus:ring-orange-200"
                placeholder="Como posso ajudar?"
              />
            </motion.div>

            {/* Mensagem */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5,
                ease: brandDesign.animations.easing.smooth,
              }}
            >
              <Label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Mensagem *
              </Label>
              <Textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleInputChange}
                rows={6}
                className="resize-none transition-all duration-300 hover:border-gray-400 focus:border-orange-300 focus:ring-orange-200"
                placeholder="Conte-nos como podemos ajudar você..."
              />
            </motion.div>

            {/* Botão de envio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                ease: brandDesign.animations.easing.smooth,
              }}
              className="flex w-full justify-center"
            >
              <Button
                type="submit"
                className="flex w-full items-center justify-center rounded-full"
              >
                <motion.div
                  className="flex w-full items-center justify-center gap-2"
                  whileHover={{ x: 2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Send className="h-4 w-4" />
                  Abrir Email
                </motion.div>
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}

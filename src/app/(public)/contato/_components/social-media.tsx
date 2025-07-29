'use client'

import { Instagram, Mail, Phone, Youtube } from 'lucide-react'

const socialLinks = [
  {
    icon: Youtube,
    name: 'Youtube',
    url: 'https://www.youtube.com/@SOSBomHumorDoutoresPalhacos',
    color: 'hover:text-red-600',
    label: 'Nosso canal no Youtube',
    iconBg: 'bg-gradient-to-r from-red-300 to-red-300',
  },
  {
    icon: Instagram,
    name: 'Instagram',
    url: 'https://www.instagram.com/sosbomhumordoutorespalhacos/',
    color: 'hover:text-orange-500',
    label: 'Siga no Instagram',
    iconBg: 'bg-gradient-to-r from-orange-300 to-pink-300',
  },
  {
    icon: Mail,
    name: 'E-Mail',
    url: 'mailto:doutorespalhacos.of@gmail.com',
    color: 'hover:text-blue-400',
    label: 'Envie um e-mail',
    iconBg: 'bg-gradient-to-r from-orange-300 to-orange-300',
  },
  {
    icon: Phone,
    name: 'Telefone',
    url: 'https://wa.me/555492903525',
    color: 'hover:text-blue-700',
    label: 'Fale pelo WhatsApp',
    iconBg: 'bg-gradient-to-r from-green-300 to-green-300',
  },
]

export function SocialMedia() {
  return (
    <div
      className="animate-fade-in-up w-full"
      style={{ animationDelay: '300ms' }}
    >
      <div className="flex flex-col items-start justify-start text-left">
        <div className="flex w-full max-w-xs flex-col gap-2">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              className={`group flex items-center gap-3 transition-all duration-300 hover:scale-105 ${social.color}`}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className={`flex items-center justify-center rounded-lg p-2 ${social.iconBg} transition-all duration-300 group-hover:shadow-lg`}
              >
                <social.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-gray-700">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

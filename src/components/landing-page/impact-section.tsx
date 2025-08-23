import { FaCalendarAlt, FaHospitalAlt, FaSmile } from 'react-icons/fa'

const stats = [
  {
    icon: FaHospitalAlt,
    value: '19',
    label: 'Hospitais Visitados',
    description: 'Espalhados pelo Rio Grande do Sul',
  },
  {
    icon: FaSmile,
    value: '+8.000',
    label: 'Pacientes e Famílias Atendidas',
    description: 'Momentos de alegria compartilhados',
  },
  {
    icon: FaCalendarAlt,
    value: '3',
    label: 'Anos de Atuação Contínua',
    description: 'Transformando vidas através do riso',
  },
]

const ImpactSection = () => {
  return (
    <section className="w-full bg-white">
      <div className="container mx-auto max-w-6xl space-y-12 px-4">
        <h2 className="text-center text-gray-900">Nosso Impacto em Números</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon
            return (
              <article
                key={i}
                className="group flex flex-col items-center rounded-2xl bg-gray-50 p-8 shadow-sm transition hover:shadow-lg"
              >
                <IconComponent className="mb-4 text-3xl text-red-500 transition-transform group-hover:scale-110" />
                <h3 className="mb-2 text-2xl text-red-500 drop-shadow-sm sm:text-4xl">
                  {stat.value}
                </h3>
                <p className="text-md mb-2 text-center font-medium text-gray-700">
                  {stat.label}
                </p>
                <span className="text-center text-sm text-gray-500">
                  {stat.description}
                </span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ImpactSection

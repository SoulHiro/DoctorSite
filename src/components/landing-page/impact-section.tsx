const ImpactSection = () => {
  return (
    <section className="min-h-screen bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-4xl font-bold text-gray-900">
          Nosso Impacto
        </h2>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="mb-2 text-3xl font-bold text-red-500">12</h3>
            <p className="text-gray-600">Hospitais Visitados</p>
          </div>
          <div className="text-center">
            <h3 className="mb-2 text-3xl font-bold text-red-500">+8.000</h3>
            <p className="text-gray-600">Pacientes Atendidos</p>
          </div>
          <div className="text-center">
            <h3 className="mb-2 text-3xl font-bold text-red-500">10</h3>
            <p className="text-gray-600">Anos de Atuação</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ImpactSection

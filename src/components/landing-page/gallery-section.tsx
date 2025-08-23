import GallerySectionServer from './gallery-section-server'

/**
 * Componente principal da seção de galeria
 * Agora utiliza Server Components para melhor performance
 */
const GallerySection = () => {
  return <GallerySectionServer />
}

export default GallerySection

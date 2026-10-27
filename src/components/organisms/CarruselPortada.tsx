const diapositivas = [
  {
    imagen: '/images/EstufaYFamilia.jpg',
    alt: 'Familia reunida en un hogar calefaccionado',
  },
  {
    imagen: '/images/entregaDeGas.jpg',
    alt: 'Reparto de galones de Gas El Volcán',
  },
  {
    imagen: '/images/PersonaCocinando.jpg',
    alt: 'Persona cocinando en su hogar',
  },
  {
    imagen: '/images/ChanchitoYPrecio.jpg',
    alt: 'Ahorro y precio del cilindro de gas',
  },
]

function CarruselPortada() {
  return (
    <section
      aria-label="Imágenes destacadas de Gas El Volcán"
      className="carousel slide hero-image"
      id="hero-carousel"
      data-bs-ride="carousel"
      data-bs-interval="3500"
    >
      <div className="carousel-indicators">
        {diapositivas.map((diapositiva, index) => (
          <button
            key={diapositiva.alt}
            type="button"
            data-bs-target="#hero-carousel"
            data-bs-slide-to={index}
            className={index === 0 ? 'active' : ''}
            aria-current={index === 0 ? 'true' : undefined}
            aria-label={diapositiva.alt}
          />
        ))}
      </div>
      <div className="carousel-inner h-100">
        {diapositivas.map((diapositiva, index) => (
          <div
            className={`carousel-item h-100 ${index === 0 ? 'active' : ''}`}
            key={diapositiva.alt}
          >
            <img
              className="d-block w-100 h-100"
              src={diapositiva.imagen}
              alt={diapositiva.alt}
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#hero-carousel"
        data-bs-slide="prev"
        aria-label="Imagen anterior"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#hero-carousel"
        data-bs-slide="next"
        aria-label="Imagen siguiente"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </section>
  )
}

export default CarruselPortada

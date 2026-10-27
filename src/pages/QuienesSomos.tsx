function QuienesSomos() {
  return (
    <>
      <section className="page-heading">
        <p className="eyebrow">Nuestra historia</p>
        <h1>Energía cercana para cada hogar.</h1>
        <p>
          Gas El Volcán es un servicio local dedicado a la distribución de gas
          licuado, con foco en la seguridad, la rapidez y una atención que
          entiende las necesidades de las familias.
        </p>
      </section>
      <section className="content-grid">
        <div>
          <img
            className="detail-image"
            src="/images/PersonaCocinando.jpg"
            alt="Persona preparando alimentos en su hogar"
          />
          <h2>Una forma más ordenada de pedir gas</h2>
          <p>
            Actualmente, los pedidos se reciben por teléfono y se anotan en
            cuadernos o papeles. Esto puede provocar confusiones, pedidos
            repetidos y dudas sobre la hora de entrega.
          </p>
          <p>
            Esta página se creó para que los clientes puedan revisar los
            productos, elegir lo que necesitan y dejar sus datos de entrega de
            una manera más clara y ordenada.
          </p>
        </div>
        <aside className="form-card">
          <p className="eyebrow">Equipo desarrollador</p>
          <h2>Proyecto Caso C</h2>
          <p>
            La propuesta busca mejorar la recepción de pedidos y ayudar a
            consultar los productos y el stock disponible sin depender de
            anotaciones en hojas sueltas.
          </p>
          <p>
            <strong>Propósito:</strong> facilitar los pedidos y entregar una
            atención más clara a cada cliente.
          </p>
        </aside>
      </section>
    </>
  )
}

export default QuienesSomos

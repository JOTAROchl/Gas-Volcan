export interface Regalo {
  nombre: string
  imagen: string
}

export interface Novedad {
  id: number
  titulo: string
  imagen: string
  resumen: string
  detalle: string
  regalos?: Regalo[]
}

const novedades: Novedad[] = [
  {
    id: 1,
    titulo: 'Cómo almacenar un cilindro de gas de forma segura',
    imagen: '/images/AlmGasDeFormSeg.jpg',
    resumen:
      'Recomendaciones simples para mantener tu cilindro en buenas condiciones.',
    detalle:
      'Mantén el cilindro siempre en posición vertical, en un lugar ventilado, protegido del sol directo y lejos de fuentes de calor. No lo guardes en sótanos ni intentes repararlo por tu cuenta. Ante cualquier olor extraño, cierra la válvula, ventila el lugar y comunícate con un servicio autorizado.',
  },
  {
    id: 2,
    titulo: 'Elige el formato adecuado para tu hogar',
    imagen: '/images/FormatoAdecuado.jpg',
    resumen: 'Compara formatos según tu consumo y rutina.',
    detalle:
      'Para consumos ocasionales, el formato de 5 kg puede ser suficiente. Las familias que cocinan diariamente suelen preferir 11 o 15 kg, mientras que un negocio o un hogar grande puede necesitar 45 kg. Observa tu frecuencia de recambio y pide orientación antes de decidir.',
  },
  {
    id: 3,
    titulo: 'Regalo en tu primera compra',
    imagen: '/images/BolsaDeTelaMasLogo.jpg',
    resumen:
      'En tu primera compra podrás elegir una bolsa de tela o una alcancía de la marca.',
    detalle:
      'Queremos acompañarte también fuera de casa. En tu primera compra puedes elegir uno de estos dos regalos: una bolsa de tela reutilizable o una alcancía de Gas El Volcán.',
    regalos: [
      { nombre: 'Bolsa de tela', imagen: '/images/BolsaDeTelaMasLogo.jpg' },
      { nombre: 'Alcancía', imagen: '/images/AlcanciaMasLogo.jpg' },
    ],
  },
]

export default novedades

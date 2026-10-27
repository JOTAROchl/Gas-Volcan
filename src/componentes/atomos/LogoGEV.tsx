interface LogoGEVProps {
  className?: string
  width?: number
  height?: number
}

function LogoGEV({
  className = '',
  width = 50,
  height = 50,
}: LogoGEVProps) {
  return (
    <img
      src="/images/logoGEV.png"
      alt="Logo de Gas El Volcán"
      width={width}
      height={height}
      className={`d-inline-block align-text-top ${className}`.trim()}
    />
  )
}

export default LogoGEV

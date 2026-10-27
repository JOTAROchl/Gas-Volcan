import { Link } from 'react-router-dom'
import LogoGEV from '../atomos/LogoGEV'

function Marca() {
  return (
    <>
      <Link to="/" aria-label="Gas El Volcán, inicio">
        <LogoGEV />
      </Link>
      <Link className="navbar-brand" to="/">
        Gas El Volcán
      </Link>
    </>
  )
}

export default Marca

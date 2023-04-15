import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Header = () => (
  <Link to="/">
    <div className="tech-era-header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
        alt="website logo"
        className="tech-era-logo"
      />
    </div>
  </Link>
)

export default withRouter(Header)

import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          GoalSetter
        </Link>

        <nav>
          <ul className="nav-links">
            {user ? (
              <li>
                <button className="btn btn-logout" onClick={onLogout}>
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="nav-link">
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="nav-link register">
                    <FaUser />
                    <span>Register</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
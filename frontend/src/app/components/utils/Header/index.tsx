import { NavLink, useNavigate } from 'react-router-dom'
import { Text } from '../../../components/common/Text'
import { Logo } from '../Logo'
import { HeaderLink } from './sub-components/HeaderLink'
import { useLoginStore } from '../../../../code/stores/auth'

export function Header() {
  const accessToken = useLoginStore((state) => state.accessToken)
  const logout = useLoginStore((state) => state.logout)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex py-5 bg-Purple-400">
      <div className="header-area flex w-full max-w-[75rem] px-12 mx-auto items-center">
        <Logo />
        <nav className="flex gap-x-3 ml-auto">
          <NavLink to="/">
            <HeaderLink>
              <div className="flex items-center gap-x-2">
                <img src="/icons/world.svg" />
                <div className="sm2:hidden">
                  <Text weight="regular">Movies</Text>
                </div>
              </div>
            </HeaderLink>
          </NavLink>
          {accessToken ? (
            <div onClick={handleLogout} className="cursor-pointer">
              <HeaderLink>
                <div className="-rotate-180">
                  <img src="/icons/exit.svg" />
                </div>
              </HeaderLink>
            </div>
          ) : (
            <NavLink to="/login">
              <HeaderLink>
                <div className="flex items-center gap-x-2">
                  <div className="-rotate-180">
                    <img src="/icons/login.svg" />
                  </div>
                  <div className="sm:hidden">
                    <Text weight="regular">Login</Text>
                  </div>
                </div>
              </HeaderLink>
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

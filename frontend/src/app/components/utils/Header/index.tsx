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
                <Text weight="regular">Public</Text>
              </div>
            </HeaderLink>
          </NavLink>
          <NavLink to="/my-shortcuts">
            <HeaderLink>
              <div className="flex items-center gap-x-2">
                <img src="/icons/profile.svg" />
                <Text weight="regular">Personal</Text>
              </div>
            </HeaderLink>
          </NavLink>
          {accessToken && (
            <div onClick={handleLogout} className="cursor-pointer">
              <HeaderLink>
                <div className="-rotate-180">
                  <img src="/icons/exit.svg" />
                </div>
              </HeaderLink>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

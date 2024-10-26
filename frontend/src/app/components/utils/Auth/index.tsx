import { useEffect, useState } from 'react'
import { NavigateFunction, Outlet, useNavigate } from 'react-router-dom'
import { useLoginStore } from '../../../../code/stores/auth'

export default function Auth({
  isAdmin: isAdminProp,
}: {
  isAdmin: boolean
}): JSX.Element | null {
  const navigate: NavigateFunction = useNavigate()
  const authToken = useLoginStore((state) => state.accessToken)
  const { getUserData, login } = useLoginStore((state) => ({
    getUserData: state.getUserData,
    login: state.login,
  }))
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    authToken !== null,
  )

  useEffect(() => {
    if (authToken === null) {
      const { accessToken, isAdmin, email } = getUserData()

      if (accessToken !== null && isAdmin !== null && email !== null) {
        if (
          (isAdminProp === true && isAdmin === true) ||
          isAdminProp === false
        ) {
          login(email, isAdmin, accessToken)
        } else {
          navigate('/', { replace: true })
        }
        setIsAuthenticated(true)
      } else {
        navigate('/login', { replace: true })
      }
    } else {
      setIsAuthenticated(true)
    }
  }, [navigate])

  return isAuthenticated ? <Outlet /> : null
}

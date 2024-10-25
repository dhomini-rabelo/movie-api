import { Link } from 'react-router-dom'
import { Text } from '../../../components/common/Text'

export function Logo() {
  return (
    <Link to="/">
      <div className="text-center flex gap-x-2 justify-center items-center">
        <img src="/logo-white.svg" alt="GPT logo" />
        <strong>
          <Text variant="title">IMDB</Text>
        </strong>
      </div>
    </Link>
  )
}

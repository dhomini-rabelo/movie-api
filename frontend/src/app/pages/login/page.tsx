import { useForm } from 'react-hook-form'
import { Text } from '../../components/common/Text'
import { Button } from '../../components/forms/Button'
import { Input } from '../../components/forms/Input'
import { LoginSchema, LoginSchemaType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/utils/Logo'
import { simpleClient } from '../../../code/settings'
import { useFeedback } from '../../hooks/useFeedback'
import { useLoginStore } from '../../../code/stores/auth'

export function LoginPage() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  })
  const { FeedbackElement, renderFeedback } = useFeedback()
  const login = useLoginStore((state) => state.login)
  const navigate = useNavigate()

  async function onValidSubmit(data: LoginSchemaType) {
    try {
      const response = await simpleClient.post('/login', {
        username: data.username,
        password: data.password,
      })
      if (
        response.data &&
        response.data.access_token &&
        typeof response.data.access_token === 'string'
      ) {
        login(data.username, response.data.access_token)
        renderFeedback('success', {
          message: 'Login successful!',
          onClose: () => navigate('/my-shortcuts'),
        })
      } else {
        reset(data)
        renderFeedback('error', {
          message: 'Invalid response from server',
        })
      }
    } catch (e) {
      reset(data)
      renderFeedback('error', {
        message: 'Invalid username or password',
      })
    }
  }

  return (
    <>
      {FeedbackElement}
      <div className="body-df">
        <main className="mx-auto max-w-96 pt-16 pb-12">
          <Logo />
          <form
            className="mt-8 flex flex-col gap-y-3"
            onSubmit={handleSubmit(onValidSubmit)}
          >
            <Input.Root>
              <Input.Label>Username:</Input.Label>
              <Input.Box
                type="text"
                placeholder="Type your username"
                {...register('username')}
              />
              <Input.Message>{errors.username?.message}</Input.Message>
            </Input.Root>
            <Input.Root>
              <Input.Label>Password:</Input.Label>
              <Input.Box
                type="password"
                placeholder="Type your password"
                {...register('password')}
              />
              <Input.Message>{errors.password?.message}</Input.Message>
            </Input.Root>
            <div className="mt-6 w-full">
              <Button type="submit" isSubmitting={isSubmitting}>
                Login
              </Button>
            </div>
          </form>
          <div className="pt-8 text-center">
            <Text color="Gray-500" weight="regular">
              Don't have an account?{' '}
              <Link to="/register" className="text-Green-300">
                Register here
              </Link>
            </Text>
          </div>
        </main>
      </div>
    </>
  )
}

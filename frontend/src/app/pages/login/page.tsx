import { useForm } from 'react-hook-form'
import { Button } from '../../components/forms/Button'
import { Input } from '../../components/forms/Input'
import { LoginSchema, LoginSchemaType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
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
      const response = await simpleClient.post('/auth/login', {
        email: data.email,
        password: data.password,
      })
      if (
        response.data &&
        response.data.accessToken &&
        typeof response.data.accessToken === 'string'
      ) {
        login(data.email, response.data.accessToken)
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
        message: 'Invalid email or password',
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
              <Input.Label>Email:</Input.Label>
              <Input.Box
                type="text"
                placeholder="Type your email"
                {...register('email')}
              />
              <Input.Message>{errors.email?.message}</Input.Message>
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
        </main>
      </div>
    </>
  )
}

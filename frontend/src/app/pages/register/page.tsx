import { useForm } from 'react-hook-form'
import { Text } from '../../components/common/Text'
import { Button } from '../../components/forms/Button'
import { Input } from '../../components/forms/Input'
import { RegisterUserSchema, RegisterUserSchemaType } from './schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { Logo } from '../../components/utils/Logo'
import { simpleClient } from '../../../code/settings'
import { useFeedback } from '../../hooks/useFeedback'
import { processFormErrorResponse } from '../../../code/process-error'
import { AxiosError } from 'axios'

export function RegisterPage() {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    register,
    reset,
    setError,
  } = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(RegisterUserSchema),
  })
  const { FeedbackElement, renderFeedback } = useFeedback()
  const navigate = useNavigate()

  async function onValidSubmit(data: RegisterUserSchemaType) {
    try {
      await simpleClient.post('/register', {
        username: data.username,
        password: data.password,
        confirm_password: data.confirm_password,
      })
      renderFeedback('success', {
        message: 'Account created successfully',
        onClose: () => navigate('/login'),
      })
    } catch (error) {
      processFormErrorResponse<RegisterUserSchemaType>(
        error as AxiosError,
        data,
        setError,
        reset,
        renderFeedback,
      )
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
            <Input.Root>
              <Input.Label>Confirm Password:</Input.Label>
              <Input.Box
                type="password"
                placeholder="Type your password again"
                {...register('confirm_password')}
              />
              <Input.Message>{errors.confirm_password?.message}</Input.Message>
            </Input.Root>
            <div className="mt-6 w-full">
              <Button type="submit" isSubmitting={isSubmitting}>
                Create Account
              </Button>
            </div>
          </form>
          <div className="pt-8 text-center">
            <Text color="Gray-500" weight="regular">
              Already have an account?{' '}
              <Link to="/login" className="text-Green-300">
                Login here
              </Link>
            </Text>
          </div>
        </main>
      </div>
    </>
  )
}

import LoginForm from '../../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  )
}


import SignupForm from '../../components/SignupForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen mt-8 bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
      <div className="w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  )
}


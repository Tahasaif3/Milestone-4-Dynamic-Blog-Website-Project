'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, getSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaGithub } from 'react-icons/fa'
import { GlowingCard, CardContent, CardHeader, CardTitle } from "./GlowingCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUser } from '../app/contexts/UserContexts'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { setUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser({
          id: data.user.id,
          username: data.user.username,
          email: data.user.email,
          provider: 'email',
        })
        router.push('/')
      } else {
        setError(data.error || 'An error occurred during signup')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('An error occurred. Please try again.')
    }
  }

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' })
  }

  useEffect(() => {
    const handleOAuthSignup = async () => {
      const session = await getSession()
      if (session?.user) {
        setUser({
          id: session.user.id as number,
          email: session.user.email as string,
          username: session.user.name ?? undefined,
          provider: (session as any).provider as string,
        })
        router.push('/')
      }
    }

    handleOAuthSignup()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlowingCard className="overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-white">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username" className="text-white">Username</Label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10 bg-white bg-opacity-20 border-2 border-white border-opacity-50 focus:border-opacity-100 text-white placeholder-purple-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-white bg-opacity-20 border-2 border-white border-opacity-50 focus:border-opacity-100 text-white placeholder-purple-200 rounded-xl"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-white bg-opacity-20 border-2 border-white border-opacity-50 focus:border-opacity-100 text-white placeholder-purple-200 rounded-xl"
                  />
                </div>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  
                >
                  Sign Up
                </Button>
              </motion.div>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white border-opacity-30"></span>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-transparent text-white">Or continue with</span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    onClick={() => handleOAuthSignIn('google')}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300"
                  >
                    <FaGoogle className="inline-block mr-2" /> Google
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    type="button"
                    onClick={() => handleOAuthSignIn('github')}
                    className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 px-4 rounded-xl transition-all duration-300"
                  >
                    <FaGithub className="inline-block mr-2" /> GitHub
                  </Button>
                </motion.div>
              </div>
            </div>
          </CardContent>
        </GlowingCard>
      </motion.div>
    </div>
  )
}

export default SignupForm
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GlowingCard, CardContent, CardHeader, CardTitle } from "../../components/GlowingCard"

export default function DashboardPage() {
  const [username, setUsername] = useState('')
  const router = useRouter()

  useEffect(() => {
    const session = localStorage.getItem('session')
    if (!session) {
      router.push('/login')
    } else {
      const { username } = JSON.parse(session)
      setUsername(username)
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
      <GlowingCard className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Welcome to Your Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Hello, {username}! This is your protected dashboard.</p>
        </CardContent>
      </GlowingCard>
    </div>
  )
}


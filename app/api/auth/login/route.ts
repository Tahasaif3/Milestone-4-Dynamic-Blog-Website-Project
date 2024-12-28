import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import fs from 'fs/promises'
import path from 'path'

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface UserWithoutPassword {
  id: number;
  username: string;
  email: string;
}

const usersFilePath = path.join(process.cwd(), 'data', 'users.json')

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    let users: User[] = []
    try {
      const data = await fs.readFile(usersFilePath, 'utf-8')
      users = JSON.parse(data)
    } catch (error) {
      console.error('Error reading users file:', error)
      return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
    }

    const user = users.find((user: User) => user.email === email)

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 })
    }

    const userWithoutPassword: UserWithoutPassword = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    return NextResponse.json({ message: 'Login successful', user: userWithoutPassword }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}


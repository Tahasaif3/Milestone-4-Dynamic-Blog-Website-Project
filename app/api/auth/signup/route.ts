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
    const { username, email, password } = await req.json()

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const dataDir = path.dirname(usersFilePath)
    await fs.mkdir(dataDir, { recursive: true })

    let users: User[] = []
    try {
      const data = await fs.readFile(usersFilePath, 'utf-8')
      users = JSON.parse(data)
    } catch (error) {
      const err = error as { code?: string };
      if (err.code !== 'ENOENT') {
        console.error('Unexpected error:', error);
      }
    }

    if (users.find((user: User) => user.email === email)) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser: User = { id: users.length + 1, username, email, password: hashedPassword }
    users.push(newUser)

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2))

    const userWithoutPassword: UserWithoutPassword = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    }

    return NextResponse.json({ message: 'User created successfully', user: userWithoutPassword }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: 'An error occurred while processing your request' }, { status: 500 })
  }
}


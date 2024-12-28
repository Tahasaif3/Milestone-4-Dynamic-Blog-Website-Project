import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { NextAuthOptions } from "next-auth";

const usersFilePath = path.join(process.cwd(), 'data', 'users.json');

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(usersFilePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUser(user: User): Promise<void> {
  const users = await getUsers();
  users.push(user);
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

declare module "next-auth" {
  interface User {
    id: number;
    username?: string | null;
  }
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const users = await getUsers();
        const user = users.find((u) => u.email === credentials.email);

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return { id: user.id, name: user.username, email: user.email };
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const users = await getUsers();
        const existingUser = users.find((u) => u.email === user.email);

        if (!existingUser && user.email) {
          const newUser: User = {
            id: users.length + 1,
            username: user.name || '',
            email: user.email,
            password: '',
          };
          await saveUser(newUser);
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ? parseInt(token.sub) : 0;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


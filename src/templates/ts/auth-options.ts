import NextAuth, { Account, NextAuthOptions, Session, User } from 'next-auth'

import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

import { JWT } from 'next-auth/jwt'

// Providers
import CredentialsProvider from 'next-auth/providers/credentials'

import { jwtDecode } from 'jwt-decode'
import { AdapterUser } from 'next-auth/adapters'

const handler: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'email-password',
            name: 'email-password',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
            },
            async authorize(credentials) {
                return {
                    "email": credentials?.email,
                    "name": "Test User",
                    "id": "1234",

                }
            },
        }),

        CredentialsProvider({
            id: 'register-email-password',
            name: 'register-email-password',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Email' },
                password1: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password',
                },
                password2: {
                    label: 'Confirm Password',
                    type: 'password',
                    placeholder: 'Confirm Password',
                },
            },
            async authorize(credentials) {
                return {
                    "email": credentials?.email,
                    "name": "Test User",
                    "id": "1234",

                }
            },
        }),
    ],
}

export default handler

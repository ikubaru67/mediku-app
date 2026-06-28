import type { User } from '../types'

export const mockUser: User = {
  id: 'user-1',
  name: 'Nadia Putri',
  email: 'nadia.putri@email.com',
  phone: '08123456789',
  avatarUrl: '',
  isVerified: true,
}

export async function mockSignIn(email: string, _password: string): Promise<{ user: User; token: string }> {
  await delay(500)
  if (!email) throw new Error('Email harus diisi')
  return { user: mockUser, token: 'mock-token-123' }
}

export async function mockSignUp(data: Partial<User> & { password: string }): Promise<{ user: User; token: string }> {
  await delay(500)
  return { user: { ...mockUser, ...data }, token: 'mock-token-123' }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export const members = [
  {
    id: 1,
    name: 'Anthony FS.',
    username: 'anthonyfs',
    email: 'anthony@example.com',
    password: 'password123',
  },
  {
    id: 2,
    name: 'Thompson P.',
    username: 'thompsonp',
    email: 'thompson@example.com',
    password: 'password123',
  },
]

export function authenticateMember(email, password) {
  return members.find(
    (member) =>
      member.email === email.trim().toLowerCase() &&
      member.password === password,
  )
}

import { getUserByUsername } from "../db/users"

export async function login(username, password) {
  const user = await getUserByUsername(username)
  if (!user || user.password !== password) return null

  localStorage.setItem("douajny_user", JSON.stringify(user))
  return user
}

export function logout() {
  localStorage.removeItem("douajny_user")
}

export function getCurrentUser() {
  const u = localStorage.getItem("douajny_user")
  return u ? JSON.parse(u) : null
}

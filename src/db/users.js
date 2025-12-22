import { db } from "./db"

export async function createUser(user) {
  return db.users.add(user)
}

export async function getUserByUsername(username) {
  return db.users.where("username").equals(username).first()
}

export async function getAllUsers() {
  return db.users.toArray()
}

import { useEffect, useState } from "react"
import { createUser, getAllUsers } from "../db/users"

export default function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers().then(setUsers)
  }, [])

  const addUser = async () => {
    await createUser({
      username: "worker1",
      password: "1234",
      role: "worker",
      createdAt: new Date()
    })
    setUsers(await getAllUsers())
  }

  return (
    <div>
      <h2>المستخدمون</h2>
      <button onClick={addUser}>إضافة مستخدم</button>

      <ul>
        {users.map(u => (
          <li key={u.id}>{u.username} - {u.role}</li>
        ))}
      </ul>
    </div>
  )
}

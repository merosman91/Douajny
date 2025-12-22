import { useState } from "react"
import { login } from "../auth/authService"
import { useAuth } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    const user = await login(username, password)
    if (!user) return alert("بيانات غير صحيحة")

    setUser(user)
    navigate("/")
  }

  return (
    <div className="login">
      <h2>تسجيل الدخول</h2>
      <input placeholder="اسم المستخدم" onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="كلمة المرور" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>دخول</button>
    </div>
  )
}
